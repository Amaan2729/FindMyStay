import { useState, useEffect, useRef } from "react";
import DestinationPage from "./DestinationPage";
import LoginPage from "./LoginPage";
import SignupPage from "./Signuppage";
import TripSquad from "./TripSquad";
import TravelBot from "./Travelbot";
import BookNow from "./BookNow";
import logo from "./assets/bd.png";


const destinations = [
  {
    name: "Goa",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80",
    hotels: 1240,
    desc: "Beaches, nightlife, and Portuguese heritage.",
  },
  {
    name: "Kerala",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80",
    hotels: 1100,
    desc: "Backwaters, Munnar tea gardens, Ayurveda.",
  },
  {
    name: "Agra",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80",
    hotels: 890,
    desc: "Home of the iconic Taj Mahal wonder.",
  },
  {
    name: "Jaipur",
    img: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=400&q=80",
    hotels: 970,
    desc: "The Pink City of forts and palaces.",
  },
  {
    name: "Udaipur",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
    hotels: 740,
    desc: "City of Lakes and royal heritage.",
  },
  {
    name: "Jaisalmer",
    img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&q=80",
    hotels: 420,
    desc: "Golden Fort and desert safari in the Thar.",
  },
  {
    name: "Varanasi",
   /* img: "https://images.unsplash.com/photo-1561361058-c24e02f9f2a5?w=400&q=80",*/
    img: "https://cdn.britannica.com/00/189800-050-FCC9D047/Ghats-Varanasi-Ganges-River-India-Uttar-Pradesh.jpg",
    hotels: 560,
    desc: "Ancient ghats and spiritual Ganga Aarti.",
  },
  {
    name: "Rishikesh",
    /*img: "https://images.unsplash.com/photo-1585136917228-5b8ec56de477?w=400&q=80",*/
    img: "https://images.unsplash.com/photo-1712510817140-917938f92e5b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmlzaGlrZXNofGVufDB8fDB8fHww",
    hotels: 480,
    desc: "Yoga capital and river rafting hub.",
  },
  {
    name: "Manali",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80",
    hotels: 860,
    desc: "Snowy mountains, Solang Valley adventures.",
  },
  {
    name: "Shimla",
    img: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=400&q=80",
    hotels: 530,
    desc: "Colonial charm and cool weather.",
  },
  {
    name: "Leh",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    hotels: 310,
    desc: "High-altitude monasteries and Pangong Lake.",
  },
  {
    name: "Srinagar",
    img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&q=80",
    hotels: 650,
    desc: "Dal Lake houseboats and Mughal gardens.",
  },
  {
    name: "Ooty",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
    hotels: 390,
    desc: "Queen of Hill Stations.",
  },
  {
    name: "Darjeeling",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80",
    hotels: 440,
    desc: "Tea estates and Kanchenjunga views.",
  },
  {
    name: "Mysore",
    /*img: "https://images.unsplash.com/photo-1600100397608-ce32d09a5a18?w=400&q=80",*/
    img: "https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlfGVufDB8fDB8fHww",
    hotels: 520,
    desc: "Grand Mysore Palace and Dussehra festival.",
  },
  {
    name: "Hampi",
    img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80",
    hotels: 280,
    desc: "Ancient Vijayanagara ruins (UNESCO site).",
  },
  {
    name: "Khajuraho",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
    hotels: 240,
    desc: "Famous temple architecture and sculptures.",
  },
  {
    name: "Amritsar",
    img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=400&q=80",
    hotels: 610,
    desc: "Golden Temple and Wagah Border.",
  },
  {
    name: "Mumbai",
    img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80",
    hotels: 2100,
    desc: "Gateway of India and Marine Drive.",
  },
  {
    name: "Delhi",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
    hotels: 2800,
    desc: "Red Fort, India Gate, street food.",
  },
  {
    name: "Andaman",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80",
    hotels: 370,
    desc: "Crystal-clear beaches and scuba diving.",
  },
  {
    name: "Coorg",
    img: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=400&q=80",
    hotels: 320,
    desc: "Coffee plantations and waterfalls.",
  },
  {
    name: "Mount Abu",
   /* img: "https://images.unsplash.com/photo-1553827230-c9b9d2e2ea15?w=400&q=80",*/
   img: "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1224/Majestic%20Kumbhalgarh%20fort.jpg",
    hotels: 290,
    desc: "Rajasthan's only hill station.",
  },
  {
    name: "Kaziranga",
    /*img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?w=400&q=80",*/
    img: "https://images.pexels.com/photos/20262429/pexels-photo-20262429.jpeg",
    hotels: 180,
    desc: "One-horned rhinoceros wildlife sanctuary.",
  },
  {
    name: "Kolkata",
    img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80",
    hotels: 1400,
    desc: "Cultural capital and Durga Puja celebrations.",
  },
];

const featuredHotels = [
  {
    name: "The Leela Palace",
    location: "Udaipur, Rajasthan",
    price: 12500,
    rating: 4.9,
    reviews: 2430,
    tag: "Luxury",
    tagColor: "#d4a843",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    amenities: ["Pool", "Spa", "WiFi", "Restaurant"],
  },
  {
    name: "Snow Peak Resort",
    location: "Manali, Himachal",
    price: 5800,
    rating: 4.7,
    reviews: 1860,
    tag: "Mountain View",
    tagColor: "#3d8b6e",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
    amenities: ["Fireplace", "Trekking", "WiFi", "Bar"],
  },
  {
    name: "Sunset Beachside Inn",
    location: "Goa, North",
    price: 4200,
    rating: 4.5,
    reviews: 3120,
    tag: "Beachfront",
    tagColor: "#e05a2b",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80",
    amenities: ["Beach Access", "Pool", "WiFi", "Dining"],
  },
  {
    name: "Heritage Haveli",
    location: "Jaipur, Rajasthan",
    price: 7900,
    rating: 4.8,
    reviews: 980,
    tag: "Heritage",
    tagColor: "#c94069",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80",
    amenities: ["Heritage Tour", "Pool", "WiFi", "Ayurveda"],
  },
];

const StarRating = ({ rating }) => {
  return (
    <span style={{ color: "#f5a623", fontSize: "13px", letterSpacing: "-1px" }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - Math.ceil(rating))}</span>
    </span>
  );
};

export default function FindMyStay() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [page, setPage] = useState("home"); // "home" | "login" | "signup"
  const [user, setUser] = useState(null);
  const destSectionRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleParallax = (e, cardEl, imgEl) => {
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardEl.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04)`;
    imgEl.style.transform = `scale(1.12) translateX(${x * 18}px) translateY(${y * 18}px)`;
    const shine = cardEl.querySelector(".dest-shine");
    if (shine)
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
  };

  const resetParallax = (cardEl, imgEl) => {
    cardEl.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)`;
    imgEl.style.transform = `scale(1) translateX(0px) translateY(0px)`;
  };

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    const match = destinations.find((d) => d.name.toLowerCase().includes(q));
    setSearchedQuery(searchQuery.trim());
    if (!q) {
      destSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      setNoResult(false);
      return;
    }
    if (match) {
      setNoResult(false);
      destSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setNoResult(true);
      destSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filters = [
    "All",
    "Hotels",
    "Resorts",
    "Motels",
    "Villas",
    "Homestays",
    "Hostels",
  ];

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("home");
  };
  const handleLogout = () => setUser(null);

  if (page === "login")
    return <LoginPage onNavigate={setPage} onLogin={handleLogin} />;
  if (page === "signup")
    return <SignupPage onNavigate={setPage} onLogin={handleLogin} />;
  if (page === "tripsquad") return <TripSquad onBack={() => setPage("home")} />;

 /* if (selectedDest) {
    return (
      <DestinationPage
        destination={selectedDest.name}
        destImg={selectedDest.img}
        onBack={() => {
          setSelectedDest(null);
          window.scrollTo(0, 0);
        }}
      />
    );
  }*/

    if (selectedHotel) {
  return (
    <BookNow
      hotel={selectedHotel}
      onBack={() => setSelectedHotel(null)}
    />
  );
}

if (selectedDest) {
  return (
    <DestinationPage
      destination={selectedDest.name}
      destImg={selectedDest.img}
      onBack={() => {
        setSelectedDest(null);
        window.scrollTo(0, 0);
      }}
      onBook={(hotel) => setSelectedHotel(hotel)}
    />
  );
}

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        background: "#faf8f5",
        minHeight: "100vh",
        color: "#1a1a1a",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1ede8; }
        ::-webkit-scrollbar-thumb { background: #c9a96e; border-radius: 3px; }
        
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { opacity: 1; }
        
        .hero-input {
          background: white;
          border: 1.5px solid #e8e0d5;
          border-radius: 10px;
          padding: 14px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #333;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .hero-input:focus { border-color: #c9a96e; box-shadow: 0 0 0 3px rgba(201,169,110,0.15); }
        
        .search-btn {
          background: linear-gradient(135deg, #c9a96e, #a07840);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 16px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
        }
        .search-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(160,120,64,0.35); }
        .search-btn:active { transform: translateY(0); }
        
        .dest-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.3s ease;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .dest-card:hover {
          box-shadow: 0 25px 60px rgba(0,0,0,0.3), 0 0 0 2px rgba(201,169,110,0.5);
        }

        .dest-card .dest-img {
          width: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.12s ease;
          will-change: transform;
        }

        .dest-card .dest-shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 3;
        }

        .dest-card:hover .dest-shine {
          opacity: 1;
        }

        .dest-card .dest-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(201,169,110,0.92);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 4;
        }
        .dest-card:hover .dest-badge {
          opacity: 1;
          transform: translateY(0);
        }

        .dest-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 55%);
          opacity: 0.85;
          transition: opacity 0.3s;
          z-index: 2;
        }
        .dest-card:hover .dest-overlay { opacity: 1; }
        
        .hotel-card {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .hotel-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.13); }
        .hotel-card:hover .hotel-img { transform: scale(1.05); }
        .hotel-img { transition: transform 0.5s ease; width: 100%; height: 220px; object-fit: cover; display: block; }
        
        .filter-chip {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 20px;
          border-radius: 100px;
          border: 1.5px solid #e0d8cc;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .filter-chip:hover { border-color: #c9a96e; color: #a07840; }
        .filter-chip.active { background: #1a1a1a; color: white; border-color: #1a1a1a; }
        
        .amenity-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 6px;
          background: #f5f2ee;
          color: #666;
        }
        
        .book-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          background: #1a1a1a;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
        }
        .book-btn:hover { background: #c9a96e; }
        
        .promo-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: white;
          border-radius: 100px;
          padding: 5px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        
        .wishlist-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
          backdrop-filter: blur(4px);
        }
        .wishlist-btn:hover { transform: scale(1.15); }
        
        .offer-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          border-radius: 20px;
          padding: 32px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .offer-card::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(201,169,110,0.12);
        }
        .offer-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -20px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: rgba(201,169,110,0.06);
        }
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeSlideUp 0.7s ease forwards; }
        .animate-in-2 { animation: fadeSlideUp 0.7s 0.15s ease both; }
        .animate-in-3 { animation: fadeSlideUp 0.7s 0.3s ease both; }
        
        @media (max-width: 768px) {
          .search-grid { grid-template-columns: 1fr !important; }
          .dest-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hotel-grid { grid-template-columns: 1fr !important; }
          .offer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(20,20,20,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s",
          padding: "0 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
     
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="FindMyStay"
            style={{ height: "50px", width: "auto" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Explore", "Deals", "About", "Blog"].map((l) => (
            <a key={l} className="nav-link">
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {user ? (
            <>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #c9a96e, #a07840)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Sans'",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "white",
                  }}
                >
                  {user.name[0].toUpperCase()}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Hi, {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "9px 22px",
                  borderRadius: "8px",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPage("login")}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "9px 22px",
                  borderRadius: "8px",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <button
                onClick={() => setPage("signup")}
                className="search-btn"
                style={{ padding: "9px 22px", fontSize: "13px" }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #0f0c08 0%, #1c1409 30%, #2a1e0e 60%, #1a1209 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px 5% 60px",
        }}
      >
        {/* Background texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=60')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.12) 0%, transparent 60%)",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 920,
            margin: "0 auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            className="animate-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(201,169,110,0.12)",
              border: "1px solid rgba(201,169,110,0.3)",
              borderRadius: "100px",
              padding: "7px 18px",
              marginBottom: "28px",
            }}
          >
            <span style={{ fontSize: "11px" }}>✦</span>
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "12px",
                fontWeight: 600,
                color: "#c9a96e",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Over 50,000 Stays Across India
            </span>
          </div>

          <h1
            className="animate-in-2"
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "clamp(40px, 7vw, 80px)",
              color: "white",
              lineHeight: 1.05,
              marginBottom: "20px",
              letterSpacing: "-2px",
            }}
          >
            Discover Your
            <br />
            <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
              Perfect Stay
            </span>
          </h1>

          <p
            className="animate-in-3"
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "17px",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 300,
              marginBottom: "48px",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 48px",
            }}
          >
            Hotels, resorts, motels & more — handpicked stays for every journey,
            every budget, every soul.
          </p>

          {/* Search Box */}
          <div
            style={{
              background: "rgba(255,255,255,0.97)",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="search-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                gap: "14px",
                alignItems: "end",
              }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#999",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  📍 Destination
                </label>
                <input
                  className="hero-input"
                  placeholder="Where do you want to stay?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#999",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  📅 Check In
                </label>
                <input
                  className="hero-input"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#999",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  📅 Check Out
                </label>
                <input
                  className="hero-input"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#999",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  👤 Guests
                </label>
                <select
                  className="hero-input"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[
                    "1 Adult",
                    "2 Adults",
                    "2 Adults, 1 Child",
                    "3 Adults",
                    "Family (4+)",
                  ].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <button
                className="search-btn"
                style={{ height: "51px" }}
                onClick={handleSearch}
              >
                Search Stays
              </button>
            </div>
          </div>

          {/* Quick tags */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "🏖 Beach Resorts",
              "🏔 Hill Stations",
              "🏰 Heritage Hotels",
              "🧘 Wellness Retreats",
              "🎭 City Hotels",
            ].map((tag) => (
              <button
                key={tag}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "7px 16px",
                  borderRadius: "100px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(201,169,110,0.2)";
                  e.target.style.borderColor = "rgba(201,169,110,0.5)";
                  e.target.style.color = "#c9a96e";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.08)";
                  e.target.style.borderColor = "rgba(255,255,255,0.15)";
                  e.target.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "2px",
              marginBottom: "8px",
            }}
          >
            SCROLL
          </div>
          <div
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
              margin: "0 auto",
            }}
          />
        </div>
      </div>

      {/* STATS BAR */}
      <div
        style={{
          background: "#1a1a1a",
          padding: "24px 5%",
          display: "flex",
          justifyContent: "center",
          gap: "80px",
          flexWrap: "wrap",
        }}
      >
        {[
          { num: "50K+", label: "Properties Listed" },
          { num: "2M+", label: "Happy Travelers" },
          { num: "500+", label: "Cities Covered" },
          { num: "24/7", label: "Customer Support" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Playfair Display'",
                fontWeight: 900,
                fontSize: "28px",
                color: "#c9a96e",
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.5px",
                marginTop: "4px",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* POPULAR DESTINATIONS */}
      <section ref={destSectionRef} style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  marginBottom: "10px",
                }}
              >
                Explore India
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  letterSpacing: "-1px",
                }}
              >
                {searchedQuery
                  ? `Results for "${searchedQuery}"`
                  : "Popular Destinations"}
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "14px",
                  color: "#888",
                  marginTop: "8px",
                }}
              >
                {noResult
                  ? ""
                  : `${searchedQuery ? destinations.filter((d) => d.name.toLowerCase().includes(searchedQuery.toLowerCase())).length : 25} destinations across India`}
              </p>
            </div>
            {searchedQuery && (
              <button
                onClick={() => {
                  setSearchedQuery("");
                  setSearchQuery("");
                  setNoResult(false);
                }}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#c9a96e",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✕ Clear Search
              </button>
            )}
          </div>

          {/* No Result Found */}
          {noResult ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔍</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: "28px",
                  marginBottom: "12px",
                  letterSpacing: "-0.5px",
                }}
              >
                No destination found for{" "}
                <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
                  "{searchedQuery}"
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "15px",
                  color: "#888",
                  marginBottom: "28px",
                  lineHeight: 1.6,
                }}
              >
                Try searching for Goa, Manali, Jaipur, Kerala, Mumbai or any of
                our 25 destinations.
              </p>
              <button
                onClick={() => {
                  setSearchedQuery("");
                  setSearchQuery("");
                  setNoResult(false);
                }}
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 30px",
                  borderRadius: "10px",
                  background: "#1a1a1a",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Show All Destinations
              </button>
            </div>
          ) : (
            (() => {
              const filtered = searchedQuery
                ? destinations.filter((d) =>
                    d.name.toLowerCase().includes(searchedQuery.toLowerCase()),
                  )
                : destinations;
              const large = filtered.slice(0, Math.min(2, filtered.length));
              const rest = filtered.slice(Math.min(2, filtered.length));
              return (
                <>
                  {/* Top 2 large featured */}
                  {large.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          large.length === 1 ? "1fr" : "1fr 1fr",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      {large.map((d) => (
                        <div
                          key={d.name}
                          className="dest-card"
                          onClick={() => {
                            setSelectedDest(d);
                            window.scrollTo(0, 0);
                          }}
                          onMouseMove={(e) =>
                            handleParallax(
                              e,
                              e.currentTarget,
                              e.currentTarget.querySelector(".dest-img"),
                            )
                          }
                          onMouseLeave={(e) =>
                            resetParallax(
                              e.currentTarget,
                              e.currentTarget.querySelector(".dest-img"),
                            )
                          }
                        >
                          <img
                            src={d.img}
                            alt={d.name}
                            className="dest-img"
                            style={{ height: "320px" }}
                          />
                          <div className="dest-overlay" />
                          <div className="dest-shine" />
                          <div className="dest-badge">✦ Featured</div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "22px",
                              left: "22px",
                              zIndex: 5,
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Playfair Display'",
                                fontWeight: 700,
                                fontSize: "26px",
                                color: "white",
                              }}
                            >
                              {d.name}
                            </div>
                            <div
                              style={{
                                fontFamily: "'DM Sans'",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.8)",
                                marginTop: "4px",
                                maxWidth: "280px",
                              }}
                            >
                              {d.desc}
                            </div>
                            <div
                              style={{
                                fontFamily: "'DM Sans'",
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.6)",
                                marginTop: "6px",
                              }}
                            >
                              {d.hotels.toLocaleString()} hotels
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Remaining grid */}
                  {rest.length > 0 && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "16px",
                      }}
                    >
                      {rest.map((d) => (
                        <div
                          key={d.name}
                          className="dest-card"
                          onClick={() => {
                            setSelectedDest(d);
                            window.scrollTo(0, 0);
                          }}
                          onMouseMove={(e) =>
                            handleParallax(
                              e,
                              e.currentTarget,
                              e.currentTarget.querySelector(".dest-img"),
                            )
                          }
                          onMouseLeave={(e) =>
                            resetParallax(
                              e.currentTarget,
                              e.currentTarget.querySelector(".dest-img"),
                            )
                          }
                        >
                          <img
                            src={d.img}
                            alt={d.name}
                            className="dest-img"
                            style={{ height: "200px" }}
                          />
                          <div className="dest-overlay" />
                          <div className="dest-shine" />
                          <div className="dest-badge">Explore</div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "14px",
                              left: "14px",
                              right: "14px",
                              zIndex: 5,
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Playfair Display'",
                                fontWeight: 700,
                                fontSize: "17px",
                                color: "white",
                              }}
                            >
                              {d.name}
                            </div>
                            <div
                              style={{
                                fontFamily: "'DM Sans'",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.75)",
                                marginTop: "3px",
                                lineHeight: 1.4,
                              }}
                            >
                              {d.desc}
                            </div>
                            <div
                              style={{
                                fontFamily: "'DM Sans'",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.55)",
                                marginTop: "4px",
                              }}
                            >
                              {d.hotels.toLocaleString()} hotels
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()
          )}
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section style={{ padding: "20px 5% 80px", background: "#faf8f5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "28px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  marginBottom: "10px",
                }}
              >
                Handpicked For You
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  letterSpacing: "-1px",
                }}
              >
                Featured Stays
              </h2>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-chip ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div
            className="hotel-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "22px",
            }}
          >
            {featuredHotels.map((h) => (
              <div key={h.name} className="hotel-card">
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={h.img} alt={h.name} className="hotel-img" />
                  <div className="promo-badge" style={{ color: h.tagColor }}>
                    {h.tag}
                  </div>
                  <button className="wishlist-btn">🤍</button>
                </div>
                <div style={{ padding: "18px" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display'",
                      fontWeight: 700,
                      fontSize: "17px",
                      marginBottom: "4px",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {h.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "12px",
                      color: "#888",
                      marginBottom: "10px",
                    }}
                  >
                    📍 {h.location}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <StarRating rating={h.rating} />
                    <span
                      style={{
                        fontFamily: "'DM Sans'",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      {h.rating}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "12px",
                        color: "#aaa",
                      }}
                    >
                      ({h.reviews.toLocaleString()})
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                      marginBottom: "16px",
                    }}
                  >
                    {h.amenities.map((a) => (
                      <span key={a} className="amenity-tag">
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
                          fontSize: "20px",
                        }}
                      >
                        ₹{h.price.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans'",
                          fontSize: "12px",
                          color: "#aaa",
                        }}
                      >
                        /night
                      </span>
                    </div>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section style={{ padding: "20px 5% 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "10px",
              }}
            >
              Save More
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display'",
                fontWeight: 900,
                fontSize: "clamp(28px, 4vw, 42px)",
                letterSpacing: "-1px",
              }}
            >
              Exclusive Deals
            </h2>
          </div>
          <div
            className="offer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            {[
              {
                emoji: "🌙",
                title: "Last Minute Deals",
                desc: "Unlock up to 40% off on tonight's stays. Limited rooms, lightning deals.",
                cta: "Grab Deal",
                accent: "#c9a96e",
                pct: "40% OFF",
              },
              {
                emoji: "📅",
                title: "Early Bird Offer",
                desc: "Book 30 days in advance and save big on premium properties.",
                cta: "Plan Early",
                accent: "#6ec9a9",
                pct: "25% OFF",
              },
              {
                emoji: "🏆",
                title: "Weekend Escapes",
                desc: "Special weekend packages curated for the perfect 2-night retreat.",
                cta: "Explore",
                accent: "#c96e8a",
                pct: "Packages",
              },
            ].map((o) => (
              <div key={o.title} className="offer-card">
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                    {o.emoji}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      background: o.accent,
                      color: "white",
                      fontFamily: "'DM Sans'",
                      fontWeight: 800,
                      fontSize: "11px",
                      letterSpacing: "1.5px",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      marginBottom: "14px",
                      textTransform: "uppercase",
                    }}
                  >
                    {o.pct}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display'",
                      fontWeight: 700,
                      fontSize: "20px",
                      color: "white",
                      marginBottom: "10px",
                    }}
                  >
                    {o.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {o.desc}
                  </p>
                  <button
                    style={{
                      fontFamily: "'DM Sans'",
                      fontWeight: 700,
                      fontSize: "13px",
                      padding: "10px 24px",
                      borderRadius: "8px",
                      background: o.accent,
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {o.cta} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIPSQUAD BANNER */}
      <section style={{ padding: "0 5% 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #0d0d1a 0%, #1a1025 50%, #0d1a0d 100%)",
              borderRadius: "28px",
              padding: "60px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {/* BG decorations */}
            <div
              style={{
                position: "absolute",
                top: "-40px",
                right: "10%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(201,169,110,0.06)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "5%",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(99,102,241,0.06)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "30%",
                right: "30%",
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.04)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", maxWidth: 560 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(201,169,110,0.12)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  borderRadius: "100px",
                  padding: "6px 16px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#c9a96e" }}>✦</span>
                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                  }}
                >
                  New Feature
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display'",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 4vw, 46px)",
                  color: "white",
                  marginBottom: "14px",
                  letterSpacing: "-1px",
                  lineHeight: 1.1,
                }}
              >
                Plan a Trip with
                <br />
                <span style={{ color: "#c9a96e", fontStyle: "italic" }}>
                  Your Squad ✈️
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  maxWidth: 440,
                }}
              >
                Set your total budget, split it across friends, pick your vibe —
                and let everyone plan together in a fun group chat. No more
                50-message WhatsApp chaos!
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginBottom: "32px",
                }}
              >
                {[
                  "💰 Budget Splitter",
                  "🗺️ AI Destination Picks",
                  "💬 Squad Live Chat",
                ].map((f) => (
                  <div
                    key={f}
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "7px 16px",
                      borderRadius: "100px",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPage("tripsquad")}
                style={{
                  fontFamily: "'DM Sans'",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "16px 36px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #c9a96e, #a07840)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(201,169,110,0.3)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 32px rgba(201,169,110,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(201,169,110,0.3)";
                }}
              >
                🤝 Start Planning with Squad
              </button>
            </div>

            {/* Right side visual */}
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                minWidth: "260px",
              }}
            >
              {[
                {
                  name: "Rohan",
                  avatar: "👦",
                  msg: "Goa or Manali? 🤔",
                  color: "#6c63ff",
                },
                {
                  name: "Priya",
                  avatar: "👧",
                  msg: "GOA!! Beach vibes 🏖️",
                  color: "#ff6584",
                },
                {
                  name: "You",
                  avatar: "😎",
                  msg: "Budget: ₹5000/head ✅",
                  color: "#c9a96e",
                },
                {
                  name: "Arjun",
                  avatar: "🧔",
                  msg: "I'm soooo in!! 🙌",
                  color: "#43aa8b",
                },
              ].map((m, i) => (
                <div
                  key={m.name}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                    flexDirection: m.name === "You" ? "row-reverse" : "row",
                    animation: `fadeSlideUp 0.5s ${i * 0.15}s both`,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: m.color + "33",
                      border: `2px solid ${m.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {m.avatar}
                  </div>
                  <div
                    style={{
                      background:
                        m.name === "You"
                          ? "rgba(201,169,110,0.15)"
                          : "rgba(255,255,255,0.07)",
                      borderRadius: "14px",
                      padding: "10px 14px",
                      maxWidth: 180,
                      borderBottomRightRadius:
                        m.name === "You" ? "4px" : "14px",
                      borderBottomLeftRadius: m.name !== "You" ? "4px" : "14px",
                      border:
                        m.name === "You"
                          ? "1px solid rgba(201,169,110,0.2)"
                          : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: m.color,
                        marginBottom: "3px",
                      }}
                    >
                      {m.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {m.msg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ background: "#f5f0ea", padding: "60px 5%" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display'",
              fontWeight: 900,
              fontSize: "clamp(24px, 3vw, 36px)",
              marginBottom: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            Why Travelers Choose findmyStay
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans'",
              fontSize: "15px",
              color: "#777",
              maxWidth: 500,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            We make every part of your stay — from discovery to checkout —
            seamless and special.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px",
            }}
          >
            {[
              {
                icon: "🔒",
                title: "Secure Booking",
                desc: "End-to-end encrypted payments. Your data is safe with us.",
              },
              {
                icon: "💰",
                title: "Best Price Guarantee",
                desc: "Found cheaper? We'll match it. No questions asked.",
              },
              {
                icon: "🏅",
                title: "Verified Properties",
                desc: "Every stay is reviewed, verified, and quality-assured.",
              },
              {
                icon: "🎧",
                title: "24/7 Support",
                desc: "Our team is always here — before, during, after your stay.",
              },
            ].map((t) => (
              <div key={t.title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>
                  {t.icon}
                </div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display'",
                    fontWeight: 700,
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  {t.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: "13px",
                    color: "#888",
                    lineHeight: 1.6,
                  }}
                >
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", padding: "60px 5% 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "40px",
              marginBottom: "40px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                <img
                  src={logo}
                  alt="FindMyStay"
                  style={{ height: "45px", width: "auto" }}
                />
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  maxWidth: 260,
                }}
              >
                Your trusted companion for finding the perfect stay across India
                and beyond.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                {["📘", "🐦", "📸", "▶️"].map((s) => (
                  <button
                    key={s}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Blog", "Contact"],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Cancellation",
                  "Safety",
                  "Accessibility",
                ],
              },
              {
                title: "Discover",
                links: [
                  "Hotels",
                  "Resorts",
                  "Motels",
                  "Villas",
                  "Hostels",
                  "Camping",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: "'DM Sans'",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.9)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {col.title}
                </h4>
                {col.links.map((l) => (
                  <div
                    key={l}
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              © 2025 findmyStay. All rights reserved.
            </span>
            <span
              style={{
                fontFamily: "'DM Sans'",
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Privacy Policy · Terms of Service · Cookie Policy
            </span>
          </div>
        </div>
      </footer>
      <TravelBot />
    </div>
  );
}