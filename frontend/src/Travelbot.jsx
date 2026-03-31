import { useState, useRef, useEffect } from "react";

const QUICK_SUGGESTIONS = [
  "🏖️ Best beaches in India",
  "🏔️ Hill stations under ₹5000",
  "🎒 Solo trip destinations",
  "👨‍👩‍👧 Family trip ideas",
  "🌊 Adventure travel spots",
  "🏰 Heritage & culture tours",
  "💑 Romantic getaways",
  "🍛 Food tourism destinations",
];

const WELCOME_MSG = {
  role: "assistant",
  content: `Namaste! 🙏 I'm **Yatra** — your AI travel companion from findmyStay!

I can help you with:
✈️ **Destination suggestions** based on your budget & vibe
🏨 **Hotel recommendations** across India
🗺️ **Itinerary planning** day by day
💰 **Budget breakdowns** for your trip
🌤️ **Best time to visit** any place
🎒 **Packing tips** & travel advice

What kind of trip are you dreaming of? Tell me your budget, who you're travelling with, and I'll craft the perfect plan! 🚀`,
};

// ✅ PASTE YOUR GEMINI API KEY HERE
const API_KEY = "AIzaSyAEnovqqpbCYIJAC-i99zvEZiS3BZwCGOA";

const SYSTEM_PROMPT = `You are Yatra, an expert AI travel assistant for findmyStay — India's premier hotel booking platform.
Your personality: Friendly, enthusiastic, knowledgeable, and conversational. Speak like a well-traveled friend, not a formal agent. Use emojis naturally.
Your expertise: Indian travel destinations, hotel recommendations with prices in ₹, itinerary planning, budget breakdowns, best seasons to visit, local food and hidden gems, travel tips, group travel planning.
Always mention hotel price per night in ₹. Use bullet points for clarity. Always end with a follow-up question. Encourage booking through findmyStay.`;

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /^### (.*$)/gm,
      '<div style="font-size:15px;font-weight:700;margin:12px 0 6px;color:#c9a96e">$1</div>',
    )
    .replace(
      /^## (.*$)/gm,
      '<div style="font-size:16px;font-weight:800;margin:14px 0 8px;color:#c9a96e">$1</div>',
    )
    .replace(
      /^# (.*$)/gm,
      '<div style="font-size:18px;font-weight:900;margin:16px 0 8px;color:#c9a96e">$1</div>',
    )
    .replace(
      /^- (.*$)/gm,
      '<div style="display:flex;gap:8px;margin:4px 0"><span style="color:#c9a96e;flex-shrink:0">•</span><span>$1</span></div>',
    )
    .replace(
      /^\d+\. (.*$)/gm,
      '<div style="display:flex;gap:8px;margin:4px 0"><span style="color:#c9a96e;flex-shrink:0;font-weight:700">›</span><span>$1</span></div>',
    )
    .replace(/\n\n/g, '<div style="height:10px"></div>')
    .replace(/\n/g, "<br/>");
}

export default function TravelBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unread, setUnread] = useState(0);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    setShowSuggestions(false);

    const userMsg = { role: "user", content: userText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Build Gemini conversation history (skip the welcome message)
      const history = updatedMessages
        .slice(1) // skip welcome msg
        .slice(0, -1) // skip last user msg (sent separately)
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [
              ...history,
              { role: "user", parts: [{ text: userText }] },
            ],
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.7,
            },
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const errMsg = data?.error?.message || `API Error ${response.status}`;
        console.error("Gemini Error:", data);
        throw new Error(errMsg);
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't get a response. Please try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if (!open) setUnread((u) => u + 1);
    } catch (err) {
      console.error("Yatra error:", err.message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MSG]);
    setShowSuggestions(true);
    setInput("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .tb-container { position: fixed; bottom: 28px; right: 28px; z-index: 9999; font-family: 'DM Sans', sans-serif; }
        .tb-toggle { width: 62px; height: 62px; border-radius: 50%; background: linear-gradient(135deg, #c9a96e, #a07840); border: none; cursor: pointer; font-size: 26px; box-shadow: 0 8px 32px rgba(201,169,110,0.45); transition: transform 0.2s, box-shadow 0.2s; display: flex; align-items: center; justify-content: center; position: relative; }
        .tb-toggle:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(201,169,110,0.55); }
        .tb-badge { position: absolute; top: -4px; right: -4px; width: 20px; height: 20px; border-radius: 50%; background: #ef4444; color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid white; }
        .tb-window { position: absolute; bottom: 76px; right: 0; width: 390px; height: 580px; background: #0f0f17; border-radius: 24px; box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06); display: flex; flex-direction: column; overflow: hidden; transform-origin: bottom right; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s; }
        .tb-window.open { transform: scale(1); opacity: 1; pointer-events: all; }
        .tb-window.closed { transform: scale(0.8); opacity: 0; pointer-events: none; }
        .tb-header { background: linear-gradient(135deg, #1a1025 0%, #0d1520 100%); padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
        .tb-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .tb-messages::-webkit-scrollbar { width: 4px; }
        .tb-messages::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 2px; }
        .tb-bubble-user { align-self: flex-end; background: linear-gradient(135deg, #c9a96e, #a07840); color: white; padding: 11px 15px; border-radius: 18px 18px 4px 18px; max-width: 82%; font-size: 14px; line-height: 1.5; box-shadow: 0 4px 12px rgba(201,169,110,0.25); }
        .tb-bubble-bot { align-self: flex-start; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); padding: 13px 15px; border-radius: 18px 18px 18px 4px; max-width: 90%; font-size: 13.5px; line-height: 1.6; }
        .tb-typing { align-self: flex-start; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08); padding: 13px 18px; border-radius: 18px 18px 18px 4px; display: flex; gap: 5px; align-items: center; }
        @keyframes tbBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        .tb-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(201,169,110,0.7); animation: tbBounce 1.2s infinite; }
        .tb-dot:nth-child(2){animation-delay:0.2s} .tb-dot:nth-child(3){animation-delay:0.4s}
        .tb-suggestion-chip { padding: 7px 14px; border-radius: 100px; background: rgba(201,169,110,0.08); border: 1px solid rgba(201,169,110,0.2); color: rgba(255,255,255,0.75); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.15s; flex-shrink: 0; }
        .tb-suggestion-chip:hover { background: rgba(201,169,110,0.15); color: #c9a96e; border-color: rgba(201,169,110,0.4); }
        .tb-input-area { padding: 12px 14px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px; align-items: flex-end; background: #0f0f17; flex-shrink: 0; }
        .tb-input { flex: 1; background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 11px 14px; color: white; font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none; resize: none; max-height: 100px; line-height: 1.5; transition: border-color 0.2s; }
        .tb-input:focus { border-color: rgba(201,169,110,0.5); }
        .tb-input::placeholder { color: rgba(255,255,255,0.28); }
        .tb-send { width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0; background: linear-gradient(135deg, #c9a96e, #a07840); border: none; color: white; font-size: 16px; cursor: pointer; transition: transform 0.15s, opacity 0.15s; display: flex; align-items: center; justify-content: center; }
        .tb-send:hover { transform: scale(1.06); }
        .tb-send:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
        @keyframes tbFadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .tb-msg-in { animation: tbFadeUp 0.3s ease both; }
        @keyframes tbPulse { 0%,100%{box-shadow:0 0 0 0 rgba(201,169,110,0.4)} 50%{box-shadow:0 0 0 8px rgba(201,169,110,0)} }
        .tb-pulse { animation: tbPulse 2s infinite; }
      `}</style>

      <div className="tb-container">
        <div className={`tb-window ${open ? "open" : "closed"}`}>
          {/* Header */}
          <div className="tb-header">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg,#c9a96e,#a07840)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  🧭
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontWeight: 800,
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    Yatra AI
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#22c55e",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 500,
                      }}
                    >
                      Online · Travel Expert
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <button
                  onClick={clearChat}
                  title="New chat"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    borderRadius: "8px",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  🗑
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    borderRadius: "8px",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="tb-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`tb-msg-in ${m.role === "user" ? "tb-bubble-user" : "tb-bubble-bot"}`}
              >
                {m.role === "assistant" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(m.content),
                    }}
                  />
                ) : (
                  m.content
                )}
              </div>
            ))}
            {loading && (
              <div className="tb-typing tb-msg-in">
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    marginRight: "4px",
                  }}
                >
                  Yatra is thinking
                </span>
                <div className="tb-dot" />
                <div className="tb-dot" />
                <div className="tb-dot" />
              </div>
            )}
            {showSuggestions && messages.length === 1 && (
              <div
                className="tb-msg-in"
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  QUICK START
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {QUICK_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="tb-suggestion-chip"
                      onClick={() => sendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="tb-input-area">
            <textarea
              ref={inputRef}
              className="tb-input"
              placeholder="Ask about any destination, hotel, budget..."
              value={input}
              rows={1}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 100) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button
              className="tb-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              {loading ? (
                <div className="tb-dot" style={{ background: "white" }} />
              ) : (
                "➤"
              )}
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: "8px 14px 12px", textAlign: "center" }}>
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "10px",
                color: "rgba(255,255,255,0.2)",
                fontWeight: 500,
              }}
            >
              Powered by Gemini AI · findmyStay
            </span>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className={`tb-toggle ${!open ? "tb-pulse" : ""}`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "🧭"}
          {unread > 0 && !open && <div className="tb-badge">{unread}</div>}
        </button>
      </div>
    </>
  );
}
