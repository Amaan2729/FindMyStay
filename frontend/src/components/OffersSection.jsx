export default function OffersSection() {
  const offers = [
    {
      emoji: "🌙",
      title: "Last Minute Deals",
      desc: "Unlock up to 40% off on tonight's stays. Limited rooms, lightning deals.",
      cta: "Grab Deal",
      accent: "#c9a96e",
      pct: "40% OFF",
    },
    {
      emoji: "📅",
      title: "Early Bird Offer",
      desc: "Book 30 days in advance and save big on premium properties.",
      cta: "Plan Early",
      accent: "#6ec9a9",
      pct: "25% OFF",
    },
    {
      emoji: "🏆",
      title: "Weekend Escapes",
      desc: "Special weekend packages curated for the perfect 2-night retreat.",
      cta: "Explore",
      accent: "#c96e8a",
      pct: "Packages",
    },
  ];

  return (
    <section style={{ padding: "20px 5% 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: "10px" }}>
            Save More
          </p>
          <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-1px" }}>
            Exclusive Deals
          </h2>
        </div>
        <div className="offer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          {offers.map((o) => (
            <div key={o.title} className="offer-card">
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{o.emoji}</div>
                <div style={{ display: "inline-block", background: o.accent, color: "white", fontFamily: "'DM Sans'", fontWeight: 800, fontSize: "11px", letterSpacing: "1.5px", padding: "4px 12px", borderRadius: "100px", marginBottom: "14px", textTransform: "uppercase" }}>
                  {o.pct}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "20px", color: "white", marginBottom: "10px" }}>{o.title}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "20px" }}>{o.desc}</p>
                <button style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "13px", padding: "10px 24px", borderRadius: "8px", background: o.accent, color: "white", border: "none", cursor: "pointer" }}>
                  {o.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
