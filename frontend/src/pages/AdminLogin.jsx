import { useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AdminLogin({ onAdminLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Invalid credentials");
      }

      toast.success("Admin login successful!");
      onAdminLogin?.({ email });
    } catch (err) {
      console.error("Admin login error", err);
      toast.error(err.message || "Invalid credentials");
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
          <input 
            className="auth-input" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="admin@findmystay.com"
            disabled={loading}
          />

          <label style={{ display: "block", margin: "18px 0 10px", fontSize: 14 }}>Password</label>
          <input 
            className="auth-input" 
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
            disabled={loading}
          />

          <button 
            type="submit" 
            style={{ width: "100%", marginTop: 24, padding: "12px 16px", background: "#d4a574", color: "white", border: "none", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {onBack && (
          <button 
            onClick={onBack}
            style={{ width: "100%", marginTop: 12, padding: "12px 16px", background: "transparent", color: "#d4a574", border: "1px solid #d4a574", borderRadius: 8, fontWeight: 500, cursor: "pointer" }}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
