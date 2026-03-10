import { useState, useMemo } from "react";

const generateHotels = (destination) => {
  const types = ["Hotel", "Resort", "Motel", "Villa", "Homestay", "Hostel"];
  const amenitiesList = [
    "Pool",
    "Spa",
    "WiFi",
    "Restaurant",
    "Gym",
    "Bar",
    "Parking",
    "Beach Access",
    "Mountain View",
    "Fireplace",
    "Trekking",
    "Ayurveda",
    "Heritage Tour",
    "Room Service",
  ];
  const imgs = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&q=80",
    "https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&q=80",
  ];
  const prefixes = [
    "The",
    "Grand",
    "Royal",
    "Luxury",
    "Heritage",
    "Serene",
    "Golden",
    "Elite",
    "Paradise",
    "Bliss",
  ];
  const suffixes = [
    "Palace",
    "Inn",
    "Retreat",
    "Suites",
    "Lodge",
    "Haveli",
    "Residency",
    "Enclave",
    "Nest",
    "Abode",
  ];

  const seed = destination.charCodeAt(0);
  return Array.from({ length: 24 }, (_, i) => {
    const type = types[(seed + i) % types.length];
    const rating = (3.5 + ((seed * i * 7) % 15) / 10).toFixed(1);
    const price = 1200 + ((seed * (i + 1) * 137) % 18000);
    const reviews = 100 + ((seed * i * 53) % 3000);
    const amenCount = 3 + (i % 3);
    const amenities = amenitiesList
      .filter((_, ai) => (ai + i + seed) % 4 < amenCount)
      .slice(0, 4);
    return {
      id: i,
      name: `${prefixes[(seed + i * 3) % prefixes.length]} ${destination} ${suffixes[(seed + i) % suffixes.length]}`,
      type,
      rating: parseFloat(rating),
      reviews,
      price,
      img: imgs[i % imgs.length],
      amenities,
      location: `${destination}, India`,
    };
  });
};

const StarRating = ({ rating }) => (
  <span style={{ color: "#f5a623", fontSize: "13px" }}>
    {"★".repeat(Math.floor(rating))}
    {rating % 1 >= 0.5 ? "½" : ""}
    <span style={{ color: "#ddd" }}>{"★".repeat(5 - Math.ceil(rating))}</span>
  </span>
);

export default function DestinationPage({ destination, destImg, onBack }) {
  const allHotels = useMemo(() => generateHotels(destination), [destination]);

  const [typeFilter, setTypeFilter] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minPrice, setMinPrice] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);

  const types = [
    "All",
    "Hotel",
    "Resort",
    "Motel",
    "Villa",
    "Homestay",
    "Hostel",
  ];

  const filtered = useMemo(() => {
    let list = allHotels.filter((h) => {
      if (typeFilter !== "All" && h.type !== typeFilter) return false;
      if (h.rating < minRating) return false;
      if (h.price > maxPrice) return false;
      if (h.price < minPrice) return false;
      return true;
    });
    if (sortBy === "price_asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [allHotels, typeFilter, minRating, maxPrice, minPrice, sortBy]);

  const toggleWishlist = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        background: "#faf8f5",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        .dp-hotel-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(0,0,0,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .dp-hotel-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.13); }
        .dp-hotel-card:hover .dp-hotel-img { transform: scale(1.06); }
        .dp-hotel-img { width: 100%; height: 200px; object-fit: cover; display: block; transition: transform 0.4s ease; }

        .dp-type-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 8px 18px; border-radius: 100px;
          border: 1.5px solid #e0d8cc;
          background: white; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
        .dp-type-chip:hover { border-color: #c9a96e; color: #a07840; }
        .dp-type-chip.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }

        .dp-range-slider {
          -webkit-appearance: none;
          width: 100%; height: 4px;
          border-radius: 2px;
          background: linear-gradient(to right, #c9a96e 0%, #c9a96e var(--val), #e0d8cc var(--val), #e0d8cc 100%);
          outline: none; cursor: pointer;
        }
        .dp-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #c9a96e;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(201,169,110,0.4);
          cursor: pointer;
        }

        .dp-amenity { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; padding: 3px 9px; border-radius: 6px; background: #f5f2ee; color: #666; }
        .dp-book-btn { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 9px 20px; border-radius: 8px; border: none; background: #1a1a1a; color: white; cursor: pointer; transition: background 0.2s; }
        .dp-book-btn:hover { background: #c9a96e; }
        .dp-back-btn { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 22px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,0.4); background: transparent; color: white; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
        .dp-back-btn:hover { background: rgba(255,255,255,0.1); }

        .dp-sort-select { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; padding: 9px 16px; border-radius: 8px; border: 1.5px solid #e0d8cc; background: white; color: #333; cursor: pointer; outline: none; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
      `}</style>

      {/* HERO BANNER */}
      <div
        style={{ position: "relative", height: "320px", overflow: "hidden" }}
      >
        <img
          src={destImg}
          alt={destination}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Navbar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "20px 5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button className="dp-back-btn" onClick={onBack}>
            ← Back to Home
          </button>
          <img
            src="/src/assets/logo.jpeg"
            alt="FindMyStay"
            style={{ height: "50px", width: "auto" }}
          />
        </div>

        {/* Title */}
        <div style={{ position: "absolute", bottom: "36px", left: "5%" }}>
          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "8px",
            }}
          >
            Explore Stays In
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 58px)",
              color: "white",
              letterSpacing: "-1.5px",
              lineHeight: 1,
            }}
          >
            {destination}
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "14px",
              color: "rgba(255,255,255,0.75)",
              marginTop: "8px",
            }}
          >
            {filtered.length} stays available
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "40px 5%",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* ── SIDEBAR FILTERS ── */}
        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "28px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            position: "sticky",
            top: "20px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 700,
              fontSize: "20px",
              marginBottom: "24px",
              letterSpacing: "-0.5px",
            }}
          >
            Filters
          </h3>

          {/* Property Type */}
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: "12px",
              }}
            >
              Property Type
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "13px",
                    fontWeight: 500,
                    padding: "10px 14px",
                    borderRadius: "10px",
                    textAlign: "left",
                    border:
                      typeFilter === t
                        ? "1.5px solid #1a1a1a"
                        : "1.5px solid #f0ebe4",
                    background: typeFilter === t ? "#1a1a1a" : "white",
                    color: typeFilter === t ? "white" : "#444",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {t === "All"
                      ? "🏨 All Types"
                      : t === "Hotel"
                        ? "🏩 Hotel"
                        : t === "Resort"
                          ? "🌴 Resort"
                          : t === "Motel"
                            ? "🛣 Motel"
                            : t === "Villa"
                              ? "🏡 Villa"
                              : t === "Homestay"
                                ? "🏠 Homestay"
                                : "🎒 Hostel"}
                  </span>
                  <span style={{ fontSize: "11px", opacity: 0.6 }}>
                    {t === "All"
                      ? allHotels.length
                      : allHotels.filter((h) => h.type === t).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "#f0ebe4",
              marginBottom: "24px",
            }}
          />

          {/* Min Rating */}
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: "12px",
              }}
            >
              Minimum Rating
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[0, 3, 3.5, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "7px 13px",
                    borderRadius: "8px",
                    border:
                      minRating === r
                        ? "1.5px solid #c9a96e"
                        : "1.5px solid #f0ebe4",
                    background: minRating === r ? "#fff8ee" : "white",
                    color: minRating === r ? "#a07840" : "#666",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {r === 0 ? "Any" : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "#f0ebe4",
              marginBottom: "24px",
            }}
          />

          {/* Price Range */}
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#999",
                }}
              >
                Price Per Night
              </p>
              <span
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#c9a96e",
                }}
              >
                ₹{minPrice.toLocaleString()} – ₹{maxPrice.toLocaleString()}
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                color: "#aaa",
                marginBottom: "6px",
              }}
            >
              Min Price
            </p>
            <input
              type="range"
              min={0}
              max={19000}
              step={500}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="dp-range-slider"
              style={{ "--val": `${(minPrice / 19000) * 100}%` }}
            />
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "11px",
                color: "#aaa",
                margin: "10px 0 6px",
              }}
            >
              Max Price
            </p>
            <input
              type="range"
              min={1000}
              max={20000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="dp-range-slider"
              style={{ "--val": `${((maxPrice - 1000) / 19000) * 100}%` }}
            />
          </div>

          <div
            style={{
              height: "1px",
              background: "#f0ebe4",
              marginBottom: "24px",
            }}
          />

          {/* Reset */}
          <button
            onClick={() => {
              setTypeFilter("All");
              setMinRating(0);
              setMaxPrice(20000);
              setMinPrice(0);
              setSortBy("popular");
            }}
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "13px",
              fontWeight: 600,
              padding: "11px",
              borderRadius: "10px",
              border: "1.5px solid #f0ebe4",
              background: "white",
              color: "#888",
              cursor: "pointer",
              width: "100%",
              transition: "all 0.2s",
            }}
          >
            Reset All Filters
          </button>
        </div>

        {/* ── HOTEL LISTINGS ── */}
        <div>
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                {filtered.length} properties found
              </span>
              {typeFilter !== "All" && (
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "13px",
                    color: "#c9a96e",
                    marginLeft: "8px",
                  }}
                >
                  · {typeFilter}s only
                </span>
              )}
              {minRating > 0 && (
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "13px",
                    color: "#c9a96e",
                    marginLeft: "8px",
                  }}
                >
                  · {minRating}★ & above
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "13px",
                  color: "#888",
                }}
              >
                Sort by:
              </span>
              <select
                className="dp-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 700,
                  fontSize: "22px",
                  marginBottom: "8px",
                }}
              >
                No results found
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "14px",
                  color: "#888",
                }}
              >
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              {filtered.map((h, i) => (
                <div
                  key={h.id}
                  className="dp-hotel-card fade-up"
                  style={{ animationDelay: `${(i % 6) * 0.06}s` }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={h.img} alt={h.name} className="dp-hotel-img" />
                    <button
                      onClick={() => toggleWishlist(h.id)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.2s",
                        backdropFilter: "blur(4px)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      {wishlist.includes(h.id) ? "❤️" : "🤍"}
                    </button>
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(26,26,26,0.85)",
                        color: "white",
                        fontFamily: "'DM Sans'",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "6px",
                        letterSpacing: "0.5px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {h.type}
                    </div>
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display'",
                        fontWeight: 700,
                        fontSize: "15px",
                        marginBottom: "4px",
                        letterSpacing: "-0.2px",
                        lineHeight: 1.3,
                      }}
                    >
                      {h.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "8px",
                      }}
                    >
                      📍 {h.location}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "10px",
                      }}
                    >
                      <StarRating rating={h.rating} />
                      <span
                        style={{
                          fontFamily: "'DM Sans'",
                          fontWeight: 700,
                          fontSize: "12px",
                        }}
                      >
                        {h.rating}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans'",
                          fontSize: "11px",
                          color: "#bbb",
                        }}
                      >
                        ({h.reviews.toLocaleString()})
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexWrap: "wrap",
                        marginBottom: "14px",
                      }}
                    >
                      {h.amenities.map((a) => (
                        <span key={a} className="dp-amenity">
                          {a}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: "'Playfair Display'",
                            fontWeight: 700,
                            fontSize: "18px",
                          }}
                        >
                          ₹{h.price.toLocaleString()}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans'",
                            fontSize: "11px",
                            color: "#aaa",
                          }}
                        >
                          /night
                        </span>
                      </div>
                      <button className="dp-book-btn">Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
