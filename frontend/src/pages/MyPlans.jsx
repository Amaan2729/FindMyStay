import { useEffect, useState } from "react";

const getPlanStorageKey = (email) => `planEarly_${email?.toLowerCase()?.replace(/[^a-z0-9]/g, "_") || "guest"}`;

const cardStyle = {
  background: "white",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  borderRadius: "24px",
  padding: "22px",
  marginBottom: "18px",
};

export default function MyPlans({ user, onBack, onViewPlan, onCreatePlan }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    if (!user) {
      setPlans([]);
      return;
    }
    const key = getPlanStorageKey(user.email);
    const saved = localStorage.getItem(key);
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      setPlans(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.warn("Failed to load saved plans", err);
      setPlans([]);
    }
  }, [user]);

  const handleDelete = (planId) => {
    const key = getPlanStorageKey(user.email);
    const filtered = plans.filter((plan) => plan.id !== planId);
    localStorage.setItem(key, JSON.stringify(filtered));
    setPlans(filtered);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fbf7f1", color: "#111827", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
        <button onClick={onBack} style={{ marginBottom: "24px", borderRadius: "999px", border: "1px solid rgba(17,24,39,0.12)", background: "white", color: "#111827", padding: "12px 18px", cursor: "pointer", fontWeight: 700 }}>
          ← Back to home
        </button>

        <h1 style={{ fontSize: "clamp(36px, 4vw, 52px)", marginBottom: "14px", fontWeight: 900 }}>Your Saved Plans</h1>
        <p style={{ maxWidth: "720px", lineHeight: 1.8, color: "#475569", marginBottom: "28px" }}>
          All of your Plan Early entries are saved per account. Use the list below to review, manage, or open a plan to select hotels and book.
        </p>

        {plans.length === 0 ? (
          <div style={{ padding: "30px", borderRadius: "24px", background: "white", border: "1px solid rgba(15, 23, 42, 0.08)" }}>
            <p style={{ fontSize: "18px", color: "#111827", marginBottom: "16px" }}>No saved plans yet.</p>
            <p style={{ color: "#475569", marginBottom: "24px" }}>
              Create your first Plan Early entry and come back to book stays with the same dates and budget.
            </p>
            <button type="button" onClick={onCreatePlan} style={{ borderRadius: "20px", border: "none", background: "#c9a96e", color: "white", padding: "14px 24px", cursor: "pointer", fontWeight: 700 }}>
              Create a New Plan
            </button>
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "18px", flexWrap: "wrap", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "22px", color: "#111827" }}>{plan.destination || "Destination"}</h2>
                  <p style={{ margin: "8px 0 0", color: "#475569" }}>{plan.purpose} travel with ₹{Number(plan.budget).toLocaleString()} budget</p>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button type="button" onClick={() => onViewPlan(plan.id)} style={{ borderRadius: "20px", border: "1px solid rgba(17,24,39,0.12)", background: "white", color: "#111827", padding: "12px 20px", cursor: "pointer", fontWeight: 700 }}>
                    View Plan
                  </button>
                  <button type="button" onClick={() => handleDelete(plan.id)} style={{ borderRadius: "20px", border: "1px solid rgba(235, 87, 87, 0.18)", background: "#fff1f2", color: "#b91c1c", padding: "12px 20px", cursor: "pointer", fontWeight: 700 }}>
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "18px", marginTop: "22px" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Check-in</div>
                  <strong style={{ fontSize: "15px", color: "#111827" }}>{plan.checkIn}</strong>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Check-out</div>
                  <strong style={{ fontSize: "15px", color: "#111827" }}>{plan.checkOut}</strong>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Guests</div>
                  <strong style={{ fontSize: "15px", color: "#111827" }}>{plan.guests}</strong>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Saved</div>
                  <strong style={{ fontSize: "15px", color: "#111827" }}>{new Date(plan.createdAt).toLocaleDateString()}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
