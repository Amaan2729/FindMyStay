import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DestinationPage from "./DestinationPage";
import LoginPage from "./LoginPage";
import SignupPage from "./Signuppage";
import TripSquad from "./TripSquad";
import TravelBot from "./Travelbot";
import BookNow from "./BookNow";
import logo from "./assets/bd.png";
import AboutPage from "./pages/About";
import GlobalStyle from "./components/GlobalStyle";
import NavBar from "./components/NavBar";
import HeroSearch from "./components/HeroSearch";
import DestinationSection from "./components/DestinationSection";
import FeaturedHotelsSection from "./components/FeaturedHotelsSection";
import OffersSection from "./components/OffersSection";
import SquadSection from "./components/SquadSection";
import WhyChooseSection from "./components/WhyChooseSection";
import SiteFooter from "./components/SiteFooter";

const destinations = [
  { name: "Goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80", hotels: 1240, desc: "Beaches, nightlife, and Portuguese heritage." },
  { name: "Kerala", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", hotels: 1100, desc: "Backwaters, Munnar tea gardens, Ayurveda." },
  { name: "Agra", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80", hotels: 890, desc: "Home of the iconic Taj Mahal wonder." },
  { name: "Jaipur", img: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=400&q=80", hotels: 970, desc: "The Pink City of forts and palaces." },
  { name: "Udaipur", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", hotels: 740, desc: "City of Lakes and royal heritage." },
  { name: "Jaisalmer", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&q=80", hotels: 420, desc: "Golden Fort and desert safari in the Thar." },
  { name: "Varanasi", img: "https://cdn.britannica.com/00/189800-050-FCC9D047/Ghats-Varanasi-Ganges-River-India-Uttar-Pradesh.jpg", hotels: 560, desc: "Ancient ghats and spiritual Ganga Aarti." },
  { name: "Rishikesh", img: "https://images.unsplash.com/photo-1712510817140-917938f92e5b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmlzaGlrZXNofGVufDB8fDB8fHww", hotels: 480, desc: "Yoga capital and river rafting hub." },
  { name: "Manali", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80", hotels: 860, desc: "Snowy mountains, Solang Valley adventures." },
  { name: "Shimla", img: "https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=400&q=80", hotels: 530, desc: "Colonial charm and cool weather." },
  { name: "Leh", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", hotels: 310, desc: "High-altitude monasteries and Pangong Lake." },
  { name: "Srinagar", img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&q=80", hotels: 650, desc: "Dal Lake houseboats and Mughal gardens." },
  { name: "Ooty", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80", hotels: 390, desc: "Queen of Hill Stations." },
  { name: "Darjeeling", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80", hotels: 440, desc: "Tea estates and Kanchenjunga views." },
  { name: "Mysore", img: "https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlfGVufDB8fDB8fHww", hotels: 520, desc: "Grand Mysore Palace and Dussehra festival." },
  { name: "Hampi", img: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80", hotels: 280, desc: "Ancient Vijayanagara ruins (UNESCO site)." },
  { name: "Khajuraho", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80", hotels: 240, desc: "Famous temple architecture and sculptures." },
  { name: "Amritsar", img: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=400&q=80", hotels: 610, desc: "Golden Temple and Wagah Border." },
  { name: "Mumbai", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80", hotels: 2100, desc: "Gateway of India and Marine Drive." },
  { name: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80", hotels: 2800, desc: "Red Fort, India Gate, street food." },
  { name: "Andaman", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80", hotels: 370, desc: "Crystal-clear beaches and scuba diving." },
  { name: "Coorg", img: "https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=400&q=80", hotels: 320, desc: "Coffee plantations and waterfalls." },
  { name: "Mount Abu", img: "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1224/Majestic%20Kumbhalgarh%20fort.jpg", hotels: 290, desc: "Rajasthan's only hill station." },
  { name: "Kaziranga", img: "https://images.pexels.com/photos/20262429/pexels-photo-20262429.jpeg", hotels: 180, desc: "One-horned rhinoceros wildlife sanctuary." },
  { name: "Kolkata", img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80", hotels: 1400, desc: "Cultural capital and Durga Puja celebrations." },
];

const featuredHotels = [
  { name: "The Leela Palace", location: "Udaipur, Rajasthan", price: 12500, rating: 4.9, reviews: 2430, tag: "Luxury", tagColor: "#d4a843", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80", amenities: ["Pool", "Spa", "WiFi", "Restaurant"] },
  { name: "Snow Peak Resort", location: "Manali, Himachal", price: 5800, rating: 4.7, reviews: 1860, tag: "Mountain View", tagColor: "#3d8b6e", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80", amenities: ["Fireplace", "Trekking", "WiFi", "Bar"] },
  { name: "Sunset Beachside Inn", location: "Goa, North", price: 4200, rating: 4.5, reviews: 3120, tag: "Beachfront", tagColor: "#e05a2b", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80", amenities: ["Beach Access", "Pool", "WiFi", "Dining"] },
  { name: "Heritage Haveli", location: "Jaipur, Rajasthan", price: 7900, rating: 4.8, reviews: 980, tag: "Heritage", tagColor: "#c94069", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&q=80", amenities: ["Heritage Tour", "Pool", "WiFi", "Ayurveda"] },
];

export default function FindMyStay() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [guests, setGuests] = useState("2 Adults");
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const destSectionRef = useRef(null);

  useEffect(() => {
    const path = window.location.pathname.replace("/", "");
    if (
      path === "login" ||
      path === "signup" ||
      path === "tripsquad" ||
      path === "about" ||
      path === "book"
    ) {
      setPage(path);
    } else {
      setPage("home");
    }
  }, []);

  useEffect(() => {
    const path = page === "home" ? "/" : `/${page}`;
    if (window.location.pathname !== path) {
      window.history.replaceState(null, "", path);
    }
  }, [page]);

  const openBooking = (hotel) => {
    setSelectedHotel(hotel);
    setPage("book");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleParallax = (e, cardEl, imgEl) => {
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardEl.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${ -y * 14}deg) scale(1.04)`;
    imgEl.style.transform = `scale(1.12) translateX(${x * 18}px) translateY(${y * 18}px)`;
    const shine = cardEl.querySelector(".dest-shine");
    if (shine) shine.style.background = `radial-gradient(circle at ${ (x + 0.5) * 100}% ${ (y + 0.5) * 100}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
  };

  const resetParallax = (cardEl, imgEl) => {
    cardEl.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    imgEl.style.transform = "scale(1) translateX(0px) translateY(0px)";
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

  const filters = ["All", "Hotels", "Resorts", "Motels", "Villas", "Homestays", "Hostels"];
  const handleLogin = (userData) => { setUser(userData); setPage("home"); };
  const handleLogout = () => setUser(null);

  if (page === "login") return <LoginPage onNavigate={setPage} onLogin={handleLogin} />;
  if (page === "signup") return <SignupPage onNavigate={setPage} onLogin={handleLogin} />;
  if (page === "tripsquad") return <TripSquad onBack={() => setPage("home")} />;
  if (page === "about") return <AboutPage onNavigate={setPage} user={user} onLogout={handleLogout} />;
  if (page === "book" || selectedHotel) {
    return (
      <BookNow
        hotel={selectedHotel}
        onBack={() => {
          setSelectedHotel(null);
          setPage("home");
        }}
      />
    );
  }
  if (selectedDest)
    return (
      <DestinationPage
        destination={selectedDest.name}
        destImg={selectedDest.img}
        onBack={() => {
          setSelectedDest(null);
          window.scrollTo(0, 0);
        }}
        onBook={(hotel) => openBooking(hotel)}
      />
    );

  return (
    <Router>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: "#faf8f5", minHeight: "100vh", color: "#1a1a1a" }}>
        <GlobalStyle />
      <NavBar scrolled={scrolled} logo={logo} user={user} setPage={setPage} handleLogout={handleLogout} />
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f0c08 0%, #1c1409 30%, #2a1e0e 60%, #1a1209 100%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 5% 60px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.12) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 920, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div className="animate-in" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "100px", padding: "7px 18px", marginBottom: "28px" }}>
            <span style={{ fontSize: "11px" }}>✦</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 600, color: "#c9a96e", letterSpacing: "1.5px", textTransform: "uppercase" }}>Over 50,000 Stays Across India</span>
          </div>
          <h1 className="animate-in-2" style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(40px, 7vw, 80px)", color: "white", lineHeight: 1.05, marginBottom: "20px", letterSpacing: "-2px" }}>
            Discover Your<br /><span style={{ color: "#c9a96e", fontStyle: "italic" }}>Perfect Stay</span>
          </h1>
          <p className="animate-in-3" style={{ fontFamily: "'DM Sans'", fontSize: "17px", color: "rgba(255,255,255,0.6)", fontWeight: 300, marginBottom: "48px", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px" }}>
            Hotels, resorts, motels & more — handpicked stays for every journey, every budget, every soul.
          </p>
          <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} checkIn={checkIn} setCheckIn={setCheckIn} checkOut={checkOut} setCheckOut={setCheckOut} guests={guests} setGuests={setGuests} handleSearch={handleSearch} />
        </div>
        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px", marginBottom: "8px" }}>SCROLL</div>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)", margin: "0 auto" }} />
        </div>
      </div>

      <div style={{ background: "#1a1a1a", padding: "24px 5%", display: "flex", justifyContent: "center", gap: "80px", flexWrap: "wrap" }}>
        {[{ num: "50K+", label: "Properties Listed" }, { num: "2M+", label: "Happy Travelers" }, { num: "500+", label: "Cities Covered" }, { num: "24/7", label: "Customer Support" }].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "28px", color: "#c9a96e" }}>{s.num}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <DestinationSection destSectionRef={destSectionRef} destinations={destinations} searchedQuery={searchedQuery} noResult={noResult} setNoResult={setNoResult} setSearchedQuery={setSearchedQuery} setSearchQuery={setSearchQuery} setSelectedDest={setSelectedDest} handleParallax={handleParallax} resetParallax={resetParallax} />
      <FeaturedHotelsSection featuredHotels={featuredHotels} openBooking={openBooking} filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <OffersSection />
      <SquadSection setPage={setPage} />
      <WhyChooseSection />
      <SiteFooter logo={logo} />
      <TravelBot />
      </div>
    </Router>
  );
}
