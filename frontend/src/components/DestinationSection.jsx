export default function DestinationSection({
  destSectionRef,
  destinations,
  searchedQuery,
  noResult,
  setNoResult,
  setSearchedQuery,
  setSearchQuery,
  setSelectedDest,
  handleParallax,
  resetParallax,
}) {
  const filtered = searchedQuery
    ? destinations.filter((d) => d.name.toLowerCase().includes(searchedQuery.toLowerCase()))
    : destinations;
  const large = filtered.slice(0, Math.min(2, filtered.length));
  const rest = filtered.slice(Math.min(2, filtered.length));

  return (
    <section ref={destSectionRef} style={{ padding: "80px 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: "10px" }}>
              Explore India
            </p>
            <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-1px" }}>
              {searchedQuery ? `Results for "${searchedQuery}"` : "Popular Destinations"}
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "14px", color: "#888", marginTop: "8px" }}>
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
              style={{ fontFamily: "'DM Sans'", fontSize: "13px", fontWeight: 600, color: "#c9a96e", background: "none", border: "none", cursor: "pointer" }}
            >
              ✕ Clear Search
            </button>
          )}
        </div>

        {noResult ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔍</div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "28px", marginBottom: "12px", letterSpacing: "-0.5px" }}>
              No destination found for <span style={{ color: "#c9a96e", fontStyle: "italic" }}>&quot;{searchedQuery}&quot;</span>
            </h3>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "15px", color: "#888", marginBottom: "28px", lineHeight: 1.6 }}>
              Try searching for Goa, Manali, Jaipur, Kerala, Mumbai or any of our 25 destinations.
            </p>
            <button
              onClick={() => {
                setSearchedQuery("");
                setSearchQuery("");
                setNoResult(false);
              }}
              style={{ fontFamily: "'DM Sans'", fontSize: "14px", fontWeight: 600, padding: "12px 30px", borderRadius: "10px", background: "#1a1a1a", color: "white", border: "none", cursor: "pointer" }}
            >
              Show All Destinations
            </button>
          </div>
        ) : (
          <>
            {large.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: large.length === 1 ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                {large.map((d) => (
                  <div
                    key={d.name}
                    className="dest-card"
                    onClick={() => {
                      setSelectedDest(d);
                      window.scrollTo(0, 0);
                    }}
                    onMouseMove={(e) => handleParallax(e, e.currentTarget, e.currentTarget.querySelector(".dest-img"))}
                    onMouseLeave={(e) => resetParallax(e.currentTarget, e.currentTarget.querySelector(".dest-img"))}
                  >
                    <img src={d.img} alt={d.name} className="dest-img" style={{ height: "320px" }} />
                    <div className="dest-overlay" />
                    <div className="dest-shine" />
                    <div className="dest-badge">✦ Featured</div>
                    <div style={{ position: "absolute", bottom: "22px", left: "22px", zIndex: 5 }}>
                      <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "26px", color: "white" }}>{d.name}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "4px", maxWidth: "280px" }}>{d.desc}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>{d.hotels.toLocaleString()} hotels</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {rest.map((d) => (
                  <div
                    key={d.name}
                    className="dest-card"
                    onClick={() => {
                      setSelectedDest(d);
                      window.scrollTo(0, 0);
                    }}
                    onMouseMove={(e) => handleParallax(e, e.currentTarget, e.currentTarget.querySelector(".dest-img"))}
                    onMouseLeave={(e) => resetParallax(e.currentTarget, e.currentTarget.querySelector(".dest-img"))}
                  >
                    <img src={d.img} alt={d.name} className="dest-img" style={{ height: "200px" }} />
                    <div className="dest-overlay" />
                    <div className="dest-shine" />
                    <div className="dest-badge">Explore</div>
                    <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px", zIndex: 5 }}>
                      <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "17px", color: "white" }}>{d.name}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "11px", color: "rgba(255,255,255,0.75)", marginTop: "3px", lineHeight: 1.4 }}>{d.desc}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>{d.hotels.toLocaleString()} hotels</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
