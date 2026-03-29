import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); // Socket connection
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Sample hotel data for standalone demo ---
const demoHotel = {
  name: "The Leela Palace",
  location: "Udaipur, Rajasthan",
  price: 12500,
  rating: 4.9,
  reviews: 2430,
  tag: "Luxury",
  tagColor: "#d4a843",
  img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  amenities: ["Pool", "Spa", "WiFi", "Restaurant"],
  type: "Resort",
};

// --- Utility ---
function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ letterSpacing: "-1px", fontSize: "13px" }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      <span style={{ color: "#ddd", fontSize: "11px" }}>
        {"★".repeat(5 - full - (half ? 1 : 0))}
      </span>
    </span>
  );
}

const AMENITY_ICONS = {
  Pool: "🏊",
  Spa: "💆",
  WiFi: "📶",
  Restaurant: "🍽️",
  Bar: "🍸",
  Fireplace: "🔥",
  Trekking: "🥾",
  Dining: "🥗",
  "Beach Access": "🏖️",
  "Heritage Tour": "🏛️",
  Ayurveda: "🌿",
};

// --- Main Component ---
export default function BookNow({ hotel = demoHotel, onBack }) {
  const [step, setStep] = useState(1); // 1: form, 2: summary, 3: confirmed
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "1",
    rooms: "1",
    requests: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [bookedRooms, setBookedRooms] = useState(0);
const [totalRooms, setTotalRooms] = useState(10);

  const nights =
    form.checkin && form.checkout
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.checkout) - new Date(form.checkin)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;
  const subtotal = nights * hotel.price * parseInt(form.rooms || 1);
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  const [availableRooms, setAvailableRooms] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Valid email required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "10-digit phone required";
    if (!form.checkin) e.checkin = "Select check-in date";
    if (!form.checkout) e.checkout = "Select check-out date";
    if (form.checkin && form.checkout && form.checkout <= form.checkin)
      e.checkout = "Check-out must be after check-in";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(2);
  };

  const bookingId =
    "FMS" +
    Math.random().toString(36).toUpperCase().slice(2, 8);

  

/*const handleConfirm = async () => {
  setLoading(true);

  try {
    // Send booking to backend via API
    const res = await fetch("http://localhost:5000/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        hotelName: hotel.name,
        checkin: form.checkin,
        checkout: form.checkout,
        guests: form.guests,
        rooms: form.rooms,
        totalPrice: total,
      }),
    });

    const data = await res.json();
    console.log("Backend Response:", data);

    // Emit new booking via Socket
    socket.emit("newBooking", {
      bookingId: data.bookingId || bookingId,
      hotelName: hotel.name,
      user: form.name,
      total,
    });

    setStep(3);
  } catch (err) {
    console.error("Booking error:", err);
    alert("Booking failed. Check backend.");
  } finally {
    setLoading(false);
  }
};*/
const handleConfirm = async () => {
  if (availableRooms === null) {
  alert("Checking availability...");
  return;
}

  // ✅ ADD THIS BLOCK
  if (availableRooms === 0) {
    alert("❌ No rooms available");
    return;
  }


  if (parseInt(form.rooms) > availableRooms) {
    alert(`❌ Only ${availableRooms} rooms available`);
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        hotelName: hotel.name,
        checkin: form.checkin,
        checkout: form.checkout,
        guests: form.guests,
        rooms: form.rooms,
        totalPrice: total,
      }),
    });

    const data = await res.json();
   if (!res.ok) {
  alert(data.error || "Booking failed");
  setLoading(false);
  return;
}

    const finalBookingId = data.bookingId || bookingId;

socket.emit("newBooking", {
  bookingId: finalBookingId,

  
      hotelName: hotel.name,
      user: form.name,
      total,
    });

    setStep(3);
  } catch (err) {
    console.error("Booking error:", err);
    alert("Booking failed. Check backend.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (form.checkin && form.checkout) {
    fetch("http://localhost:5000/api/check-availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelName: hotel.name,
        checkin: form.checkin,
        checkout: form.checkout,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       setAvailableRooms(data.availableRooms);
setBookedRooms(data.bookedRooms);
setTotalRooms(data.totalRooms);
        })
.catch(() => {
  setAvailableRooms(0);
      });
  }
}, [form.checkin, form.checkout]);

useEffect(() => {
  // Confirm connection
  socket.on("connect", () => {
    console.log("Socket connected", socket.id);
  });

  socket.on("bookingConfirmed", (data) => {
  toast.success(
    `🎉 Booking confirmed for ${data.hotelName} | Guest: ${data.user} | Total: ₹${data.total}`
  );
});

  // Optional: listen for updates from other users
  socket.on("bookingUpdate", (data) => {
  toast.info(`🔔 New booking at ${data.hotelName}`);
});
  return () => {
    socket.off("connect");
    socket.off("bookingConfirmed");
    socket.off("bookingUpdate");
  };
}, []);
   

  
  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .bn-root {
          min-height: 100vh;
          background: #faf8f5;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
        }

        /* Topbar */
        .bn-topbar {
          background: rgba(20,20,20,0.97);
          backdrop-filter: blur(12px);
          height: 68px;
          display: flex;
          align-items: center;
          padding: 0 5%;
          gap: 20px;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .bn-back-btn {
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.25);
          color: white;
          border-radius: 8px;
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s;
        }
        .bn-back-btn:hover {
          border-color: #c9a96e;
          color: #c9a96e;
        }
        .bn-topbar-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin-left: 4px;
        }

        /* Progress Steps */
        .bn-steps {
          display: flex;
          align-items: center;
          gap: 0;
          margin-left: auto;
        }
        .bn-step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          transition: color 0.3s;
        }
        .bn-step.active { color: #c9a96e; }
        .bn-step.done { color: rgba(255,255,255,0.7); }
        .bn-step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          transition: all 0.3s;
        }
        .bn-step.active .bn-step-num {
          background: linear-gradient(135deg, #c9a96e, #a07840);
          border-color: #c9a96e;
          color: white;
        }
        .bn-step.done .bn-step-num {
          background: rgba(201,169,110,0.2);
          border-color: #c9a96e;
          color: #c9a96e;
        }
        .bn-step-sep {
          width: 28px;
          height: 1px;
          background: rgba(255,255,255,0.15);
          margin: 0 4px;
        }

        /* Layout */
        .bn-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 20px 80px;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .bn-body { grid-template-columns: 1fr; }
        }

        /* Hotel Card (sidebar) */
        .bn-hotel-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          border: 1px solid #f0ebe3;
          position: sticky;
          top: 88px;
        }
        .bn-hotel-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        .bn-hotel-info {
          padding: 20px;
        }
        .bn-hotel-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: white;
          margin-bottom: 10px;
        }
        .bn-hotel-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .bn-hotel-loc {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #888;
          margin-bottom: 12px;
        }
        .bn-hotel-rating {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 14px;
        }
        .bn-amenities {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .bn-amenity {
          background: #f5f2ee;
          border: 1px solid #e8e0d5;
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: #666;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .bn-divider {
          height: 1px;
          background: #f0ebe3;
          margin: 16px 0;
        }
        .bn-price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #888;
          margin-bottom: 8px;
        }
        .bn-price-row.total {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .bn-price-val {
          font-family: 'Playfair Display', serif;
          color: #1a1a1a;
          font-weight: 600;
        }
        .bn-nights-badge {
          background: linear-gradient(135deg, #c9a96e22, #a0784011);
          border: 1px solid #c9a96e44;
          border-radius: 8px;
          padding: 10px 14px;
          text-align: center;
          margin-bottom: 14px;
        }
        .bn-nights-badge .num {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #a07840;
          line-height: 1;
        }
        .bn-nights-badge .label {
          font-size: 11px;
          color: #a07840;
          font-weight: 600;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Form Panel */
        .bn-form-panel {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          border: 1px solid #f0ebe3;
          overflow: hidden;
        }
        .bn-form-header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          padding: 28px 32px;
        }
        .bn-form-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
        }
        .bn-form-header p {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-weight: 400;
        }
        .bn-form-body {
          padding: 32px;
        }
        .bn-section-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #aaa;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bn-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #f0ebe3;
        }
        .bn-field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .bn-field-grid.single { grid-template-columns: 1fr; }
        .bn-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .bn-label {
          font-size: 12px;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .bn-input {
          background: white;
          border: 1.5px solid #e8e0d5;
          border-radius: 10px;
          padding: 12px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1a1a;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          width: 100%;
        }
        .bn-input:focus {
          border-color: #c9a96e;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
        }
        .bn-input.error {
          border-color: #e05a5a;
          box-shadow: 0 0 0 3px rgba(224,90,90,0.1);
        }
        .bn-input::placeholder { color: #bbb; }
        .bn-error-msg {
          font-size: 11px;
          color: #e05a5a;
          margin-top: 2px;
        }
        textarea.bn-input {
          resize: vertical;
          min-height: 80px;
        }
        .bn-cta {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          margin-top: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.3px;
        }
        .bn-cta:hover {
          background: linear-gradient(135deg, #c9a96e 0%, #a07840 100%);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(160,120,64,0.3);
        }
        .bn-cta:active { transform: translateY(0); }
        .bn-cta.confirm {
          background: linear-gradient(135deg, #c9a96e 0%, #a07840 100%);
        }
        .bn-cta.confirm:hover {
          background: linear-gradient(135deg, #d4b47a 0%, #b08a50 100%);
        }
        .bn-cta:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Summary step */
        .bn-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 0;
          border-bottom: 1px solid #f5f0ea;
          font-size: 14px;
        }
        .bn-summary-row:last-child { border-bottom: none; }
        .bn-summary-key { color: #888; font-weight: 500; }
        .bn-summary-val { font-weight: 600; color: #1a1a1a; }
        .bn-edit-btn {
          background: transparent;
          border: 1.5px solid #e8e0d5;
          border-radius: 8px;
          padding: 7px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }
        .bn-edit-btn:hover { border-color: #c9a96e; color: #a07840; }

        /* Confirmed step */
        .bn-confirmed {
          padding: 60px 32px;
          text-align: center;
        }
        .bn-checkmark {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #c9a96e, #a07840);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 30px;
          animation: pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pop {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .bn-confirmed h2 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .bn-confirmed p {
          color: #888;
          font-size: 14px;
          line-height: 1.6;
          max-width: 380px;
          margin: 0 auto 28px;
        }
        .bn-booking-id {
          background: #f5f2ee;
          border: 1px solid #e8e0d5;
          border-radius: 12px;
          padding: 16px 24px;
          display: inline-block;
          margin-bottom: 32px;
        }
        .bn-booking-id .label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #aaa;
          margin-bottom: 4px;
        }
        .bn-booking-id .id {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #a07840;
          letter-spacing: 2px;
        }
        .bn-done-btn {
          background: #1a1a1a;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 14px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .bn-done-btn:hover { background: #c9a96e; }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        /* Trust badges */
        .bn-trust {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          justify-content: center;
        }
        .bn-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #aaa;
          font-weight: 500;
        }
      `}</style>

      <div className="bn-root">
        {/* TOPBAR */}
        <div className="bn-topbar">
          {onBack && (
            <button className="bn-back-btn" onClick={onBack}>
              ← Back
            </button>
          )}
          <span className="bn-topbar-title">FindMyStay</span>

          <div className="bn-steps">
            {[
              { num: 1, label: "Details" },
              { num: 2, label: "Review" },
              { num: 3, label: "Confirmed" },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div
                  className={`bn-step ${
                    step === s.num
                      ? "active"
                      : step > s.num
                      ? "done"
                      : ""
                  }`}
                >
                  <div className="bn-step-num">
                    {step > s.num ? "✓" : s.num}
                  </div>
                  {s.label}
                </div>
                {i < 2 && <div className="bn-step-sep" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="bn-body">
          {/* LEFT: Form / Summary / Confirmed */}
          <div>
            {step === 1 && (
              <div className="bn-form-panel">
                <div className="bn-form-header">
                  <h2>Guest Details</h2>
                  <p>Fill in your information to complete the reservation</p>
                </div>
                <div className="bn-form-body">
                  {/* Personal Info */}
                  <div className="bn-section-label">Personal Information</div>
                  <div className="bn-field-grid">
                    <div className="bn-field-group">
                      <label className="bn-label">Full Name</label>
                      <input
                        className={`bn-input${errors.name ? " error" : ""}`}
                        placeholder="e.g. Arjun Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                      {errors.name && (
                        <span className="bn-error-msg">{errors.name}</span>
                      )}
                    </div>
                    <div className="bn-field-group">
                      <label className="bn-label">Phone Number</label>
                      <input
                        className={`bn-input${errors.phone ? " error" : ""}`}
                        placeholder="10-digit mobile"
                        value={form.phone}
                        maxLength={10}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                      />
                      {errors.phone && (
                        <span className="bn-error-msg">{errors.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="bn-field-grid single" style={{ marginBottom: "28px" }}>
                    <div className="bn-field-group">
                      <label className="bn-label">Email Address</label>
                      <input
                        className={`bn-input${errors.email ? " error" : ""}`}
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <span className="bn-error-msg">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div className="bn-section-label">Stay Details</div>
                  <div className="bn-field-grid">
                    <div className="bn-field-group">
                      <label className="bn-label">Check-In Date</label>
                      <input
                        className={`bn-input${errors.checkin ? " error" : ""}`}
                        type="date"
                        min={today}
                        value={form.checkin}
                        onChange={(e) =>
                          setForm({ ...form, checkin: e.target.value })
                        }
                      />
                      {errors.checkin && (
                        <span className="bn-error-msg">{errors.checkin}</span>
                      )}
                    </div>
                    <div className="bn-field-group">
                      <label className="bn-label">Check-Out Date</label>
                      <input
                        className={`bn-input${errors.checkout ? " error" : ""}`}
                        type="date"
                        min={form.checkin || today}
                        value={form.checkout}
                        onChange={(e) =>
                          setForm({ ...form, checkout: e.target.value })
                        }
                      />
                      {errors.checkout && (
                        <span className="bn-error-msg">{errors.checkout}</span>
                      )}
                    </div>
                  </div>
                  <div className="bn-field-grid" style={{ marginBottom: "28px" }}>
                    <div className="bn-field-group">
                      <label className="bn-label">Guests</label>
                      <select
                        className="bn-input"
                        value={form.guests}
                        onChange={(e) =>
                          setForm({ ...form, guests: e.target.value })
                        }
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} Guest{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="bn-field-group">
                      <label className="bn-label">Rooms</label>
                      <select
                        className="bn-input"
                        value={form.rooms}
                        onChange={(e) =>
                          setForm({ ...form, rooms: e.target.value })
                        }
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} Room{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                       {/* ✅ ADD THIS BELOW SELECT */}
  {/* ✅ UPDATED AVAILABILITY UI */}
{availableRooms !== null && (
  <div style={{ marginTop: "6px", fontSize: "12px" }}>
    
    <p
      style={{
        color: availableRooms > 0 ? "green" : "red",
        fontWeight: "500"
      }}
    >
      {availableRooms > 0
        ? `✅ ${availableRooms} rooms available`
        : "❌ No rooms available"}
    </p>

    {/* ✅ NEW LINE */}
    <p style={{ color: "#555", fontSize: "11px" }}>
      🛏️ {bookedRooms} booked / {totalRooms} total
    </p>

  </div>
)}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="bn-section-label">Special Requests</div>
                  <div
                    className="bn-field-grid single"
                    style={{ marginBottom: "28px" }}
                  >
                    <div className="bn-field-group">
                      <label className="bn-label">
                        Requests &amp; Preferences{" "}
                        <span style={{ color: "#bbb", fontWeight: 400 }}>
                          (optional)
                        </span>
                      </label>
                      <textarea
                        className="bn-input"
                        placeholder="Early check-in, dietary requirements, room preferences..."
                        value={form.requests}
                        onChange={(e) =>
                          setForm({ ...form, requests: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <button className="bn-cta" onClick={handleNext}>
                    Review Booking →
                  </button>

                  <div className="bn-trust">
                    <div className="bn-trust-item">🔒 Secure payment</div>
                    <div className="bn-trust-item">✅ Free cancellation</div>
                    <div className="bn-trust-item">⚡ Instant confirmation</div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bn-form-panel">
                <div className="bn-form-header">
                  <h2>Review Your Booking</h2>
                  <p>Please confirm all details before proceeding</p>
                </div>
                <div className="bn-form-body">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div className="bn-section-label" style={{ margin: 0 }}>
                      Guest Information
                    </div>
                    <button className="bn-edit-btn" onClick={() => setStep(1)}>
                      ✏️ Edit
                    </button>
                  </div>
                  {[
                    { k: "Full Name", v: form.name },
                    { k: "Email", v: form.email },
                    { k: "Phone", v: form.phone },
                  ].map((r) => (
                    <div key={r.k} className="bn-summary-row">
                      <span className="bn-summary-key">{r.k}</span>
                      <span className="bn-summary-val">{r.v}</span>
                    </div>
                  ))}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "24px",
                      marginBottom: "8px",
                    }}
                  >
                    <div className="bn-section-label" style={{ margin: 0 }}>
                      Stay Details
                    </div>
                  </div>
                  {[
                    {
                      k: "Check-In",
                      v: new Date(form.checkin).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    },
                    {
                      k: "Check-Out",
                      v: new Date(form.checkout).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    },
                    { k: "Duration", v: `${nights} Night${nights !== 1 ? "s" : ""}` },
                    { k: "Guests", v: `${form.guests} Guest${form.guests > 1 ? "s" : ""}` },
                    { k: "Rooms", v: `${form.rooms} Room${form.rooms > 1 ? "s" : ""}` },
                  ].map((r) => (
                    <div key={r.k} className="bn-summary-row">
                      <span className="bn-summary-key">{r.k}</span>
                      <span className="bn-summary-val">{r.v}</span>
                    </div>
                  ))}

                  {form.requests && (
                    <>
                      <div
                        className="bn-section-label"
                        style={{ marginTop: "24px", marginBottom: "8px" }}
                      >
                        Special Requests
                      </div>
                      <div
                        style={{
                          background: "#faf8f5",
                          border: "1px solid #f0ebe3",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          fontSize: "13px",
                          color: "#555",
                          lineHeight: 1.6,
                          marginBottom: "8px",
                        }}
                      >
                        {form.requests}
                      </div>
                    </>
                  )}

                  <div
                    className="bn-section-label"
                    style={{ marginTop: "24px", marginBottom: "8px" }}
                  >
                    Price Breakdown
                  </div>
                  {[
                    {
                      k: `₹${hotel.price.toLocaleString()} × ${nights} night${nights !== 1 ? "s" : ""} × ${form.rooms} room${form.rooms > 1 ? "s" : ""}`,
                      v: `₹${subtotal.toLocaleString()}`,
                    },
                    { k: "GST & Taxes (18%)", v: `₹${taxes.toLocaleString()}` },
                  ].map((r) => (
                    <div key={r.k} className="bn-summary-row">
                      <span className="bn-summary-key">{r.k}</span>
                      <span className="bn-summary-val">{r.v}</span>
                    </div>
                  ))}
                  <div className="bn-summary-row" style={{ paddingTop: "16px" }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "16px",
                        fontWeight: 700,
                      }}
                    >
                      Total Amount
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#a07840",
                      }}
                    >
                      ₹{total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="bn-cta confirm"
                    onClick={handleConfirm}
                    disabled={loading}
                    style={{ marginTop: "24px" }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" /> Processing...
                      </>
                    ) : (
                      "✓ Confirm & Pay ₹" + total.toLocaleString()
                    )}
                  </button>

                  <div className="bn-trust" style={{ marginTop: "16px" }}>
                    <div className="bn-trust-item">🔒 256-bit SSL</div>
                    <div className="bn-trust-item">🛡️ PCI Compliant</div>
                    <div className="bn-trust-item">🔄 Free cancellation</div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bn-form-panel">
                <div className="bn-confirmed">
                  <div className="bn-checkmark">✓</div>
                  <h2>Booking Confirmed!</h2>
                  <p>
                    Your stay at <strong>{hotel.name}</strong> has been reserved.
                    A confirmation email has been sent to{" "}
                    <strong>{form.email}</strong>.
                  </p>
                  <div className="bn-booking-id">
                    <div className="label">Booking Reference</div>
                    <div className="id">{bookingId}</div>
                  </div>

                  <div
                    style={{
                      background: "#faf8f5",
                      border: "1px solid #f0ebe3",
                      borderRadius: "12px",
                      padding: "20px",
                      textAlign: "left",
                      marginBottom: "32px",
                    }}
                  >
                    {[
                      { k: "🏨 Property", v: hotel.name },
                      {
                        k: "📅 Check-In",
                        v: new Date(form.checkin).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      },
                      {
                        k: "📅 Check-Out",
                        v: new Date(form.checkout).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      },
                      { k: "👤 Guest", v: form.name },
                      {
                        k: "💰 Total Paid",
                        v: `₹${total.toLocaleString()}`,
                      },
                    ].map((r) => (
                      <div
                        key={r.k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "9px 0",
                          borderBottom: "1px solid #f0ebe3",
                          fontSize: "13px",
                        }}
                      >
                        <span style={{ color: "#888" }}>{r.k}</span>
                        <span style={{ fontWeight: 600 }}>{r.v}</span>
                      </div>
                    ))}
                  </div>

                  {onBack && (
                    <button className="bn-done-btn" onClick={onBack}>
                      ← Back to Hotels
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Hotel Sidebar */}
          <div className="bn-hotel-card">
            <img src={hotel.img} alt={hotel.name} className="bn-hotel-img" />
            <div className="bn-hotel-info">
              <div
                className="bn-hotel-tag"
                style={{ background: hotel.tagColor || "#1a1a1a" }}
              >
                {hotel.tag || hotel.type}
              </div>
              <div className="bn-hotel-name">{hotel.name}</div>
              <div className="bn-hotel-loc">
                <span>📍</span>
                {hotel.location}
              </div>
              <div className="bn-hotel-rating">
                <span style={{ color: "#f5a623" }}>
                  <StarRating rating={hotel.rating} />
                </span>
                <span style={{ fontWeight: 700, fontSize: "13px" }}>
                  {hotel.rating}
                </span>
                <span style={{ fontSize: "12px", color: "#aaa" }}>
                  ({hotel.reviews?.toLocaleString()} reviews)
                </span>
              </div>
              <div className="bn-amenities">
                {hotel.amenities?.map((a) => (
                  <span key={a} className="bn-amenity">
                    {AMENITY_ICONS[a] || "✦"} {a}
                  </span>
                ))}
              </div>

              <div className="bn-divider" />

              {nights > 0 ? (
                <>
                  <div className="bn-nights-badge">
                    <div className="num">{nights}</div>
                    <div className="label">
                      Night{nights !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="bn-price-row">
                    <span>
                      ₹{hotel.price.toLocaleString()} × {nights}N ×{" "}
                      {form.rooms}R
                    </span>
                    <span className="bn-price-val">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="bn-price-row">
                    <span>Taxes (18%)</span>
                    <span className="bn-price-val">
                      ₹{taxes.toLocaleString()}
                    </span>
                  </div>
                  <div className="bn-divider" />
                  <div className="bn-price-row total">
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "16px",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "22px",
                        color: "#a07840",
                      }}
                    >
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </>
              ) : (
                <div className="bn-price-row">
                  <span>Starting from</span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "20px",
                    }}
                  >
                    ₹{hotel.price.toLocaleString()}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      /night
                    </span>
                  </span>
                </div>
              )}
              <div style={{
  background: "#f5f2ee",
  padding: "8px",
  borderRadius: "8px",
  marginTop: "6px"
}}>
  <div style={{ color: "green", fontWeight: "600" }}>
    Available: {availableRooms}
  </div>
  <div style={{ fontSize: "11px", color: "#777" }}>
    Booked: {bookedRooms} / {totalRooms}
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}