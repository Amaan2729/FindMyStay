import { useState, useEffect, useRef } from "react";
import logo from "../assets/bd.png";
const stats = [
  { num: "50K+", label: "Properties Listed" },
  { num: "2M+", label: "Happy Travelers" },
  { num: "500+", label: "Cities Covered" },
  { num: "24/7", label: "Customer Support" },
];

const team = [
  {
    initials: "AS",
    name: "Aditya Sharma",
    role: "Co-Founder & CEO",
    city: "Mumbai",
    bio: "Former hospitality consultant with 12+ years helping Indian travelers discover extraordinary stays.",
    color: "#c9a96e",
  },
  {
    initials: "PM",
    name: "Priya Menon",
    role: "Co-Founder & CTO",
    city: "Bengaluru",
    bio: "Built scalable platforms for Ola and Zomato before deciding travel tech was her true calling.",
    color: "#a07840",
  },
  {
    initials: "RV",
    name: "Rohan Verma",
    role: "Head of Partnerships",
    city: "Delhi",
    bio: "Personally vets every property on the platform. Has stayed in 200+ hotels across India.",
    color: "#c9a96e",
  },
  {
    initials: "NK",
    name: "Neha Kapoor",
    role: "Head of Design",
    city: "Jaipur",
    bio: "Brings the warmth of Rajasthani artistry into every pixel. Believes design should feel like hospitality.",
    color: "#a07840",
  },
];

const values = [
  {
    icon: "🏛️",
    title: "Authenticity First",
    desc: "Every stay is handpicked and verified. We reject anything that doesn't embody genuine Indian hospitality.",
  },
  {
    icon: "🤝",
    title: "Community Rooted",
    desc: "We champion small homestays and family-run properties as much as five-star palaces. Every story matters.",
  },
  {
    icon: "🌿",
    title: "Sustainable Travel",
    desc: "We actively promote eco-certified properties and support carbon-conscious travel across India.",
  },
  {
    icon: "💡",
    title: "Thoughtful Innovation",
    desc: "From squad trip planning to AI recommendations — we build features that solve real travel headaches.",
  },
];

const milestones = [
  { year: "2021", event: "Founded in Mumbai with ₹40L seed funding and a big dream." },
  { year: "2022", event: "Crossed 10,000 verified properties across 15 Indian states." },
  { year: "2023", event: "Launched TripSquad — India's first group trip planning feature." },
  { year: "2024", event: "2 million happy travelers and counting. Expanded to 500+ cities." },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export default function AboutPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [heroRef, heroVisible] = useScrollReveal();
  const [missionRef, missionVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();
  const [timelineRef, timelineVisible] = useScrollReveal();
  const [teamRef, teamVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: "#faf8f5", minHeight: "100vh", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1ede8; }
        ::-webkit-scrollbar-thumb { background: #c9a96e; border-radius: 3px; }

        .nav-link-about {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .nav-link-about:hover { opacity: 1; }
        .nav-link-about.active-about { opacity: 1; color: #c9a96e; }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .reveal.show { opacity: 1; transform: translateY(0); }
        .reveal.d1 { transition-delay: 0.1s; }
        .reveal.d2 { transition-delay: 0.2s; }
        .reveal.d3 { transition-delay: 0.3s; }
        .reveal.d4 { transition-delay: 0.4s; }

        .value-card-about {
          background: white;
          border-radius: 16px;
          padding: 32px 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .value-card-about:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.11);
        }

        .team-card-about {
          background: white;
          border-radius: 18px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .team-card-about::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .team-card-about:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.11); }
        .team-card-about:hover::after { opacity: 1; }

        .search-btn-about {
          background: linear-gradient(135deg, #c9a96e, #a07840);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .search-btn-about:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(160,120,64,0.35); }

        .outline-btn-about {
          background: transparent;
          color: white;
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 10px;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .outline-btn-about:hover { border-color: #c9a96e; color: #c9a96e; }

        .timeline-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #c9a96e;
          border: 3px solid white;
          box-shadow: 0 0 0 2px #c9a96e;
          flex-shrink: 0;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .about-hero-title { font-size: 40px !important; }
          .about-grid-2 { grid-template-columns: 1fr !important; }
          .about-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .about-mission-layout { flex-direction: column !important; gap: 40px !important; }
          .about-stats-bar { gap: 32px !important; }
          .about-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(20,20,20,0.97)" : "rgba(20,20,20,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "background 0.3s",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}> 
          <img src={logo} alt="FindMyStay" style={{ height: 50, width: "auto" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {['Explore', 'Deals', 'About', 'Blog'].map(l => (
            <a key={l} className={`nav-link-about${l === "About" ? " active-about" : ""}`}
              onClick={() => l !== "About" && setPage("home")}>
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setPage("login")} style={{
            fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600, padding: "9px 22px",
            borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.3)",
            background: "transparent", color: "white", cursor: "pointer",
          }}>Login</button>
          <button onClick={() => setPage("signup")} className="search-btn-about" style={{ padding: "9px 22px", fontSize: 13 }}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{
        minHeight: "88vh",
        background: "linear-gradient(160deg, #0f0c08 0%, #1c1409 30%, #2a1e0e 60%, #1a1209 100%)",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px 5% 80px",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=60')`,
          backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.12) 0%, transparent 60%)",
        }} />

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto", width: "100%", textAlign: "center" }}>
          <div className={`reveal ${heroVisible ? "show" : ""}`}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(201,169,110,0.12)",
              border: "1px solid rgba(201,169,110,0.3)",
              borderRadius: 100, padding: "7px 18px", marginBottom: 28,
            }}>
              <span style={{ fontSize: 11 }}>✦</span>
              <span style={{
                fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600,
                color: "#c9a96e", letterSpacing: "1.5px", textTransform: "uppercase",
              }}>Our Story</span>
            </div>
          </div>

          <h1 className={`reveal d1 ${heroVisible ? "show" : ""} about-hero-title`} style={{
            fontFamily: "'Playfair Display'", fontWeight: 900,
            fontSize: "clamp(38px, 6vw, 74px)",
            color: "white", lineHeight: 1.05,
            letterSpacing: "-2px", marginBottom: 16,
          }}>
            Born from a Love of
            <br />
            <span style={{ color: "#c9a96e", fontStyle: "italic" }}>Indian Hospitality</span>
          </h1>

          <p className={`reveal d2 ${heroVisible ? "show" : ""}`} style={{
            fontFamily: "'DM Sans'", fontSize: 17,
            color: "rgba(255,255,255,0.6)", fontWeight: 300,
            lineHeight: 1.75, maxWidth: 560, margin: "0 auto 44px",
          }}>
            We started FindMyStay because we believe every journey in India deserves
            a stay as remarkable as the destination — from palace suites to misty
            mountain cottages.
          </p>

          <div className={`reveal d3 ${heroVisible ? "show" : ""}`} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="search-btn-about" onClick={() => setPage("home")}>Explore Stays</button>
            <button className="outline-btn-about">Meet the Team ↓</button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "2px", marginBottom: 8 }}>SCROLL</div>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)", margin: "0 auto" }} />
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{
        background: "#1a1a1a", padding: "28px 5%",
        display: "flex", justifyContent: "center",
        gap: 80, flexWrap: "wrap",
      }} className="about-stats-bar">
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: 28, color: "#c9a96e" }}>{s.num}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── MISSION ── */}
      <section ref={missionRef} style={{ padding: "90px 5%", background: "#faf8f5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }} className="about-mission-layout">

          {/* Left visual panel */}
          <div className={`reveal ${missionVisible ? "show" : ""}`} style={{ flex: "0 0 420px", position: "relative" }}>
            <div style={{
              width: "100%", maxWidth: 420,
              background: "linear-gradient(160deg, #1c1409 0%, #2a1e0e 100%)",
              borderRadius: 20, padding: "44px 36px",
              position: "relative", overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
            }}>
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 180, height: 180, borderRadius: "50%",
                background: "rgba(201,169,110,0.08)",
              }} />
              <div style={{
                fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700,
                letterSpacing: "2px", textTransform: "uppercase",
                color: "#c9a96e", marginBottom: 16,
              }}>📍 Founded</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 36, fontWeight: 900, color: "white", marginBottom: 6 }}>2021, Mumbai</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 40 }}>With ₹40L seed &amp; a big dream</div>

              <div style={{ width: "100%", height: 1, background: "rgba(201,169,110,0.2)", marginBottom: 32 }} />

              {[
                { label: "States Covered", val: "28" },
                { label: "Verified Properties", val: "50,000+" },
                { label: "Avg. Guest Rating", val: "4.8 ★" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: "#c9a96e" }}>{item.val}</span>
                </div>
              ))}
            </div>
            {/* offset border accent */}
            <div style={{
              position: "absolute", bottom: -14, right: -14,
              width: "70%", height: "60%",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: 20, zIndex: -1,
            }} />
          </div>

          {/* Right text */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div className={`reveal d1 ${missionVisible ? "show" : ""}`}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>
                Our Mission
              </p>
              <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px", marginBottom: 24, lineHeight: 1.15 }}>
                Making Every Stay<br />a <em style={{ color: "#c9a96e" }}>Memory</em>
              </h2>
            </div>
            <div className={`reveal d2 ${missionVisible ? "show" : ""}`}>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, lineHeight: 1.85, color: "#555", marginBottom: 18 }}>
                India is one of the most diverse travel destinations on Earth — yet finding
                the right place to stay has always been broken. Generic booking platforms
                buried the soul of Indian hospitality under star ratings and algorithm noise.
              </p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, lineHeight: 1.85, color: "#555", marginBottom: 32 }}>
                We built FindMyStay to change that. Our team personally vets every listing —
                from the thread count to the host's chai recipe. We celebrate the boutique,
                the heritage, the extraordinary hidden gems, and the palaces alike.
              </p>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 3, flexShrink: 0, background: "linear-gradient(180deg, #c9a96e, transparent)", minHeight: 60, borderRadius: 2 }} />
                <blockquote style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontStyle: "italic", lineHeight: 1.6, color: "#333" }}>
                  "Atithi devo bhava — the guest is God. We believe every traveler deserves to feel exactly that."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} style={{ padding: "80px 5%", background: "#f5f0ea" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className={`reveal ${valuesVisible ? "show" : ""}`} style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>
              What Drives Us
            </p>
            <h2 className={`reveal d1 ${valuesVisible ? "show" : ""}`} style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-1px" }}>
              Our Values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="about-grid-2">
            {values.map((v, i) => (
              <div key={v.title} className={`value-card-about reveal d${i + 1} ${valuesVisible ? "show" : ""}`}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: "-0.3px" }}>{v.title}</h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: 14, lineHeight: 1.75, color: "#777" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section ref={timelineRef} style={{ padding: "80px 5%", background: "#faf8f5" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className={`reveal ${timelineVisible ? "show" : ""}`} style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>
              How We Got Here
            </p>
            <h2 className={`reveal d1 ${timelineVisible ? "show" : ""}`} style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-1px" }}>
              Our Journey
            </h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* vertical line */}
            <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #c9a96e, rgba(201,169,110,0.1))" }} />

            {milestones.map((m, i) => (
              <div key={m.year} className={`reveal d${i + 1} ${timelineVisible ? "show" : ""}`}
                style={{ display: "flex", gap: 32, marginBottom: 40, paddingLeft: 16, alignItems: "flex-start", position: "relative" }}>
                <div className="timeline-dot" style={{ position: "absolute", left: 0 }} />
                <div style={{ flex: 1, paddingLeft: 24 }}>
                  <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 22, color: "#c9a96e", marginBottom: 6 }}>{m.year}</div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: 15, lineHeight: 1.7, color: "#555" }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section ref={teamRef} style={{ padding: "80px 5%", background: "#f5f0ea" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className={`reveal ${teamVisible ? "show" : ""}`} style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#c9a96e", marginBottom: 12 }}>
              The Humans Behind It
            </p>
            <h2 className={`reveal d1 ${teamVisible ? "show" : ""}`} style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-1px" }}>
              Meet the Team
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }} className="about-grid-4">
            {team.map((member, i) => (
              <div key={member.name} className={`team-card-about reveal d${i + 1} ${teamVisible ? "show" : ""}`}>
                <div style={{
                  width: 68, height: 68, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${member.color}30, ${member.color}10)`,
                  border: `2px solid ${member.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display'", fontWeight: 700,
                  fontSize: 22, color: member.color,
                  margin: "0 auto 16px",
                }}>{member.initials}</div>

                <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{member.name}</h3>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#c9a96e", marginBottom: 6 }}>{member.role}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#aaa", marginBottom: 14 }}>📍 {member.city}</div>

                <div style={{ width: 32, height: 1, background: "rgba(201,169,110,0.4)", margin: "0 auto 14px" }} />

                <p style={{ fontFamily: "'DM Sans'", fontSize: 13, lineHeight: 1.7, color: "#777" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ padding: "0 5% 80px", background: "#faf8f5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(160deg, #0f0c08 0%, #1c1409 40%, #2a1e0e 100%)",
            borderRadius: 28, padding: "64px 60px",
            position: "relative", overflow: "hidden",
            textAlign: "center",
          }}>
            <div style={{ position: "absolute", top: -40, right: "10%", width: 280, height: 280, borderRadius: "50%", background: "rgba(201,169,110,0.07)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, left: "5%", width: 200, height: 200, borderRadius: "50%", background: "rgba(201,169,110,0.04)", pointerEvents: "none" }} />

            <div className={`reveal ${ctaVisible ? "show" : ""}`} style={{ position: "relative" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)",
                borderRadius: 100, padding: "7px 18px", marginBottom: 24,
              }}>
                <span style={{ fontSize: 11 }}>✦</span>
                <span style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: "#c9a96e", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Ready to Explore?
                </span>
              </div>

              <h2 style={{ fontFamily: "'Playfair Display'", fontWeight: 900, fontSize: "clamp(28px, 4vw, 50px)", color: "white", letterSpacing: "-1.5px", marginBottom: 16, lineHeight: 1.1 }}>
                Your next great stay is{" "}
                <em style={{ color: "#c9a96e" }}>waiting</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.75 }}>
                Over 50,000 handpicked stays across India — palaces, homestays, hill retreats &amp; beach havens, all in one place.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="search-btn-about" style={{ padding: "14px 36px", fontSize: 15 }} onClick={() => setPage("home")}>
                  Start Exploring Stays
                </button>
                <button className="outline-btn-about" style={{ padding: "14px 36px", fontSize: 15 }} onClick={() => setPage("tripsquad")}>
                  Plan with Your Squad ✈️
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111", padding: "60px 5% 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }} className="about-footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }} onClick={() => setPage("home")}>
                <img src={logo} alt="FindMyStay" style={{ height: 45, width: "auto" }} />
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260 }}>
                Your trusted companion for finding the perfect stay across India and beyond.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["📘", "🐦", "📸", "▶️"].map(s => (
                  <button key={s} style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 14, cursor: "pointer" }}>{s}</button>
                ))}
              </div>
            </div>
            {[
              { title: "Company", links: ["About Us", "Careers", "Press", "Blog", "Contact"] },
              { title: "Support", links: ["Help Center", "Cancellation", "Safety", "Accessibility"] },
              { title: "Discover", links: ["Hotels", "Resorts", "Motels", "Villas", "Hostels", "Camping"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.9)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</h4>
                {col.links.map(l => (
                  <div key={l} style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer" }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 findmyStay. All rights reserved.</span>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Privacy Policy · Terms of Service · Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}