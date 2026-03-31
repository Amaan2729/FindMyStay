export default function WhyChooseSection() {
  const cards = [
    { icon: "🔒", title: "Secure Booking", desc: "End-to-end encrypted payments. Your data is safe with us." },
    { icon: "💰", title: "Best Price Guarantee", desc: "Found cheaper? We'll match it. No questions asked." },
    { icon: "🏅", title: "Verified Properties", desc: "Every stay is reviewed, verified, and quality-assured." },
    { icon: "🎧", title: "24/7 Support", desc: "Our team is always here — before, during, after your stay." },
  ];

  return (
    <section style={{ background: "#f5f0ea", padding: "60px 5%" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(24px, 3vw, 36px)", marginBottom: "16px", letterSpacing: "-0.5px" }}>
          Why Travelers Choose findmyStay
        </h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: "15px", color: "#777", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.7 }}>
          We make every part of your stay — from discovery to checkout — seamless and special.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
          {cards.map((t) => (
            <div key={t.title} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "14px" }}>{t.icon}</div>
              <h4 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>{t.title}</h4>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "#888", lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
