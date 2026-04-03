import React from "react";
import StarRating from "./StarRating";

export default React.memo(function FeaturedHotelsSection({ featuredHotels, openBooking, filters, activeFilter, setActiveFilter }) {
  return (
    <section style={{ padding: "20px 5% 80px", background: "#faf8f5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: "10px" }}>
              Handpicked For You
            </p>
            <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-1px" }}>
              Featured Stays
            </h2>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button key={f} className={`filter-chip ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="hotel-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "22px" }}>
          {featuredHotels.map((h) => (
            <div key={h.name} className="hotel-card">
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={h.img} alt={h.name} className="hotel-img" />
                <div className="promo-badge" style={{ color: h.tagColor }}>{h.tag}</div>
                <button className="wishlist-btn">🤍</button>
              </div>
              <div style={{ padding: "18px" }}>
                <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "17px", marginBottom: "4px", letterSpacing: "-0.3px" }}>{h.name}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "#888", marginBottom: "10px" }}>📍 {h.location}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <StarRating rating={h.rating} />
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: "13px" }}>{h.rating}</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "#aaa" }}>({h.reviews.toLocaleString()})</span>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {h.amenities.map((a) => (
                    <span key={a} className="amenity-tag">{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "20px" }}>₹{h.price.toLocaleString()}</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "#aaa" }}>/night</span>
                  </div>
                  <button 
                    type="button"
                    className="book-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("✅ Book Now clicked for:", h.name);
                      openBooking(h);
                    }}
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "none",
                      background: "#c9a96e",
                      color: "white",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#b8954c"}
                    onMouseLeave={(e) => e.target.style.background = "#c9a96e"}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
