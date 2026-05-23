import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const deals = [
  {
    id: 1,
    name: "Taj Palace",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1551906993-f12799c0eaf8?w=900&q=80",
    price: 8000,
    discountPrice: 4800,
    rating: 4.6,
    discount: 40,
  },
  {
    id: 2,
    name: "Goa Beachview Resort",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1501117716987-c8e8c25c0060?w=900&q=80",
    price: 7200,
    discountPrice: 4399,
    rating: 4.8,
    discount: 39,
  },
  {
    id: 3,
    name: "Royal Udaipur House",
    location: "Udaipur",
    image: "https://images.unsplash.com/photo-1565285282545-991cca8339f0?w=900&q=80",
    price: 10900,
    discountPrice: 6499,
    rating: 4.9,
    discount: 41,
  },
  {
    id: 4,
    name: "Hillside Retreat",
    location: "Manali",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    price: 5200,
    discountPrice: 3299,
    rating: 4.5,
    discount: 37,
  },
  {
    id: 5,
    name: "Heritage Haveli",
    location: "Jaipur",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    price: 6400,
    discountPrice: 3999,
    rating: 4.4,
    discount: 37,
  },
  {
    id: 6,
    name: "Serene Kerala Backwater",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    price: 5900,
    discountPrice: 3599,
    rating: 4.7,
    discount: 39,
  },
];

const locations = ["All", ...Array.from(new Set(deals.map((deal) => deal.location)))];
const sortOptions = [
  { label: "Best Value", value: "default" },
  { label: "Price: Low to High", value: "low-high" },
  { label: "Price: High to Low", value: "high-low" },
  { label: "Rating", value: "rating" },
];

const pageStyles = {
  page: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    color: "#111827",
    background: "#faf8f5",
    minHeight: "100vh",
  },
  wrapper: {
    maxWidth: 1320,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "24px",
    alignItems: "start",
    marginBottom: "34px",
  },
  heroCard: {
    borderRadius: "32px",
    background: "rgba(255,255,255,0.96)",
    color: "#0f172a",
    padding: "42px 40px",
    boxShadow: "0 30px 90px rgba(15, 23, 42, 0.08)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(15, 23, 42, 0.06)",
  },
  heroGlow: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 62%)",
    top: "-80px",
    right: "-90px",
    pointerEvents: "none",
  },
  buttonPrimary: {
    background: "#c9a96e",
    color: "#0f172a",
    border: "none",
    borderRadius: "16px",
    padding: "16px 34px",
    cursor: "pointer",
    fontWeight: 800,
    letterSpacing: "0.01em",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    boxShadow: "0 16px 40px rgba(201, 169, 110, 0.2)",
  },
  filterCard: {
    background: "rgba(255,255,255,0.98)",
    borderRadius: "28px",
    padding: "28px",
    boxShadow: "0 26px 64px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
  },
  dealsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "24px",
  },
  dealCard: {
    borderRadius: "28px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
    position: "relative",
    border: "1px solid rgba(15, 23, 42, 0.06)",
  },
  dealImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  badge: {
    position: "absolute",
    top: "18px",
    left: "18px",
    background: "#c9a96e",
    color: "#0f172a",
    borderRadius: "999px",
    padding: "9px 16px",
    fontWeight: 800,
    fontSize: "12px",
    letterSpacing: "0.04em",
  },
  trendingRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px",
    marginTop: "24px",
  },
  trendingCard: {
    borderRadius: "24px",
    overflow: "hidden",
    background: "linear-gradient(180deg, #ffffff, #f8f8f4)",
    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
  },
};

function smallStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#efb20b", fontSize: "14px" }}>
      {"★".repeat(fullStars)}{halfStar ? "☆" : ""}
      <span style={{ color: "#8b96a9", marginLeft: "6px", fontSize: "13px" }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default function GrabDealPage({ onBack, onBook, onPlanEarly }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [rating, setRating] = useState(3);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(12000);
  const [wishlisted, setWishlisted] = useState([]);

  const filteredDeals = useMemo(() => {
    return deals
      .filter((deal) => {
        const matchesSearch = [deal.name, deal.location].some((value) =>
          value.toLowerCase().includes(search.toLowerCase())
        );
        const matchesLocation = location === "All" || deal.location === location;
        const matchesRating = deal.rating >= rating;
        const matchesPrice = deal.discountPrice <= priceRange;
        return matchesSearch && matchesLocation && matchesRating && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "low-high") return a.discountPrice - b.discountPrice;
        if (sortBy === "high-low") return b.discountPrice - a.discountPrice;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.discountPrice - b.discountPrice;
      });
  }, [search, location, rating, sortBy, priceRange]);

  const featuredDeal = deals[2];
  const trendingDeals = deals.filter((deal) => deal.rating >= 4.5).slice(0, 4);

  const handleBookNow = (hotel) => {
    toast.success(`Booking started for ${hotel.name}`);
    if (onBook) onBook(hotel);
  };

  const toggleWishlist = (id) => {
    setWishlisted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.wrapper}>
        <style>{`
          .grabdeal-hero-grid { grid-template-columns: 1.2fr 0.8fr; }
          .grabdeal-deals-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .grabdeal-trending-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .grabdeal-deal-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 26px 80px rgba(15, 23, 42, 0.14); }
          .grabdeal-wishlist-button:hover { transform: scale(1.05); }
          .grabdeal-input { width: 100%; border-radius: 16px; border: 1px solid #cbd5e1; padding: 14px 18px; font-size: 15px; background: white; }
          .grabdeal-select { width: 100%; border-radius: 16px; border: 1px solid #cbd5e1; padding: 14px 16px; font-size: 15px; background: white; }
          @media (max-width: 1024px) {
            .grabdeal-hero-grid { grid-template-columns: 1fr; }
            .grabdeal-deals-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grabdeal-trending-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 760px) {
            .grabdeal-deals-grid { grid-template-columns: 1fr; }
            .grabdeal-trending-grid { grid-template-columns: 1fr; }
            .grabdeal-hero-card, .grabdeal-filter-card { padding: 24px; }
            .grabdeal-hero-card { border-radius: 24px; }
            .grabdeal-filter-card { border-radius: 24px; }
          }
        `}</style>
        <button
          onClick={onBack}
          style={{
            marginBottom: "20px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(17, 24, 39, 0.12)",
            borderRadius: "999px",
            padding: "10px 18px",
            background: "white",
            color: "#111827",
            cursor: "pointer",
          }}
        >
          ← Back to home
        </button>

        <section className="grabdeal-hero-grid" style={pageStyles.hero}>
          <div className="grabdeal-hero-card" style={pageStyles.heroCard}>
            <div style={pageStyles.heroGlow} className="grabdeal-hero-glow" />
            <p style={{ textTransform: "uppercase", letterSpacing: "0.24em", fontSize: "13px", opacity: 0.76, marginBottom: "18px", color: "#4b5563" }}>
              Grab the Best Deals Today
            </p>
            <h1 style={{ fontSize: "clamp(38px, 4vw, 62px)", lineHeight: 1.02, marginBottom: "20px", fontWeight: 800 }}>
              Limited time offers on top hotels across India
            </h1>
            <p style={{ maxWidth: "560px", fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.87)", marginBottom: "32px" }}>
              Explore curated stays with instant discounts, premium amenities, and unforgettable experiences.
            </p>
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "22px", display: "grid", gap: "14px" }}>
              <input
                className="grabdeal-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search location or hotel"
                style={{
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  background: "#f8faf6",
                  color: "#0f172a",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <input
                  value={priceRange}
                  type="range"
                  min={2000}
                  max={12000}
                  step={100}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ minWidth: "120px", fontWeight: 700 }}>{`Up to ₹${priceRange}`}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <button style={pageStyles.buttonPrimary}>Search Deals</button>
                <button
                  type="button"
                  onClick={onPlanEarly}
                  style={{ ...pageStyles.buttonPrimary, background: "#111827", color: "white", boxShadow: "0 18px 48px rgba(17, 24, 39, 0.18)" }}
                >
                  Plan Early
                </button>
              </div>
            </div>
          </div>

          <div className="grabdeal-filter-card" style={pageStyles.filterCard}>
            <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em", color: "#475569", marginBottom: "18px" }}>
              Deal filters
            </p>
            <div style={{ display: "grid", gap: "18px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", color: "#334155", marginBottom: "8px" }}>Location</label>
                <select
                  className="grabdeal-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", color: "#334155", marginBottom: "8px" }}>Rating</label>
                <select
                  className="grabdeal-select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={3}>3+ stars</option>
                  <option value={4}>4+ stars</option>
                  <option value={4.5}>4.5+ stars</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", color: "#334155", marginBottom: "8px" }}>Sort by</label>
                <select
                  className="grabdeal-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7 }}>
                Refine by traveler rating, budget, and destination to find the offer that feels premium and personalized.
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "24px", marginBottom: "32px" }}>
          <div style={{ borderRadius: "28px", overflow: "hidden", position: "relative", background: "linear-gradient(180deg, #111827, #0f172a)" }}>
            <img src={featuredDeal.image} alt={featuredDeal.name} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.86))" }} />
            <div style={{ position: "absolute", left: "30px", bottom: "30px", right: "30px", color: "white" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", marginBottom: "14px", opacity: 0.85 }}>
                Featured limited offer
              </div>
              <h2 style={{ fontSize: "clamp(30px, 3vw, 44px)", marginBottom: "14px", lineHeight: 1.05 }}>
                {featuredDeal.name} — {featuredDeal.location}
              </h2>
              <p style={{ maxWidth: "520px", fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.78)", marginBottom: "18px" }}>
                Book before it’s gone and lock in a premium stay at a fraction of the price.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "18px", padding: "12px 18px", fontWeight: 700, letterSpacing: "0.02em" }}>
                  02d 12h 19m
                </div>
                <button
                  onClick={() => handleBookNow(featuredDeal)}
                  style={{ ...pageStyles.buttonPrimary, background: "#f97316" }}
                >
                  Book Before It’s Gone
                </button>
              </div>
            </div>
          </div>

          <div style={pageStyles.filterCard}>
            <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>Trending Deals</h3>
            <p style={{ marginTop: "10px", fontSize: "15px", color: "#64748b", lineHeight: 1.75 }}>
              Handpicked stays travelers love right now — curated for a premium travel feel.
            </p>
            <div className="grabdeal-trending-grid" style={pageStyles.trendingRow}>
              {trendingDeals.map((item) => (
                <div key={item.id} style={pageStyles.trendingCard}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div style={{ padding: "18px" }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "6px" }}>{item.name}</div>
                    <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>{item.location}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontWeight: 700, color: "#111827" }}>₹{item.discountPrice}</span>
                      <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: 700 }}>{item.rating} ★</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px", marginBottom: "18px", flexWrap: "wrap" }}>
            <div>
              <div style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.18em", color: "#475569", marginBottom: "8px" }}>
                Best deals for every traveler
              </div>
              <h2 style={{ fontSize: "clamp(32px, 3vw, 44px)", margin: 0, fontWeight: 800 }}>Available hotel offers</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button style={{ padding: "12px 22px", borderRadius: "999px", border: "1px solid rgba(15,23,42,0.08)", background: "white", color: "#0f172a", cursor: "pointer" }}>
                All deals
              </button>
              <button style={{ padding: "12px 22px", borderRadius: "999px", border: "1px solid rgba(15,23,42,0.08)", background: "#f8fafc", color: "#0f172a", cursor: "pointer" }}>
                Exclusive offers
              </button>
            </div>
          </div>
          <div className="grabdeal-deals-grid" style={pageStyles.dealsGrid}>
            {filteredDeals.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 0", color: "#64748b" }}>
                No deals match those filters. Try another destination or lower the price range.
              </div>
            ) : (
              filteredDeals.map((hotel) => {
                const isWishlisted = wishlisted.includes(hotel.id);
                return (
                  <div
                    key={hotel.id}
                    className="grabdeal-deal-card"
                    style={pageStyles.dealCard}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px) scale(1.008)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
                  >
                    <div style={{ position: "relative" }}>
                      <img src={hotel.image} alt={hotel.name} style={pageStyles.dealImage} />
                      <span className="grabdeal-badge" style={pageStyles.badge}>{hotel.discount}% OFF</span>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleWishlist(hotel.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "18px",
                          right: "18px",
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.95)",
                          border: "none",
                          cursor: "pointer",
                          display: "grid",
                          placeItems: "center",
                          boxShadow: "0 24px 56px rgba(15, 23, 42, 0.12)",
                        }}
                      >
                        <span style={{ color: isWishlisted ? "#e11d48" : "#475569", fontSize: "18px" }}>
                          {isWishlisted ? "♥" : "♡"}
                        </span>
                      </button>
                    </div>
                    <div style={{ padding: "22px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <div>
                          <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>{hotel.name}</div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>{hotel.location}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "15px", color: "#64748b", textDecoration: "line-through" }}>₹{hotel.price}</div>
                          <div style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>₹{hotel.discountPrice}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", color: "#475569" }}>
                        <span>{smallStars(hotel.rating)}</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{hotel.rating >= 4.7 ? "Top Pick" : "Popular"}</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(hotel)}
                        style={{
                          width: "100%",
                          padding: "14px 0",
                          borderRadius: "18px",
                          border: "none",
                          background: "#0f172a",
                          color: "white",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
      <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
}
