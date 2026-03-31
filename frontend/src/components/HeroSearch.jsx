export default function HeroSearch({ searchQuery, setSearchQuery, checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests, handleSearch }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: "20px", padding: "24px", boxShadow: "0 30px 80px rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}>
      <div className="search-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: "14px", alignItems: "end" }}>
        <div>
          <label style={{ fontFamily: "'DM Sans'", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "8px" }}>
            📍 Destination
          </label>
          <input className="hero-input" placeholder="Where do you want to stay?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
        </div>
        <div>
          <label style={{ fontFamily: "'DM Sans'", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "8px" }}>
            📅 Check In
          </label>
          <input className="hero-input" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: "'DM Sans'", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "8px" }}>
            📅 Check Out
          </label>
          <input className="hero-input" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>
        <div>
          <label style={{ fontFamily: "'DM Sans'", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#999", display: "block", marginBottom: "8px" }}>
            👤 Guests
          </label>
          <select className="hero-input" value={guests} onChange={(e) => setGuests(e.target.value)}>
            {["1 Adult", "2 Adults", "2 Adults, 1 Child", "3 Adults", "Family (4+)"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <button className="search-btn" style={{ height: "51px" }} onClick={handleSearch}>
          Search Stays
        </button>
      </div>
      <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        {["🏖 Beach Resorts", "🏔 Hill Stations", "🏰 Heritage Hotels", "🧘 Wellness Retreats", "🎭 City Hotels"].map((tag) => (
          <button key={tag} style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 500, padding: "7px 16px", borderRadius: "100px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => {}} onMouseLeave={(e) => {}}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
