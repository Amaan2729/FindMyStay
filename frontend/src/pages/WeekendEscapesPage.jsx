import React, { useState } from "react";

export default function WeekendEscapesPage({ onBack, onPackageBook }) {
  const packages = [
    {
      id: "coastal-bliss",
      title: "Coastal Bliss Retreat",
      location: "Goa, India",
      nights: "2 nights",
      price: "₹7,999",
      priceNumber: 7999,
      rating: 4.8,
      reviews: 410,
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      features: ["Beachfront stay", "Sunset dinner", "Private cabana"],
    },
    {
      id: "heritage-palace",
      title: "Heritage Palace Escape",
      location: "Jaipur, India",
      nights: "2 nights",
      price: "₹8,499",
      priceNumber: 8499,
      rating: 4.9,
      reviews: 520,
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
      features: ["Royal suite", "Heritage walking tour", "Traditional breakfast"],
    },
    {
      id: "mountain-view",
      title: "Mountain View Hideaway",
      location: "Manali, India",
      nights: "2 nights",
      price: "₹6,499",
      priceNumber: 6499,
      rating: 4.7,
      reviews: 380,
      img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
      features: ["Valley view room", "Bonfire evening", "Guided trek"],
    },
    {
      id: "riverside-retreat",
      title: "Riverside Retreat",
      location: "Rishikesh, India",
      nights: "2 nights",
      price: "₹7,199",
      priceNumber: 7199,
      rating: 4.7,
      reviews: 290,
      img: "https://images.unsplash.com/photo-1518331647610-7e76c8c8c6bd?w=800&q=80",
      features: ["Riverfront yoga", "Evening meditation", "Adventure rafting"],
    },
    {
      id: "lakefront-getaway",
      title: "Lakefront Getaway",
      location: "Udaipur, India",
      nights: "2 nights",
      price: "₹8,199",
      priceNumber: 8199,
      rating: 4.8,
      reviews: 330,
      img: "https://images.unsplash.com/photo-1500336624523-d727130c3328?w=800&q=80",
      features: ["Boat cruise", "Heritage walk", "Poolside dinner"],
    },
    {
      id: "backwaters-charm",
      title: "Backwaters Charm",
      location: "Kerala, India",
      nights: "2 nights",
      price: "₹9,299",
      priceNumber: 9299,
      rating: 4.9,
      reviews: 410,
      img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      features: ["Houseboat stay", "Spice village tour", "Ayurvedic spa"],
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState("All");
  const locations = ["All", ...Array.from(new Set(packages.map((pkg) => pkg.location)))];
  const filteredPackages =
    selectedLocation === "All"
      ? packages
      : packages.filter((pkg) => pkg.location === selectedLocation);

  return (
    <section style={{ minHeight: "100vh", background: "#f8faf7", color: "#111827", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 24px 80px" }}>
        <button
          type="button"
          onClick={onBack}
          style={{ marginBottom: "28px", padding: "10px 18px", borderRadius: "999px", border: "1px solid rgba(17, 24, 39, 0.12)", background: "white", color: "#111827", cursor: "pointer", fontWeight: 700 }}
        >
          ← Back to Home
        </button>

        <div style={{ display: "grid", gap: "26px", marginBottom: "40px" }}>
          <div>
            <span style={{ display: "inline-block", textTransform: "uppercase", letterSpacing: "1.6px", fontSize: "12px", fontWeight: 800, color: "#c96e8a", background: "rgba(201, 110, 138, 0.1)", padding: "8px 14px", borderRadius: "999px", marginBottom: "14px" }}>
              Packages
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, margin: "16px 0 18px", lineHeight: 1.03 }}>
              Weekend Escapes
            </h1>
            <p style={{ maxWidth: 760, fontSize: "16px", lineHeight: 1.8, color: "#475569" }}>
              Discover curated 2-night packages for the perfect short escape. Select a location to see the matching weekend package deals.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            {locations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => setSelectedLocation(location)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: selectedLocation === location ? "2px solid #c96e8a" : "1px solid rgba(17, 24, 39, 0.12)",
                  background: selectedLocation === location ? "#c96e8a" : "white",
                  color: selectedLocation === location ? "white" : "#111827",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                {location}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} style={{ background: "white", borderRadius: "30px", boxShadow: "0 24px 80px rgba(15, 23, 42, 0.08)", border: "1px solid rgba(15,23,42,0.06)", padding: "28px" }}>
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "22px", marginBottom: "18px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                  <div>
                    <div style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1.5px", color: "#6c7280", marginBottom: "6px" }}>
                      {pkg.location}
                    </div>
                    <h2 style={{ fontSize: "22px", margin: 0, color: "#111827" }}>{pkg.title}</h2>
                  </div>
                  <div style={{ color: "#c96e8a", fontWeight: 800, fontSize: "20px" }}>{pkg.price}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <span style={{ fontSize: "14px", color: "#475569" }}>{pkg.nights}</span>
                  <span style={{ fontSize: "14px", color: "#475569" }}>{pkg.rating} ★</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "18px", color: "#475569", lineHeight: 1.8 }}>
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onPackageBook?.(pkg)}
                  style={{ marginTop: "22px", width: "100%", background: "#c96e8a", color: "white", border: "none", borderRadius: "14px", padding: "12px 18px", cursor: "pointer", fontWeight: 700 }}
                >
                  Book this package
                </button>
              </div>
            ))}
            {filteredPackages.length === 0 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 20px", background: "white", borderRadius: "24px", boxShadow: "0 20px 56px rgba(15, 23, 42, 0.08)", border: "1px solid rgba(15,23,42,0.06)" }}>
                <h3 style={{ marginBottom: "12px", color: "#111827" }}>No packages found</h3>
                <p style={{ color: "#64748b" }}>Try choosing a different location or reset to All packages.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
