import { useState } from "react";

export default function SignupPage({ onNavigate, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = form, 2 = success

  const getStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#e53935", "#fb8c00", "#43a047", "#1e88e5"][
    strength
  ];

  const handleSignup = async () => {
  setError("");

  if (!name.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError("Enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirm) {
    setError("Passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed");
    }

    setLoading(false);
    setStep(2);

  } catch (err) {
    setLoading(false);
    setError(err.message);
  }
};

  

  

  if (step === 2) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#faf8f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 80% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } } .pop-in { animation: popIn 0.5s ease both; } @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } } .fade-up { animation: fadeUp 0.5s 0.3s ease both; } .auth-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #c9a96e, #a07840); color: white; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; } .auth-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(160,120,64,0.35); }`}</style>
        <div
          style={{
            textAlign: "center",
            maxWidth: 440,
            padding: "60px 40px",
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="pop-in"
            style={{ fontSize: "64px", marginBottom: "24px" }}
          >
            🎉
          </div>
          <h2
            className="fade-up"
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "28px",
              marginBottom: "12px",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome to <span style={{ color: "#c9a96e" }}>findmyStay</span>!
          </h2>
          <p
            className="fade-up"
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "14px",
              color: "#888",
              marginBottom: "32px",
              lineHeight: 1.7,
            }}
          >
            Hey <strong style={{ color: "#333" }}>{name}</strong>! Your account
            has been created successfully. Start exploring amazing stays across
            India.
          </p>
          <div
            className="fade-up"
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <button
              className="auth-btn"
              onClick={() => onLogin({ name, email })}
            >
              Start Exploring 🗺️
            </button>
            <button
              onClick={() => onNavigate("login")}
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "13px",
                color: "#aaa",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login instead
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: white;
        }
        .auth-input:focus { border-color: #c9a96e; box-shadow: 0 0 0 3px rgba(201,169,110,0.15); }
        .auth-input::placeholder { color: #bbb; }

        .auth-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #c9a96e, #a07840);
          color: white; border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;
        }
        .auth-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(160,120,64,0.35); }
        .auth-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .social-btn {
          width: 100%; padding: 12px; background: white; border: 1.5px solid #e8e0d5; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s; color: #333;
        }
        .social-btn:hover { border-color: #c9a96e; box-shadow: 0 4px 12px rgba(0,0,0,0.07); }

        .auth-link { color: #c9a96e; font-weight: 600; cursor: pointer; }
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
            top: "8%",
            left: "8%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(201,169,110,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            right: "5%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(201,169,110,0.04)",
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
            Join Thousands of
            <br />
            <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
              Happy Travelers
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
            Create your free account and discover incredible stays across 25+
            destinations in India.
          </p>

          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.07)",
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
              What you get
            </p>
            {[
              {
                icon: "🎯",
                title: "Personalised Picks",
                desc: "Stays matched to your travel style",
              },
              {
                icon: "💸",
                title: "Member Discounts",
                desc: "Up to 40% off on every booking",
              },
              {
                icon: "🗺️",
                title: "Trip Planning",
                desc: "Manage all your bookings in one place",
              },
              {
                icon: "🔔",
                title: "Smart Alerts",
                desc: "Price drops on your wishlist items",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "14px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "9px",
                    background: "rgba(201,169,110,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      marginTop: "2px",
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
          padding: "40px 80px",
          overflowY: "auto",
        }}
      >
        <div className="fade-in" style={{ width: "100%", maxWidth: 400 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "30px",
              marginBottom: "8px",
              letterSpacing: "-0.8px",
            }}
          >
            Create your account
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "14px",
              color: "#888",
              marginBottom: "28px",
            }}
          >
            Already have an account?{" "}
            <span className="auth-link" onClick={() => onNavigate("login")}>
              Login →
            </span>
          </p>

          {/* Social */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginBottom: "22px",
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
              <span style={{ fontSize: "16px" }}>📘</span>Facebook
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "22px",
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
              or sign up with email
            </span>
            <div style={{ flex: 1, height: "1px", background: "#e8e0d5" }} />
          </div>

          {/* Full Name */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#999",
                display: "block",
                marginBottom: "7px",
              }}
            >
              Full Name
            </label>
            <input
              className="auth-input"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#999",
                display: "block",
                marginBottom: "7px",
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
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "6px" }}>
            <label
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#999",
                display: "block",
                marginBottom: "7px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="auth-input"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Strength bar */}
          {password.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "3px",
                      borderRadius: "2px",
                      background: i <= strength ? strengthColor : "#e8e0d5",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: strengthColor,
                }}
              >
                {strengthLabel}
              </span>
            </div>
          )}

          {/* Confirm Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#999",
                display: "block",
                marginBottom: "7px",
              }}
            >
              Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="auth-input"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                style={{
                  paddingRight: "46px",
                  borderColor:
                    confirm && confirm !== password
                      ? "#e53935"
                      : confirm && confirm === password
                        ? "#43a047"
                        : "#e8e0d5",
                }}
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
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
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>
            {confirm && confirm === password && (
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "11px",
                  color: "#43a047",
                  marginTop: "4px",
                }}
              >
                ✓ Passwords match
              </p>
            )}
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

          <button
            className="auth-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : "Create My Account"}
          </button>

          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "12px",
              color: "#bbb",
              textAlign: "center",
              marginTop: "16px",
              lineHeight: 1.6,
            }}
          >
            By signing up, you agree to our{" "}
            <span className="auth-link" style={{ fontSize: "12px" }}>
              Terms
            </span>{" "}
            &{" "}
            <span className="auth-link" style={{ fontSize: "12px" }}>
              Privacy Policy
            </span>
          </p>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
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
