import React from "react";
import "./HotelPreviewModal.css";

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
  Gym: "💪",
  Parking: "🅿️",
};

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ letterSpacing: "-1px", fontSize: "14px", color: "#f5a623" }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      <span style={{ color: "#ddd", fontSize: "12px" }}>
        {"★".repeat(5 - full - (half ? 1 : 0))}
      </span>
    </span>
  );
}

export default React.memo(function HotelPreviewModal({ hotel, onClose, onProceed }) {

  return (
    <div className="hotel-preview-overlay" onClick={onClose}>
      <div 
        className="hotel-preview-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="close-btn" 
          onClick={() => {
            console.log("❌ Close button clicked");
            onClose();
          }}
          type="button"
        >
          ✕
        </button>

        {/* Hotel Image */}
        <div className="preview-img-container">
          <img 
            src={hotel.img || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80"} 
            alt={hotel.name} 
            className="preview-hotel-img" 
          />
        </div>

        {/* Hotel Details */}
        <div className="preview-details">
          <h2 className="preview-hotel-name">{hotel.name}</h2>

          {/* Location & Rating */}
          <div className="preview-info-row">
            <span className="preview-location">📍 {hotel.location}</span>
            <div className="preview-rating">
              <StarRating rating={hotel.rating || 4.5} />
              <span className="rating-text">
                {hotel.rating || 4.5} • {hotel.reviews || 0} reviews
              </span>
            </div>
          </div>

          {/* Type & Price */}
          <div className="preview-info-row">
            <span className="hotel-type">{hotel.type || "Hotel"}</span>
            <div className="preview-price">
              <span className="price-value">₹{hotel.price?.toLocaleString() || "N/A"}</span>
              <span className="price-unit">/night</span>
            </div>
          </div>

          {/* Description */}
          <div className="preview-description">
            <h3>About this property</h3>
            <p>
              {hotel.description || "Experience luxury and comfort at this wonderful property. Perfect for your next getaway!"}
            </p>
          </div>

          {/* Amenities */}
          {hotel.amenities && Array.isArray(hotel.amenities) && hotel.amenities.length > 0 && (
            <div className="preview-amenities">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="amenity-item">
                    <span className="amenity-icon">
                      {AMENITY_ICONS[amenity] || "✓"}
                    </span>
                    <span className="amenity-name">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="preview-actions">
            <button 
              type="button"
              className="btn-cancel" 
              onClick={() => {
                console.log("🔙 Back button clicked");
                onClose();
              }}
            >
              Back
            </button>
            <button 
              type="button"
              className="btn-proceed" 
              onClick={() => {
                console.log("✅ Proceed to Book clicked");
                onProceed();
              }}
            >
              Proceed to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
