import { useState } from "react";

export default function AdminLogin({ onAdminLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      onAdminLogin({ email });
    } catch (err) {
      console.error("Admin login error", err);
      setError("Unable to connect with server");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 420, width: "100%", background: "white", boxShadow: "0 14px 48px rgba(0,0,0,0.14)", borderRadius: 20, padding: 34 }}>
        <h2 style={{ margin: 0, marginBottom: 20, fontFamily: "'Playfair Display'", color: "#1a1a1a" }}>Admin Sign In</h2>
        <p style={{ color: "#6b6b6b", marginBottom: 20 }}>Use admin credentials to enter dashboard.</p>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 10, fontSize: 14 }}>Email</label>
          <input className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@findmystay.com" />

          <label style={{ display: "block", margin: "18px 0 10px", fontSize: 14 }}>Password</label>
          <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" />

          {error && <p style={{ color: "#c83f3f", marginTop: 12 }}>{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: 16 }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button type="button" onClick={onBack} style={{ width: "100%", marginTop: 12, background: "transparent", border: "1px solid #c9a96e", color: "#333", borderRadius: 10, padding: "12px 14px", cursor: "pointer" }}>
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
