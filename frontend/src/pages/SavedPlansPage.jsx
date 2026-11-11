import { useEffect, useState } from "react";

const pageStyles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8f5ef 0%, #f3ebe1 45%, #ede2d3 100%)",
    color: "#111827",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  wrapper: {
    maxWidth: 1040,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    borderRadius: "999px",
    border: "1px solid rgba(17, 24, 39, 0.12)",
    background: "white",
    color: "#111827",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 700,
    marginBottom: "28px",
  },
  heroCard: {
    padding: "32px",
    borderRadius: "32px",
    background: "white",
    boxShadow: "0 30px 90px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    marginBottom: "28px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#475569",
    marginBottom: "10px",
    fontWeight: 700,
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px",
    marginBottom: "22px",
  },
  card: {
    borderRadius: "28px",
    background: "#f8fafc",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    padding: "26px",
    boxShadow: "0 18px 60px rgba(15, 23, 42, 0.06)",
  },
  planHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "18px",
  },
  buttonPrimary: {
    borderRadius: "20px",
    border: "none",
    background: "#c9a96e",
    color: "#111827",
    padding: "16px 28px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 18px 44px rgba(201, 169, 110, 0.18)",
  },
  warning: {
    color: "#b91c1c",
    marginTop: "12px",
  },
};

const getStorageKey = (email) => `planEarly_${email?.toLowerCase()?.replace(/[^a-z0-9]/g, "_") || "guest"}`;

export default function SavedPlansPage({ user, onBack, onBookPlan, onCreatePlan }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const key = getStorageKey(user?.email);
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setPlan(JSON.parse(saved));
      } catch (err) {
        console.warn("Saved plan parse failed", err);
      }
    }
    setLoading(false);
  }, [user]);

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.wrapper}>
        <button style={pageStyles.backButton} onClick={onBack}>
          ← Back to home
        </button>

        <div style={pageStyles.heroCard}>
          <div style={pageStyles.planHeader}>
            <div>
              <div style={{ fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#64748b", marginBottom: "10px" }}>
                Your Saved Plan
              </div>
              <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", margin: 0, lineHeight: 1.05, color: "#111827" }}>
                Review and book your Early Plan
              </h1>
            </div>
            <button style={pageStyles.buttonPrimary} onClick={onCreatePlan}>
              Create a New Plan
            </button>
          </div>
          <p style={{ color: "#475569", lineHeight: 1.8, maxWidth: "700px", marginBottom: "20px" }}>
            Plans are saved separately for each signed-in user. Once you’ve created a plan, use this page to instantly open booking with your preferred dates and guest details.
          </p>

          {loading ? (
            <div>Loading your saved travel plan…</div>
          ) : plan ? (
            <div style={pageStyles.card}>
              <div style={pageStyles.infoRow}>
                <div>
                  <div style={pageStyles.label}>Destination</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{plan.destination}</div>
                </div>
                <div>
                  <div style={pageStyles.label}>Travel purpose</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{plan.purpose}</div>
                </div>
              </div>
              <div style={pageStyles.infoRow}>
                <div>
                  <div style={pageStyles.label}>Check-in</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{plan.checkIn}</div>
                </div>
                <div>
                  <div style={pageStyles.label}>Check-out</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{plan.checkOut}</div>
                </div>
              </div>
              <div style={pageStyles.infoRow}>
                <div>
                  <div style={pageStyles.label}>Guests</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{plan.guests}</div>
                </div>
                <div>
                  <div style={pageStyles.label}>Estimated budget</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>₹{Number(plan.budget).toLocaleString()}</div>
                </div>
              </div>

              <button
                style={pageStyles.buttonPrimary}
                onClick={() => {
                  if (!user) {
                    setMessage("Please log in so we can save this plan to your account before booking.");
                    return;
                  }
                  onBookPlan(plan);
                }}
              >
                Book this plan
              </button>
              {message && <div style={pageStyles.warning}>{message}</div>}
            </div>
          ) : (
            <div style={{ padding: "28px", borderRadius: "28px", background: "#fffaf0", border: "1px solid rgba(249, 205, 130, 0.35)", color: "#92400e" }}>
              No saved plan found yet. Create one using the Plan Early page, then come back to book it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
