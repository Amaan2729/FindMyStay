export default function SiteFooter({ logo, onAdminAccess }) {
  const columns = [
    { title: "Company", links: ["About Us", "Careers", "Press", "Blog", "Contact"] },
    { title: "Support", links: ["Help Center", "Cancellation", "Safety", "Accessibility"] },
    { title: "Discover", links: ["Hotels", "Resorts", "Motels", "Villas", "Hostels", "Camping"] },
  ];

  return (
    <footer style={{ background: "#111", padding: "60px 5% 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <img src={logo} alt="FindMyStay" style={{ height: "45px", width: "auto" }} />
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260 }}>
              Your trusted companion for finding the perfect stay across India and beyond.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["📘", "🐦", "📸", "▶️"].map((s) => (
                <button key={s} style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "14px", cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.9)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "16px" }}>
                {col.title}
              </h4>
              {col.links.map((l) => (
                <div key={l} style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "10px", cursor: "pointer" }}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>© 2025 findmyStay. All rights reserved.</span>
            {onAdminAccess && (
              <button
                onClick={onAdminAccess}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.2)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: "2px 0"
                }}
              >
                Admin
              </button>
            )}
          </div>
          <span style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Privacy Policy · Terms of Service · Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
