import { useState, useRef, useEffect } from "react";

const destinations = [
  {
    name: "Goa",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80",
    type: "Beach",
    vibe: "🏖️",
    minPerHead: 3500,
    desc: "Beaches, parties & chill vibes",
  },
  {
    name: "Manali",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80",
    type: "Mountain",
    vibe: "🏔️",
    minPerHead: 4000,
    desc: "Snow, adventure & bonfires",
  },
  {
    name: "Jaipur",
    img: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=400&q=80",
    type: "Heritage",
    vibe: "🏰",
    minPerHead: 2500,
    desc: "Forts, food & royal vibes",
  },
  {
    name: "Kerala",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80",
    type: "Nature",
    vibe: "🌿",
    minPerHead: 3800,
    desc: "Backwaters, spice & serenity",
  },
  {
    name: "Rishikesh",
    img: "https://images.unsplash.com/photo-1591018653174-a56f8368d61d?w=400&q=80",
    type: "Adventure",
    vibe: "🌊",
    minPerHead: 2800,
    desc: "Rafting, yoga & river views",
  },
  {
    name: "Udaipur",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
    type: "Romantic",
    vibe: "💎",
    minPerHead: 4500,
    desc: "Lakes, palaces & sunsets",
  },
  {
    name: "Leh",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    type: "Adventure",
    vibe: "🏍️",
    minPerHead: 6000,
    desc: "High altitude & raw beauty",
  },
  {
    name: "Coorg",
    img: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=400&q=80",
    type: "Nature",
    vibe: "☕",
    minPerHead: 3200,
    desc: "Coffee estates & waterfalls",
  },
];

const funMessages = [
  "Ooh, that's a solid squad budget! 🤑",
  "Let's find you the perfect escape! 🗺️",
  "Your squad is gonna love this! 🥳",
  "Budget locked. Adventure unlocked! 🚀",
  "Now we're cooking! 🔥",
];

const chatBots = [
  { name: "Rohan", avatar: "👦", color: "#6c63ff" },
  { name: "Priya", avatar: "👧", color: "#ff6584" },
  { name: "Arjun", avatar: "🧔", color: "#43aa8b" },
  { name: "Sneha", avatar: "💁", color: "#f8961e" },
];

const botResponses = {
  beach: [
    "Goa is 🔥 for beaches!",
    "I vote Goa! 🏖️ Party vibes all the way!",
    "Goa or Andaman — both insane for beaches 🌊",
  ],
  mountain: [
    "Manali is calling us bro 🏔️",
    "Leh is underrated fr fr 🏍️",
    "Manali in winters = bonfire squad 🔥",
  ],
  budget: [
    "Bro Jaipur is cheap AF and amazing 😤",
    "Kerala is worth every rupee tbh 🌿",
    "Rishikesh is super budget friendly! 🙌",
  ],
  food: [
    "Jaipur street food hits different 🍛",
    "Goa seafood is ELITE 🦞",
    "Kerala sadya is life changing no cap 🍌",
  ],
  party: [
    "GOA. Final answer. 🎉",
    "Goa Goa Goa! 🥂",
    "Anywhere Goa > everywhere else for parties",
  ],
  hello: [
    "Heyyyy!! So excited for this trip 🎊",
    "Omg finally we're planning!! 🥳",
    "Let's gooo!! When are we leaving? 🚀",
  ],
  when: [
    "Let's go next month? 📅",
    "Weekend trip or full week? 🤔",
    "I can do any weekend honestly!",
  ],
  default: [
    "Sounds good to me! 👍",
    "Yesss I'm down!! 🙌",
    "Love this plan ngl 💯",
    "Adding to my calendar rn 📅",
    "This is gonna be epic fr 🔥",
  ],
};

export default function TripSquad({ onBack }) {
  const [step, setStep] = useState(1); // 1=intro, 2=setup, 3=suggestions, 4=chat
  const [squadName, setSquadName] = useState("");
  const [totalBudget, setTotalBudget] = useState(20000);
  const [friends, setFriends] = useState(4);
  const [days, setDays] = useState(3);
  const [vibe, setVibe] = useState("");
  const [selectedDest, setSelectedDest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [friendNames, setFriendNames] = useState([
    "You",
    "Rohan",
    "Priya",
    "Arjun",
  ]);
  const chatRef = useRef(null);

  const perHead = Math.floor(totalBudget / friends);

  const suggested = destinations
    .filter((d) => d.minPerHead <= perHead)
    .sort((a, b) => {
      if (vibe && a.type.toLowerCase() === vibe.toLowerCase()) return -1;
      if (vibe && b.type.toLowerCase() === vibe.toLowerCase()) return 1;
      return b.minPerHead - a.minPerHead;
    });

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const getBotReply = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("beach") || m.includes("goa")) return botResponses["beach"];
    if (m.includes("mountain") || m.includes("manali") || m.includes("leh"))
      return botResponses["mountain"];
    if (m.includes("budget") || m.includes("cheap") || m.includes("money"))
      return botResponses["budget"];
    if (m.includes("food") || m.includes("eat")) return botResponses["food"];
    if (m.includes("party") || m.includes("club") || m.includes("drink"))
      return botResponses["party"];
    if (m.includes("hello") || m.includes("hi") || m.includes("hey"))
      return botResponses["hello"];
    if (m.includes("when") || m.includes("date") || m.includes("day"))
      return botResponses["when"];
    return botResponses["default"];
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      from: "You",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      color: "#c9a96e",
    };
    setMessages((m) => [...m, newMsg]);
    setInput("");
    setTyping(true);

    const replies = getBotReply(input);
    const count = 1 + Math.floor(Math.random() * 2);
    const shuffled = [...chatBots]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    shuffled.forEach((bot, i) => {
      setTimeout(
        () => {
          const reply = replies[Math.floor(Math.random() * replies.length)];
          setMessages((m) => [
            ...m,
            {
              from: bot.name,
              text: reply,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              color: bot.color,
              avatar: bot.avatar,
            },
          ]);
          if (i === shuffled.length - 1) setTyping(false);
        },
        800 + i * 600,
      );
    });
  };

  const vibes = [
    { label: "Beach", icon: "🏖️", color: "#0ea5e9" },
    { label: "Mountain", icon: "🏔️", color: "#6366f1" },
    { label: "Heritage", icon: "🏰", color: "#d97706" },
    { label: "Nature", icon: "🌿", color: "#16a34a" },
    { label: "Adventure", icon: "🎯", color: "#dc2626" },
    { label: "Romantic", icon: "💎", color: "#db2777" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d1a",
        fontFamily: "'DM Sans', sans-serif",
        color: "white",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ts-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 28px; transition: border-color 0.2s, background 0.2s; }
        .ts-card:hover { border-color: rgba(201,169,110,0.3); background: rgba(255,255,255,0.07); }
        .ts-card.selected { border-color: #c9a96e; background: rgba(201,169,110,0.08); }

        .ts-input { width: 100%; padding: 13px 18px; background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .ts-input:focus { border-color: #c9a96e; }
        .ts-input::placeholder { color: rgba(255,255,255,0.3); }

        .ts-btn { padding: 14px 32px; border-radius: 12px; border: none; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .ts-btn-primary { background: linear-gradient(135deg, #c9a96e, #a07840); color: white; }
        .ts-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,169,110,0.35); }
        .ts-btn-ghost { background: rgba(255,255,255,0.07); color: white; border: 1px solid rgba(255,255,255,0.12); }
        .ts-btn-ghost:hover { background: rgba(255,255,255,0.12); }

        .ts-range { -webkit-appearance: none; width: 100%; height: 5px; border-radius: 3px; outline: none; cursor: pointer; }
        .ts-range::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #c9a96e, #a07840); border: 3px solid #0d0d1a; cursor: pointer; box-shadow: 0 0 8px rgba(201,169,110,0.5); }

        .ts-vibe-btn { padding: 10px 18px; border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
        .ts-vibe-btn:hover { border-color: rgba(201,169,110,0.5); color: white; }
        .ts-vibe-btn.active { background: rgba(201,169,110,0.15); border-color: #c9a96e; color: #c9a96e; }

        .ts-dest-card { position: relative; border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; border: 2px solid transparent; }
        .ts-dest-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
        .ts-dest-card.selected { border-color: #c9a96e; box-shadow: 0 0 0 4px rgba(201,169,110,0.2); }

        .ts-chat-bubble { max-width: 72%; padding: 11px 15px; border-radius: 18px; font-size: 14px; line-height: 1.5; word-break: break-word; }
        .ts-chat-input { flex: 1; padding: 13px 18px; background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; }
        .ts-chat-input:focus { border-color: #c9a96e; }
        .ts-chat-input::placeholder { color: rgba(255,255,255,0.3); }

        .ts-send-btn { padding: 13px 22px; background: linear-gradient(135deg, #c9a96e, #a07840); border: none; border-radius: 12px; color: white; font-size: 18px; cursor: pointer; transition: transform 0.15s; }
        .ts-send-btn:hover { transform: scale(1.05); }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        @keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-6px); } }
        .dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.5); animation: bounce 1.2s infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .pulse { animation: pulse 2s infinite; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 3px; }
      `}</style>

      {/* NAVBAR */}
      <div
        style={{
          padding: "18px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onBack}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              borderRadius: "10px",
              padding: "8px 16px",
              fontFamily: "'DM Sans'",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Home
          </button>
          <div>
            <span
              style={{
                fontFamily: "'Playfair Display'",
                fontWeight: 900,
                fontSize: "20px",
                color: "white",
              }}
            >
              Trip
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display'",
                fontWeight: 900,
                fontSize: "20px",
                color: "#c9a96e",
              }}
            >
              Squad
            </span>
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                background: "linear-gradient(135deg,#c9a96e,#a07840)",
                color: "white",
                padding: "2px 8px",
                borderRadius: "100px",
                marginLeft: "8px",
                fontWeight: 700,
              }}
            >
              BETA
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: 28,
                height: 4,
                borderRadius: 2,
                background: step >= s ? "#c9a96e" : "rgba(255,255,255,0.1)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 5%" }}>
        {/* ── STEP 1: INTRO ── */}
        {step === 1 && (
          <div className="fade-up" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "72px", marginBottom: "24px" }}>🤝</div>
            <h1
              style={{
                fontFamily: "'Playfair Display'",
                fontWeight: 900,
                fontSize: "clamp(36px,6vw,58px)",
                marginBottom: "16px",
                letterSpacing: "-1.5px",
                lineHeight: 1.1,
              }}
            >
              Plan a Trip
              <br />
              <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
                with your Squad
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "17px",
                color: "rgba(255,255,255,0.55)",
                maxWidth: 520,
                margin: "0 auto 48px",
                lineHeight: 1.7,
              }}
            >
              Tell us your budget, squad size & vibe — we'll suggest the best
              destinations, split costs & let your crew plan together in a live
              group chat!
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              {[
                {
                  icon: "💰",
                  title: "Budget Splitter",
                  desc: "See cost per person instantly",
                },
                {
                  icon: "🗺️",
                  title: "Smart Suggestions",
                  desc: "AI picks best destinations",
                },
                {
                  icon: "💬",
                  title: "Squad Chat",
                  desc: "Plan together in real time",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="ts-card"
                  style={{ textAlign: "center", padding: "24px 20px" }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                    {f.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontWeight: 700,
                      fontSize: "15px",
                      marginBottom: "6px",
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Give your squad a name 🔥
              </label>
              <input
                className="ts-input"
                placeholder="e.g. The Chaos Gang, Weekend Warriors..."
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                style={{
                  maxWidth: 400,
                  margin: "0 auto",
                  display: "block",
                  textAlign: "center",
                  fontSize: "16px",
                }}
                onKeyDown={(e) => e.key === "Enter" && setStep(2)}
              />
            </div>

            <button
              className="ts-btn ts-btn-primary"
              onClick={() => setStep(2)}
              style={{ fontSize: "16px", padding: "16px 48px" }}
            >
              Let's Build the Squad Plan 🚀
            </button>
          </div>
        )}

        {/* ── STEP 2: SETUP ── */}
        {step === 2 && (
          <div className="fade-up">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: "38px",
                  marginBottom: "8px",
                  letterSpacing: "-1px",
                }}
              >
                {squadName ? `${squadName}'s` : "Your Squad's"}{" "}
                <span style={{ color: "#c9a96e" }}>Details</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Set the budget, squad size and trip length
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              {/* Budget */}
              <div className="ts-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "4px",
                      }}
                    >
                      Total Squad Budget
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display'",
                        fontWeight: 900,
                        fontSize: "32px",
                        color: "#c9a96e",
                      }}
                    >
                      ₹{totalBudget.toLocaleString()}
                    </p>
                  </div>
                  <div style={{ fontSize: "36px" }}>💰</div>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={300000}
                  step={1000}
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="ts-range"
                  style={{
                    background: `linear-gradient(to right, #c9a96e 0%, #c9a96e ${((totalBudget - 5000) / 295000) * 100}%, rgba(255,255,255,0.12) ${((totalBudget - 5000) / 295000) * 100}%, rgba(255,255,255,0.12) 100%)`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    ₹5K
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    ₹3L
                  </span>
                </div>
              </div>

              {/* Friends */}
              <div className="ts-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "4px",
                      }}
                    >
                      Squad Size
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display'",
                        fontWeight: 900,
                        fontSize: "32px",
                        color: "#c9a96e",
                      }}
                    >
                      {friends} <span style={{ fontSize: "20px" }}>People</span>
                    </p>
                  </div>
                  <div style={{ fontSize: "36px" }}>👥</div>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={friends}
                  onChange={(e) => setFriends(Number(e.target.value))}
                  className="ts-range"
                  style={{
                    background: `linear-gradient(to right, #c9a96e 0%, #c9a96e ${((friends - 2) / 18) * 100}%, rgba(255,255,255,0.12) ${((friends - 2) / 18) * 100}%, rgba(255,255,255,0.12) 100%)`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    2
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    20
                  </span>
                </div>
              </div>

              {/* Days */}
              <div className="ts-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "4px",
                      }}
                    >
                      Trip Duration
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display'",
                        fontWeight: 900,
                        fontSize: "32px",
                        color: "#c9a96e",
                      }}
                    >
                      {days} <span style={{ fontSize: "20px" }}>Days</span>
                    </p>
                  </div>
                  <div style={{ fontSize: "36px" }}>📅</div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={14}
                  step={1}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="ts-range"
                  style={{
                    background: `linear-gradient(to right, #c9a96e 0%, #c9a96e ${((days - 1) / 13) * 100}%, rgba(255,255,255,0.12) ${((days - 1) / 13) * 100}%, rgba(255,255,255,0.12) 100%)`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    1 Day
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    2 Weeks
                  </span>
                </div>
              </div>

              {/* Per head summary */}
              <div
                className="ts-card"
                style={{
                  background: "rgba(201,169,110,0.08)",
                  borderColor: "rgba(201,169,110,0.25)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: "16px",
                  }}
                >
                  💡 Budget Breakdown
                </p>
                {[
                  { label: "Per Person", val: `₹${perHead.toLocaleString()}` },
                  {
                    label: "Per Person/Day",
                    val: `₹${Math.floor(perHead / days).toLocaleString()}`,
                  },
                  {
                    label: "Hotel Budget/Night",
                    val: `₹${Math.floor(perHead * 0.4).toLocaleString()}`,
                  },
                  {
                    label: "Food + Activities",
                    val: `₹${Math.floor(perHead * 0.6).toLocaleString()}`,
                  },
                ].map((r) => (
                  <div
                    key={r.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#c9a96e",
                      }}
                    >
                      {r.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vibe selector */}
            <div style={{ marginBottom: "32px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "14px",
                }}
              >
                What's your squad's vibe? ✨
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {vibes.map((v) => (
                  <button
                    key={v.label}
                    className={`ts-vibe-btn ${vibe === v.label ? "active" : ""}`}
                    onClick={() => setVibe(vibe === v.label ? "" : v.label)}
                  >
                    {v.icon} {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                className="ts-btn ts-btn-ghost"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                className="ts-btn ts-btn-primary"
                onClick={() => setStep(3)}
              >
                Find Destinations 🗺️
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: SUGGESTIONS ── */}
        {step === 3 && (
          <div className="fade-up">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "100px",
                  padding: "6px 18px",
                  marginBottom: "16px",
                }}
              >
                <span
                  className="pulse"
                  style={{ fontSize: "10px", color: "#c9a96e" }}
                >
                  ●
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    color: "#c9a96e",
                  }}
                >
                  {funMessages[Math.floor(Math.random() * funMessages.length)]}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: "36px",
                  marginBottom: "8px",
                  letterSpacing: "-1px",
                }}
              >
                Perfect Trips for{" "}
                <span style={{ color: "#c9a96e" }}>
                  ₹{perHead.toLocaleString()}/head
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {friends} people · {days} days · Total ₹
                {totalBudget.toLocaleString()}
                {vibe && ` · ${vibe} vibes`}
              </p>
            </div>

            {suggested.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>😅</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display'",
                    fontWeight: 700,
                    fontSize: "24px",
                    marginBottom: "8px",
                  }}
                >
                  Budget a bit tight!
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans'",
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "24px",
                  }}
                >
                  Try increasing the budget or reducing squad size.
                </p>
                <button
                  className="ts-btn ts-btn-ghost"
                  onClick={() => setStep(2)}
                >
                  ← Adjust Budget
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    marginBottom: "32px",
                  }}
                >
                  {suggested.slice(0, 6).map((d) => (
                    <div
                      key={d.name}
                      className={`ts-dest-card ${selectedDest?.name === d.name ? "selected" : ""}`}
                      onClick={() => setSelectedDest(d)}
                    >
                      <img
                        src={d.img}
                        alt={d.name}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)",
                        }}
                      />
                      {selectedDest?.name === d.name && (
                        <div
                          style={{
                            position: "absolute",
                            top: "14px",
                            right: "14px",
                            background: "#c9a96e",
                            borderRadius: "50%",
                            width: 30,
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                          }}
                        >
                          ✓
                        </div>
                      )}
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          background: "rgba(0,0,0,0.6)",
                          borderRadius: "8px",
                          padding: "4px 10px",
                          fontFamily: "'DM Sans'",
                          fontSize: "11px",
                          fontWeight: 700,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {d.vibe} {d.type}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "16px",
                          left: "16px",
                          right: "16px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Playfair Display'",
                            fontWeight: 700,
                            fontSize: "20px",
                            marginBottom: "4px",
                          }}
                        >
                          {d.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans'",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.7)",
                            marginBottom: "10px",
                          }}
                        >
                          {d.desc}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontFamily: "'Playfair Display'",
                                fontWeight: 700,
                                fontSize: "18px",
                                color: "#c9a96e",
                              }}
                            >
                              ₹{(d.minPerHead * days).toLocaleString()}
                            </span>
                            <span
                              style={{
                                fontFamily: "'DM Sans'",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.5)",
                              }}
                            >
                              /person total
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: "'DM Sans'",
                              fontSize: "11px",
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            🏨 ₹{d.minPerHead.toLocaleString()}/night
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="ts-btn ts-btn-ghost"
                    onClick={() => setStep(2)}
                  >
                    ← Change Budget
                  </button>
                  <button
                    className="ts-btn ts-btn-primary"
                    onClick={() => {
                      if (!selectedDest) return;
                      const initMsgs = [
                        {
                          from: "TripBot 🤖",
                          text: `Squad's plan: ${selectedDest.name} for ${days} days! Budget ₹${perHead.toLocaleString()}/head. Let's gooo!! 🎉`,
                          time: "Now",
                          color: "#c9a96e",
                          avatar: "🤖",
                        },
                        {
                          from: chatBots[0].name,
                          text: `${selectedDest.name}?? YESSSSS I'm so in!! 🙌`,
                          time: "Now",
                          color: chatBots[0].color,
                          avatar: chatBots[0].avatar,
                        },
                        {
                          from: chatBots[1].name,
                          text: `Omg finally!! When are we going? 📅`,
                          time: "Now",
                          color: chatBots[1].color,
                          avatar: chatBots[1].avatar,
                        },
                      ];
                      setMessages(initMsgs);
                      setStep(4);
                    }}
                    disabled={!selectedDest}
                    style={{ opacity: selectedDest ? 1 : 0.5 }}
                  >
                    Open Squad Chat 💬
                  </button>
                </div>
                {!selectedDest && (
                  <p
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.35)",
                      textAlign: "center",
                      marginTop: "12px",
                    }}
                  >
                    Select a destination first ☝️
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* ── STEP 4: CHAT ── */}
        {step === 4 && (
          <div className="fade-up">
            {/* Chat header */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px 16px 0 0",
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div style={{ fontSize: "32px" }}>{selectedDest?.vibe}</div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display'",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    {squadName || "My Squad"} → {selectedDest?.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.45)",
                      marginTop: "2px",
                    }}
                  >
                    {friends} members · {days} days · ₹
                    {perHead.toLocaleString()}/head
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {chatBots.slice(0, Math.min(friends - 1, 4)).map((b) => (
                  <div
                    key={b.name}
                    title={b.name}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: b.color + "33",
                      border: `2px solid ${b.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    {b.avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick suggestions */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 16px",
                display: "flex",
                gap: "8px",
                overflowX: "auto",
              }}
            >
              {[
                "🏨 Book hotels",
                "✈️ Flight details",
                "🍴 Food spots",
                "📸 Must-see places",
                "💸 Split costs",
                "🎉 Activities",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                  }}
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              style={{
                height: 380,
                overflowY: "auto",
                background: "rgba(0,0,0,0.2)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                padding: "20px 20px 10px",
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: m.from === "You" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: "8px",
                    marginBottom: "14px",
                  }}
                >
                  {m.from !== "You" && (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: m.color + "33",
                        border: `2px solid ${m.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                    >
                      {m.avatar || "🤖"}
                    </div>
                  )}
                  <div style={{ maxWidth: "70%" }}>
                    {m.from !== "You" && (
                      <div
                        style={{
                          fontFamily: "'DM Sans'",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: m.color,
                          marginBottom: "4px",
                        }}
                      >
                        {m.from}
                      </div>
                    )}
                    <div
                      className="ts-chat-bubble"
                      style={{
                        background:
                          m.from === "You"
                            ? "linear-gradient(135deg,#c9a96e,#a07840)"
                            : "rgba(255,255,255,0.08)",
                        color: "white",
                        borderBottomRightRadius:
                          m.from === "You" ? "4px" : "18px",
                        borderBottomLeftRadius:
                          m.from !== "You" ? "4px" : "18px",
                      }}
                    >
                      {m.text}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.25)",
                        marginTop: "4px",
                        textAlign: m.from === "You" ? "right" : "left",
                      }}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    👥
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      padding: "12px 16px",
                      borderRadius: "18px 18px 18px 4px",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "0 0 16px 16px",
                padding: "14px 16px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <input
                className="ts-chat-input"
                placeholder={`Message the squad about ${selectedDest?.name}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="ts-send-btn" onClick={sendMessage}>
                ➤
              </button>
            </div>

            {/* Book CTA */}
            <div
              style={{
                marginTop: "24px",
                background: "rgba(201,169,110,0.08)",
                border: "1px solid rgba(201,169,110,0.2)",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display'",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "4px",
                  }}
                >
                  Ready to book {selectedDest?.name}? 🎉
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {friends} rooms · {days} nights · ₹
                  {(perHead * 0.4 * days * friends).toLocaleString()} hotel
                  budget
                </div>
              </div>
              <button
                className="ts-btn ts-btn-primary"
                onClick={onBack}
                style={{ whiteSpace: "nowrap" }}
              >
                Browse Hotels →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
