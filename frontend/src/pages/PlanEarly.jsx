import { useEffect, useMemo, useState } from "react";

const dummyHotels = [
  { id: 1, name: "Sunset Beach Resort", destination: "Goa", rating: 4.8, price: 5200, tag: "Beachfront" },
  { id: 2, name: "Royal Heritage Hotel", destination: "Jaipur", rating: 4.7, price: 6800, tag: "Boutique" },
  { id: 3, name: "Hillside Comfort Lodge", destination: "Manali", rating: 4.6, price: 4700, tag: "Mountain View" },
  { id: 4, name: "Serene Backwater Stay", destination: "Kerala", rating: 4.9, price: 7300, tag: "Nature" },
  { id: 5, name: "City Center Luxe", destination: "Delhi", rating: 4.5, price: 5900, tag: "Business" },
];

const purposes = ["Family", "Couple", "Solo", "Business"];

const pageStyles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #fbf6ee 0%, #f7f1e7 45%, #f3e9dd 100%)",
    color: "#111827",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  wrapper: {
    maxWidth: 1200,
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
    borderRadius: "32px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,249,242,0.96))",
    boxShadow: "0 30px 90px rgba(15, 23, 42, 0.08)",
    padding: "40px",
    marginBottom: "34px",
    border: "1px solid rgba(15, 23, 42, 0.06)",
  },
  headline: {
    fontSize: "clamp(34px, 4vw, 48px)",
    lineHeight: 1.04,
    margin: "0 0 18px",
    fontWeight: 900,
    color: "#111827",
  },
  heroText: {
    maxWidth: "640px",
    fontSize: "17px",
    lineHeight: 1.8,
    color: "#475569",
    marginBottom: "24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },
  formCard: {
    padding: "32px",
    borderRadius: "30px",
    background: "white",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
  },
  fieldGroup: {
    display: "grid",
    gap: "18px",
    marginBottom: "22px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#334155",
  },
  input: {
    width: "100%",
    borderRadius: "18px",
    border: "1px solid #d1d5db",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#111827",
    background: "#f8fafc",
    outline: "none",
  },
  select: {
    width: "100%",
    borderRadius: "18px",
    border: "1px solid #d1d5db",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#111827",
    background: "#f8fafc",
    outline: "none",
  },
  sliderRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "8px",
  },
  slider: {
    width: "100%",
  },
  submitButton: {
    width: "100%",
    borderRadius: "20px",
    border: "none",
    padding: "16px 22px",
    fontSize: "16px",
    fontWeight: 800,
    color: "white",
    background: "#c9a96e",
    cursor: "pointer",
    boxShadow: "0 18px 44px rgba(201, 169, 110, 0.2)",
  },
  asideCard: {
    display: "grid",
    gap: "20px",
    padding: "28px",
    borderRadius: "30px",
    background: "white",
    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    minHeight: "560px",
  },
  badge: {
    display: "inline-flex",
    fontSize: "12px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontWeight: 800,
    color: "#c9a96e",
    gap: "10px",
  },
  hotelCard: {
    borderRadius: "24px",
    overflow: "hidden",
    background: "#f8fafc",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    padding: "18px",
  },
  hotelImage: {
    width: "100%",
    borderRadius: "20px",
    height: "160px",
    objectFit: "cover",
    marginBottom: "16px",
  },
  successBox: {
    background: "#eef7ff",
    border: "1px solid #b6d8ff",
    color: "#0f172a",
    borderRadius: "22px",
    padding: "18px 22px",
    marginBottom: "22px",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: "14px",
    marginTop: "4px",
  },
};

const initialState = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  budget: 65000,
  purpose: "Family",
};

const getPlanStorageKey = (email) => `planEarly_${email?.toLowerCase()?.replace(/[^a-z0-9]/g, "_") || "guest"}`;

export default function PlanEarly({ user, onBack, onSavedPlans }) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [budget, setBudget] = useState(65000);
  const [purpose, setPurpose] = useState("Family");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [savedPlan, setSavedPlan] = useState(null);

  useEffect(() => {
    if (!user) return;
    const key = getPlanStorageKey(user.email);
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const lastPlan = parsed[0];
          setDestination(lastPlan.destination || "");
          setCheckIn(lastPlan.checkIn || "");
          setCheckOut(lastPlan.checkOut || "");
          setGuests(lastPlan.guests || "2");
          setBudget(lastPlan.budget || 65000);
          setPurpose(lastPlan.purpose || "Family");
          setSavedPlan(lastPlan);
        }
      } catch (err) {
        console.warn("Failed to parse saved plan data", err);
      }
    }
  }, [user]);

  const suggestedHotels = useMemo(() => {
    const normalized = destination.trim().toLowerCase();
    if (!normalized) return dummyHotels.slice(0, 3);
    return dummyHotels.filter((hotel) => hotel.destination.toLowerCase().includes(normalized)).slice(0, 3);
  }, [destination]);

  const recommendedDeals = useMemo(() => {
    return dummyHotels.filter((hotel) => hotel.price <= budget + 2000).slice(0, 3);
  }, [budget]);

  const validateForm = () => {
    if (!destination.trim()) return "Please choose a travel destination.";
    if (!checkIn || !checkOut) return "Select both check-in and check-out dates.";
    if (new Date(checkOut) <= new Date(checkIn)) return "Check-out must be after check-in.";
    if (!guests) return "Please select the number of guests.";
    if (!purpose) return "Please choose a travel purpose.";
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSubmitting(true);
    setSuccess(false);

    const planData = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      destination,
      checkIn,
      checkOut,
      guests,
      budget,
      purpose,
      createdAt: new Date().toISOString(),
    };

    window.setTimeout(() => {
      const key = getPlanStorageKey(user?.email);
      const saved = localStorage.getItem(key);
      const plans = saved ? JSON.parse(saved) : [];
      const updatedPlans = [planData, ...(Array.isArray(plans) ? plans : [])];
      localStorage.setItem(key, JSON.stringify(updatedPlans));
      setSavedPlan(planData);
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.wrapper}>
        <button onClick={onBack} style={pageStyles.backButton}>
          ← Back to home
        </button>

        <div style={pageStyles.heroCard}>
          <span style={pageStyles.badge}>Plan Early</span>
          <h1 style={pageStyles.headline}>Create your early travel plan with confidence.</h1>
          <p style={pageStyles.heroText}>
            PlanEarly helps you lock in the best stays, preview recommended hotels, and save your travel preferences locally so you can revisit them anytime.
          </p>
          {user && onSavedPlans && (
            <button
              type="button"
              onClick={onSavedPlans}
              style={{
                borderRadius: "20px",
                border: "1px solid rgba(17, 24, 39, 0.12)",
                background: "white",
                color: "#111827",
                padding: "14px 22px",
                cursor: "pointer",
                fontWeight: 700,
                marginBottom: "18px",
              }}
            >
              View My Saved Plans
            </button>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <div style={{ minWidth: "230px", padding: "18px 20px", borderRadius: "24px", background: "#f7efe2", border: "1px solid rgba(201, 169, 110, 0.22)" }}>
              <div style={{ fontSize: "14px", color: "#475569", marginBottom: "6px" }}>Favorite trip style</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{purpose}</strong>
            </div>
            <div style={{ minWidth: "230px", padding: "18px 20px", borderRadius: "24px", background: "#fff9f1", border: "1px solid rgba(201, 169, 110, 0.22)" }}>
              <div style={{ fontSize: "14px", color: "#475569", marginBottom: "6px" }}>Budget range</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>₹{budget.toLocaleString()}</strong>
            </div>
            <div style={{ minWidth: "230px", padding: "18px 20px", borderRadius: "24px", background: "#eef4ff", border: "1px solid rgba(59, 130, 246, 0.18)" }}>
              <div style={{ fontSize: "14px", color: "#475569", marginBottom: "6px" }}>Saved plan</div>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{savedPlan ? "Yes" : "No"}</strong>
            </div>
          </div>
        </div>

        <div style={pageStyles.grid}>
          <form style={pageStyles.formCard} onSubmit={handleSubmit}>
            {success && (
              <div style={pageStyles.successBox}>
                <strong>🎉 Your early travel plan has been created!</strong>
                <p style={{ margin: "10px 0 0", color: "#475569" }}>
                  The plan is saved locally and ready to use whenever you return.
                </p>
              </div>
            )}

            <div style={pageStyles.fieldGroup}>
              <label htmlFor="destination" style={pageStyles.label}>Destination</label>
              <input
                id="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="e.g. Goa, Jaipur, Kerala"
                style={pageStyles.input}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "22px" }}>
              <div style={pageStyles.fieldGroup}>
                <label htmlFor="checkIn" style={pageStyles.label}>Check-in date</label>
                <input
                  id="checkIn"
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  style={pageStyles.input}
                />
              </div>
              <div style={pageStyles.fieldGroup}>
                <label htmlFor="checkOut" style={pageStyles.label}>Check-out date</label>
                <input
                  id="checkOut"
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  style={pageStyles.input}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "22px" }}>
              <div style={pageStyles.fieldGroup}>
                <label htmlFor="guests" style={pageStyles.label}>Number of guests</label>
                <select id="guests" value={guests} onChange={(event) => setGuests(event.target.value)} style={pageStyles.select}>
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5">5 guests</option>
                  <option value="6">6+ guests</option>
                </select>
              </div>
              <div style={pageStyles.fieldGroup}>
                <label htmlFor="purpose" style={pageStyles.label}>Travel purpose</label>
                <select id="purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)} style={pageStyles.select}>
                  {purposes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={pageStyles.fieldGroup}>
              <label htmlFor="budget" style={pageStyles.label}>Budget range</label>
              <div style={pageStyles.sliderRow}>
                <input
                  id="budget"
                  type="range"
                  min="2000"
                  max="150000"
                  step="1000"
                  value={budget}
                  onChange={(event) => setBudget(Number(event.target.value))}
                  style={pageStyles.slider}
                />
                <span style={{ minWidth: "100px", fontWeight: 700, color: "#111827" }}>₹{budget.toLocaleString()}</span>
              </div>
            </div>

            {error && <div style={pageStyles.errorText}>{error}</div>}

            <button type="submit" disabled={submitting} style={pageStyles.submitButton}>
              {submitting ? "Creating your plan..." : "Create Plan Early"}
            </button>
          </form>

          <aside style={pageStyles.asideCard}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#475569", marginBottom: "12px" }}>Suggested stays</div>
              {suggestedHotels.map((hotel) => (
                <div key={hotel.id} style={pageStyles.hotelCard}>
                  <img
                    src={`https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80`}
                    alt={hotel.name}
                    style={pageStyles.hotelImage}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontWeight: 800, color: "#111827" }}>{hotel.name}</div>
                      <div style={{ fontSize: "13px", color: "#64748b" }}>{hotel.destination}</div>
                    </div>
                    <span style={{ color: "#c9a96e", fontWeight: 700 }}>₹{hotel.price.toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#475569" }}>{hotel.tag} • {hotel.rating} ★</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#475569", marginBottom: "12px" }}>Recommended deals for early planning</div>
              <div style={{ display: "grid", gap: "14px" }}>
                {recommendedDeals.map((hotel) => (
                  <div key={hotel.id} style={{ padding: "18px", borderRadius: "22px", background: "#f8fafc", border: "1px solid rgba(15, 23, 42, 0.06)" }}>
                    <div style={{ fontWeight: 700, marginBottom: "8px", color: "#111827" }}>{hotel.name}</div>
                    <div style={{ fontSize: "13px", color: "#475569", marginBottom: "10px" }}>{hotel.destination}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#111827" }}>₹{hotel.price.toLocaleString()}</span>
                      <span style={{ fontSize: "12px", color: "#6b7280", background: "#f9fafb", padding: "6px 10px", borderRadius: "999px" }}>{hotel.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {savedPlan && (
              <div style={{ padding: "22px", borderRadius: "24px", background: "#f7f5f1", border: "1px solid rgba(201, 169, 110, 0.18)" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#475569", marginBottom: "10px" }}>Latest saved plan</div>
                <div style={{ fontSize: "15px", color: "#111827", lineHeight: 1.7 }}>
                  {savedPlan.destination} • {savedPlan.guests} guests • {savedPlan.purpose}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
