export default function NavBar({
  scrolled,
  logo,
  user,
  admin,
  setPage,
  handleLogout,
  notifications = [],
  unreadCount = 0,
  showNotifPanel = false,
  onToggleNotifications = () => {},
  onClearNotifications = () => {},
}) {
  const navItems = [
    { label: "Explore", page: 'home' },
    { label: "Deals", page: 'home' },
    { label: "About", page: 'about' },
    { label: "Blog", page: 'home' },
  ];

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
        {navItems.map((item) => (
          <a key={item.label} className="nav-link" onClick={() => setPage(item.page)} style={{ cursor: "pointer" }}>
            {item.label}
          </a>
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", position: "relative" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={onToggleNotifications}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            🔔
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -8,
                  background: "#e94643",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "10px",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifPanel && (
            <div
              style={{
                position: "absolute",
                top: "42px",
                right: 0,
                width: "320px",
                maxHeight: "320px",
                overflowY: "auto",
                background: "rgba(26, 26, 26, 0.96)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                padding: "10px",
                color: "white",
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                zIndex: 101,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <strong style={{ fontSize: "13px" }}>
                  Notifications ({notifications.length})
                </strong>
                <button
                  onClick={onClearNotifications}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "white",
                    borderRadius: "6px",
                    fontSize: "11px",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              </div>
              {notifications.length === 0 ? (
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", padding: "8px 0" }}>
                  No new notifications
                </div>
              ) : (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      padding: "8px",
                      marginBottom: "8px",
                      fontSize: "12px",
                      lineHeight: 1.3,
                    }}
                  >
                    <div>{note.text}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", marginTop: "4px" }}>
                      {new Date(note.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

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
