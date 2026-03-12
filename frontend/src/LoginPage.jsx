import { useState } from "react";

export default function LoginPage({ onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed");
      setLoading(false);
      return;
    }

    setLoading(false);
    onLogin(data.user);

  } catch (error) {
    console.error(error);
    setError("Failed to connect to server");
    setLoading(false);
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #e8e0d5; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #333;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          background: white;
        }
        .auth-input:focus { border-color: #c9a96e; box-shadow: 0 0 0 3px rgba(201,169,110,0.15); }
        .auth-input::placeholder { color: #bbb; }

        .auth-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #c9a96e, #a07840);
          color: white; border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: 0.3px;
        }
        .auth-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(160,120,64,0.35); }
        .auth-btn:active { transform: translateY(0); }
        .auth-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .social-btn {
          width: 100%; padding: 12px;
          background: white; border: 1.5px solid #e8e0d5; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s; color: #333;
        }
        .social-btn:hover { border-color: #c9a96e; box-shadow: 0 4px 12px rgba(0,0,0,0.07); }

        .auth-link { color: #c9a96e; font-weight: 600; cursor: pointer; text-decoration: none; }
        .auth-link:hover { text-decoration: underline; }

        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease both; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
      `}</style>

      {/* LEFT PANEL */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(160deg, #0f0c08 0%, #1c1409 40%, #2a1e0e 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(201,169,110,0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "5%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(201,169,110,0.04)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{ position: "relative", textAlign: "center", maxWidth: 420 }}
        >
          <div
            style={{ cursor: "pointer", marginBottom: "48px" }}
            onClick={() => onNavigate("home")}
          >
            <img
              src="/src/assets/logo.jpeg"
              alt="FindMyStay"
              style={{ height: "70px", width: "auto" }}
            />
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "36px",
              color: "white",
              marginBottom: "16px",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Your Perfect Stay
            <br />
            <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
              Awaits You
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "15px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              marginBottom: "48px",
            }}
          >
            Login to access exclusive deals, save your favorite stays, and book
            in seconds.
          </p>

          {[
            { icon: "🏆", text: "Exclusive member-only deals up to 40% off" },
            { icon: "❤️", text: "Save and manage your wishlist anywhere" },
            { icon: "⚡", text: "One-tap booking with saved details" },
            { icon: "🎧", text: "Priority 24/7 customer support" },
          ].map((f) => (
            <div
              key={f.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  background: "rgba(201,169,110,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.4,
                }}
              >
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          flex: 1,
          background: "#faf8f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
        }}
      >
        <div className="fade-in" style={{ width: "100%", maxWidth: 400 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "32px",
              marginBottom: "8px",
              letterSpacing: "-0.8px",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "14px",
              color: "#888",
              marginBottom: "32px",
            }}
          >
            Don't have an account?{" "}
            <span className="auth-link" onClick={() => onNavigate("signup")}>
              Sign up free →
            </span>
          </p>

          {/* Social logins */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <button className="social-btn">
              <img
                src="https://www.google.com/favicon.ico"
                width={16}
                alt="Google"
              />
              Google
            </button>
            <button className="social-btn">
              <span style={{ fontSize: "16px" }}>📘</span>
              Facebook
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#e8e0d5" }} />
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "12px",
                color: "#bbb",
                fontWeight: 500,
              }}
            >
              or continue with email
            </span>
            <div style={{ flex: 1, height: "1px", background: "#e8e0d5" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#999",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#999",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="auth-input"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ paddingRight: "46px" }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#aaa",
                }}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right", marginBottom: "24px" }}>
            <span className="auth-link" style={{ fontSize: "13px" }}>
              Forgot password?
            </span>
          </div>

          {error && (
            <div
              style={{
                background: "#fff1f1",
                border: "1px solid #ffcdd2",
                borderRadius: "8px",
                padding: "10px 14px",
                marginBottom: "16px",
                fontFamily: "'DM Sans'",
                fontSize: "13px",
                color: "#c62828",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <button className="auth-btn" onClick={handleLogin} disabled={loading}>
            {loading ? <span className="spinner" /> : "Login to FindMyStay"}
          </button>

          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "12px",
              color: "#bbb",
              textAlign: "center",
              marginTop: "20px",
              lineHeight: 1.6,
            }}
          >
            By logging in, you agree to our{" "}
            <span className="auth-link" style={{ fontSize: "12px" }}>
              Terms
            </span>{" "}
            &{" "}
            <span className="auth-link" style={{ fontSize: "12px" }}>
              Privacy Policy
            </span>
          </p>

          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "13px",
                color: "#aaa",
                cursor: "pointer",
              }}
              onClick={() => onNavigate("home")}
            >
              ← Back to Homepage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
