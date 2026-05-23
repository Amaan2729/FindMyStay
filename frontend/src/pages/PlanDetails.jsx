import { useEffect, useMemo, useState } from "react";

const getPlanStorageKey = (email) => `planEarly_${email?.toLowerCase()?.replace(/[^a-z0-9]/g, "_") || "guest"}`;

const hotelRecommendations = [
  { id: "h1", name: "Golden Horizon Hotel", destination: "Goa", rating: 4.8, price: 5200, tag: "Beachfront", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80" },
  { id: "h2", name: "Royal City Retreat", destination: "Jaipur", rating: 4.7, price: 6800, tag: "Heritage", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80" },
  { id: "h3", name: "Mountain Serenity Resort", destination: "Manali", rating: 4.6, price: 4700, tag: "Mountain View", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80" },
  { id: "h4", name: "Backwater Calm Stay", destination: "Kerala", rating: 4.9, price: 7300, tag: "Nature", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80" },
  { id: "h5", name: "City Luxe Hotel", destination: "Delhi", rating: 4.5, price: 5900, tag: "Business", img: "https://images.unsplash.com/photo-1560185127-6df125189f98?w=900&q=80" },
];

const cardStyle = {
  background: "white",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  borderRadius: "24px",
  padding: "22px",
  marginBottom: "20px",
};

export default function PlanDetails({ user, planId, onBack, onBookHotel }) {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (!user || !planId) {
      setPlan(null);
      return;
    }
    const key = getPlanStorageKey(user.email);
    const saved = localStorage.getItem(key);
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      const found = Array.isArray(parsed) ? parsed.find((entry) => entry.id === planId) : null;
      setPlan(found || null);
    } catch (err) {
      console.warn("Failed to load plan details", err);
      setPlan(null);
    }
  }, [planId, user]);

  const recommendedHotels = useMemo(() => {
    if (!plan) return [];
    const normalized = plan.destination?.toLowerCase()?.trim() || "";
    return hotelRecommendations.filter((hotel) => hotel.destination.toLowerCase().includes(normalized));
  }, [plan]);

  if (!plan) {
    return (
      <div style={{ minHeight: "100vh", background: "#fbf7f1", padding: "32px 24px" }}>
        <button onClick={onBack} style={{ marginBottom: "24px", borderRadius: "999px", border: "1px solid rgba(17,24,39,0.12)", background: "white", color: "#111827", padding: "12px 18px", cursor: "pointer", fontWeight: 700 }}>
          ← Back to saved plans
        </button>
        <div style={{ maxWidth: 840, margin: "0 auto", background: "white", borderRadius: "24px", padding: "32px", border: "1px solid rgba(15,23,42,0.08)" }}>
          <h1 style={{ marginTop: 0, fontSize: "32px", color: "#111827" }}>Plan not found</h1>
          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            We couldn’t find that saved plan. It may have been removed or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fbf7f1", color: "#111827", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
        <button onClick={onBack} style={{ marginBottom: "24px", borderRadius: "999px", border: "1px solid rgba(17,24,39,0.12)", background: "white", color: "#111827", padding: "12px 18px", cursor: "pointer", fontWeight: 700 }}>
          ← Back to saved plans
        </button>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "clamp(36px, 4vw, 52px)", marginBottom: "12px", fontWeight: 900 }}>Plan: {plan.destination || "Your Trip"}</h1>
          <p style={{ color: "#475569", lineHeight: 1.8 }}>
            Review the plan details, compare recommended stays for your destination, and start booking directly from this saved plan.
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Destination</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{plan.destination}</strong>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Check-in</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{plan.checkIn}</strong>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Check-out</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{plan.checkOut}</strong>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#475569", marginBottom: "6px" }}>Guests</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{plan.guests}</strong>
            </div>
          </div>

          <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "18px" }}>
            <div style={{ padding: "18px", borderRadius: "18px", background: "#f7f5f1" }}>
              <div style={{ fontSize: "13px", color: "#475569", marginBottom: "8px" }}>Budget</div>
              <strong style={{ fontSize: "16px", color: "#111827" }}>₹{Number(plan.budget).toLocaleString()}</strong>
            </div>
            <div style={{ padding: "18px", borderRadius: "18px", background: "#f7f5f1" }}>
              <div style={{ fontSize: "13px", color: "#475569", marginBottom: "8px" }}>Purpose</div>
              <strong style={{ fontSize: "16px", color: "#111827" }}>{plan.purpose}</strong>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "16px" }}>Recommended stays</h2>
          {recommendedHotels.length === 0 ? (
            <div style={{ padding: "24px", borderRadius: "24px", background: "#fff7e8", border: "1px solid rgba(201,169,110,0.2)" }}>
              <p style={{ margin: 0, color: "#475569" }}>
                No direct hotel matches found for this destination yet. Try editing the plan or create a new Plan Early entry.
              </p>
            </div>
          ) : (
            recommendedHotels.map((hotel) => (
              <div key={hotel.id} style={{ ...cardStyle, display: "grid", gridTemplateColumns: "260px 1fr 160px", gap: "18px", alignItems: "center" }}>
                <img src={hotel.img} alt={hotel.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "20px" }} />
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>{hotel.name}</div>
                  <div style={{ fontSize: "14px", color: "#475569", margin: "10px 0" }}>{hotel.destination}</div>
                  <div style={{ fontSize: "14px", color: "#475569" }}>{hotel.tag} • {hotel.rating} ★</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                  <div style={{ color: "#111827", fontWeight: 700, fontSize: "18px" }}>₹{hotel.price.toLocaleString()}</div>
                  <button type="button" onClick={() => onBookHotel(plan, hotel)} style={{ borderRadius: "20px", border: "none", background: "#c9a96e", color: "white", padding: "12px 22px", cursor: "pointer", fontWeight: 700 }}>
                    Book from Plan
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
