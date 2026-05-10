import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 420, width: "100%", background: "white", boxShadow: "0 14px 48px rgba(0,0,0,0.14)", borderRadius: 20, padding: 34 }}>
        <h2 style={{ margin: 0, marginBottom: 20, fontFamily: "'Playfair Display'", color: "#1a1a1a" }}>Sign In</h2>
        <p style={{ color: "#6b6b6b", marginBottom: 20 }}>Welcome back to FindMyStay</p>
        
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: 10, fontSize: 14 }}>Email</label>
          <input 
            className="auth-input" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="your@email.com"
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

        <p style={{ textAlign: "center", marginTop: 20, color: "#6b6b6b" }}>
          Don't have an account? <a href="/signup" style={{ color: "#d4a574", textDecoration: "none" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
