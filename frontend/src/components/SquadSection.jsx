export default function SquadSection({ setPage }) {
  const messages = [
    { name: "Rohan", avatar: "👦", msg: "Goa or Manali? 🤔", color: "#6c63ff" },
    { name: "Priya", avatar: "👧", msg: "GOA!! Beach vibes 🏖️", color: "#ff6584" },
    { name: "You", avatar: "😎", msg: "Budget: ₹5000/head ✅", color: "#c9a96e" },
    { name: "Arjun", avatar: "🧔", msg: "I'm soooo in!! 🙌", color: "#43aa8b" },
  ];

  return (
    <section style={{ padding: "0 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a1025 50%, #0d1a0d 100%)", borderRadius: "28px", padding: "60px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ position: "absolute", top: "-40px", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "rgba(201,169,110,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "rgba(99,102,241,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "relative", top: "30%", right: "30%", width: 150, height: 150, borderRadius: "50%", background: "rgba(16,185,129,0.04)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 560 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
              <span style={{ fontSize: "10px", color: "#c9a96e" }}>✦</span>
              <span style={{ fontFamily: "'DM Sans'", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#c9a96e" }}>
                New Feature
              </span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(28px, 4vw, 46px)", color: "white", marginBottom: "14px", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Plan a Trip with<br />
              <span style={{ color: "#c9a96e", fontStyle: "italic" }}>Your Squad ✈️</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "28px", maxWidth: 440 }}>
              Set your total budget, split it across friends, pick your vibe — and let everyone plan together in a fun group chat. No more 50-message WhatsApp chaos!
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
              {["💰 Budget Splitter", "🗺️ AI Destination Picks", "💬 Squad Live Chat"].map((f) => (
                <div key={f} style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 600, padding: "7px 16px", borderRadius: "100px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)" }}>{f}</div>
              ))}
            </div>
            <button onClick={() => setPage("tripsquad")} style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "15px", padding: "16px 36px", borderRadius: "14px", background: "linear-gradient(135deg, #c9a96e, #a07840)", color: "white", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(201,169,110,0.3)", transition: "transform 0.15s, box-shadow 0.15s", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              🤝 Start Planning with Squad
            </button>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", minWidth: "260px" }}>
            {messages.map((m, i) => (
              <div key={m.name} style={{ display: "flex", alignItems: "flex-end", gap: "10px", flexDirection: m.name === "You" ? "row-reverse" : "row", animation: `fadeSlideUp 0.5s ${i * 0.15}s both` }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: m.color + "33", border: `2px solid ${m.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{m.avatar}</div>
                <div style={{ background: m.name === "You" ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.07)", borderRadius: "14px", padding: "10px 14px", maxWidth: 180, borderBottomRightRadius: m.name === "You" ? "4px" : "14px", borderBottomLeftRadius: m.name !== "You" ? "4px" : "14px", border: m.name === "You" ? "1px solid rgba(201,169,110,0.2)" : "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: "10px", fontWeight: 700, color: m.color, marginBottom: "3px" }}>{m.name}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{m.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
