export default function NavBar({ scrolled, logo, user, setPage, handleLogout }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(20,20,20,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s",
        padding: "0 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "68px",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} alt="FindMyStay" style={{ height: "50px", width: "auto" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {[{label:"Explore",page:'home'},{label:"Deals",page:'home'},{label:"About",page:'about'},{label:"Blog",page:'home'}].map((item) => (
          <a key={item.label} className="nav-link" onClick={() => setPage(item.page)} style={{ cursor: "pointer" }}>
            {item.label}
          </a>
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {user ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #c9a96e, #a07840)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans'",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "white",
                }}
              >
                {user.name[0].toUpperCase()}
              </div>
              <span style={{ fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 600, color: "white" }}>
                Hi, {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "13px",
                fontWeight: 600,
                padding: "9px 22px",
                borderRadius: "8px",
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setPage("login")}
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "13px",
                fontWeight: 600,
                padding: "9px 22px",
                borderRadius: "8px",
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "white",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <button onClick={() => setPage("signup")} className="search-btn" style={{ padding: "9px 22px", fontSize: "13px" }}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
