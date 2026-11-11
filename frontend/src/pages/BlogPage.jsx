import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const blogs = [
  {
    id: 1,
    title: "Top 10 Budget Hotels in Delhi",
    description: "Discover affordable yet comfortable stays in Delhi with smart location picks and essential amenities.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&q=80",
    author: "FindMyStay Team",
    date: "2026-05-20",
    category: "Hotels",
    tags: ["Delhi", "Budget", "Hotels"],
    popularity: 92,
  },
  {
    id: 2,
    title: "How to Book the Best Summer Resort Deals",
    description: "Learn how to snag premium resort discounts and travel with confidence during peak season.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1000&q=80",
    author: "Travel Expert",
    date: "2026-06-10",
    category: "Offers",
    tags: ["Resorts", "Offers", "Summer"],
    popularity: 84,
  },
  {
    id: 3,
    title: "Weekend Getaway Guide: Goa in 48 Hours",
    description: "Plan a seamless beach escape with top stay picks, nightlife ideas and must-see landmarks.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",
    author: "Riya Sharma",
    date: "2026-04-27",
    category: "Travel",
    tags: ["Goa", "Weekend", "Guide"],
    popularity: 95,
  },
  {
    id: 4,
    title: "Luxury Hotel Amenities Worth the Upgrade",
    description: "From spa suites to private dining—here's what makes premium hotels worth the extra comfort.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80",
    author: "Ayesha Khan",
    date: "2026-03-14",
    category: "Guides",
    tags: ["Luxury", "Hotels", "Amenities"],
    popularity: 78,
  },
  {
    id: 5,
    title: "Minimalist Travel Packing for Hotel Stays",
    description: "Pack light and smart for hotel trips without sacrificing style or convenience.",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1000&q=80",
    author: "FindMyStay Team",
    date: "2026-05-03",
    category: "Tips",
    tags: ["Packing", "Tips", "Hotels"],
    popularity: 88,
  },
  {
    id: 6,
    title: "Guide to Weekend Boutique Hotels in Jaipur",
    description: "Charming stays, authentic experiences, and top neighbourhoods for a royal Rajasthan escape.",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1000&q=80",
    author: "Arjun Patel",
    date: "2026-05-29",
    category: "Hotels",
    tags: ["Jaipur", "Boutique", "Luxury"],
    popularity: 91,
  },
];

const categories = ["All", "Travel", "Hotels", "Guides", "Offers", "Tips"];
const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Popular", value: "popular" },
];

const pageStyles = {
  page: {
    minHeight: "100vh",
    background: "#faf8f5",
    color: "#111827",
    fontFamily: "'DM Sans', system-ui, sans-serif",
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
    background: "white",
    borderRadius: "32px",
    padding: "40px",
    boxShadow: "0 28px 80px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    position: "relative",
  },
  heroStat: {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: 1.8,
  },
  searchBar: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "26px",
  },
  input: {
    flex: 1,
    minWidth: "220px",
    borderRadius: "14px",
    border: "1px solid #d1d5db",
    padding: "16px 18px",
    background: "#f8fafc",
    color: "#111827",
    outline: "none",
    fontSize: "15px",
  },
  buttonPrimary: {
    borderRadius: "16px",
    border: "none",
    background: "#c9a96e",
    color: "#0f172a",
    padding: "16px 28px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 18px 48px rgba(201, 169, 110, 0.18)",
  },
  featuredCard: {
    borderRadius: "30px",
    overflow: "hidden",
    background: "white",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    boxShadow: "0 26px 72px rgba(15, 23, 42, 0.08)",
  },
  featuredImage: {
    width: "100%",
    minHeight: "340px",
    objectFit: "cover",
    display: "block",
  },
  featuredContent: {
    padding: "32px",
  },
  blogGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },
  blogCards: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "24px",
  },
  card: {
    borderRadius: "26px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 22px 56px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  },
  cardImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "26px",
  },
  tag: {
    display: "inline-flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  },
  tagPill: {
    borderRadius: "999px",
    padding: "8px 14px",
    background: "#f8fafc",
    color: "#475569",
    fontSize: "13px",
    fontWeight: 600,
  },
  sidebarCard: {
    borderRadius: "28px",
    background: "white",
    border: "1px solid rgba(15, 23, 42, 0.06)",
    boxShadow: "0 18px 50px rgba(15, 23, 42, 0.08)",
    padding: "28px",
  },
  smallBtn: {
    borderRadius: "999px",
    border: "1px solid rgba(15, 23, 42, 0.12)",
    background: "#f8fafc",
    color: "#111827",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14px",
  },
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogPage({ onBack, onPlanEarly }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/blog/") && path !== "/blog") {
      const id = Number(path.split("/")[2]);
      const blog = blogs.find((item) => item.id === id);
      setSelectedBlog(blog || null);
    } else {
      setSelectedBlog(null);
    }

    const handlePop = () => {
      const path = window.location.pathname;
      if (path.startsWith("/blog/") && path !== "/blog") {
        const id = Number(path.split("/")[2]);
        const blog = blogs.find((item) => item.id === id);
        setSelectedBlog(blog || null);
      } else {
        setSelectedBlog(null);
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const featuredBlog = useMemo(() => blogs[0], []);
  const trending = useMemo(
    () => blogs
      .slice()
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 4),
    []
  );

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((blog) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          blog.title.toLowerCase().includes(query) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesCategory = category === "All" || blog.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
        if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
        if (sortBy === "popular") return b.popularity - a.popularity;
        return 0;
      });
  }, [search, category, sortBy]);

  const handleReadMore = (blog) => {
    window.history.pushState(null, "", `/blog/${blog.id}`);
    setSelectedBlog(blog);
  };

  const toggleLike = (id) => {
    setLiked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleSave = (id) => {
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  if (selectedBlog) {
    return (
      <div style={pageStyles.page}>
        <div style={pageStyles.wrapper}>
          <button
            onClick={onBack}
            style={{ ...pageStyles.smallBtn, marginBottom: "24px" }}
          >
            ← Back to home
          </button>
          <article style={{ background: "white", borderRadius: "32px", overflow: "hidden", boxShadow: "0 28px 80px rgba(15, 23, 42, 0.08)", border: "1px solid rgba(15, 23, 42, 0.06)" }}>
            <img src={selectedBlog.image} alt={selectedBlog.title} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
            <div style={{ padding: "40px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                <span style={{ color: "#c9a96e", fontWeight: 700, fontSize: "13px", letterSpacing: "0.12em" }}>
                  {selectedBlog.category}
                </span>
                {selectedBlog.tags.map((tag) => (
                  <span key={tag} style={{ background: "#f8fafc", color: "#475569", padding: "8px 12px", borderRadius: "999px", fontSize: "13px" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 style={{ fontSize: "clamp(38px, 3vw, 54px)", margin: "0 0 20px", lineHeight: 1.05, color: "#111827" }}>
                {selectedBlog.title}
              </h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", color: "#64748b", fontSize: "15px", marginBottom: "28px" }}>
                <span>{selectedBlog.author}</span>
                <span>•</span>
                <span>{formatDate(selectedBlog.date)}</span>
                <span>•</span>
                <span>{selectedBlog.popularity}% trending</span>
              </div>
              <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#334155", maxWidth: "820px" }}>
                {selectedBlog.description} This article expands on the most important travel discoveries, hotel tips, and destination secrets for an unforgettable stay.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>
                <button
                  style={{ ...pageStyles.buttonPrimary, minWidth: "180px" }}
                  onClick={() => {
                    toast.success("Article saved for later");
                    toggleSave(selectedBlog.id);
                  }}
                >
                  {saved.includes(selectedBlog.id) ? "Saved" : "Save Article"}
                </button>
                <button
                  onClick={() => toggleLike(selectedBlog.id)}
                  style={{ ...pageStyles.smallBtn, borderColor: "rgba(201, 169, 110, 0.25)", background: "#fff8e6" }}
                >
                  {liked.includes(selectedBlog.id) ? "❤️ Liked" : "♡ Like"}
                </button>
              </div>
            </div>
          </article>
        </div>
        <ToastContainer position="bottom-right" autoClose={2200} hideProgressBar closeOnClick pauseOnHover draggable />
      </div>
    );
  }

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.wrapper}>
        <button
          onClick={onBack}
          style={{ ...pageStyles.smallBtn, marginBottom: "24px" }}
        >
          ← Back to home
        </button>

        <section style={pageStyles.hero}>
          <div style={pageStyles.heroCard}>
            <div style={pageStyles.heroStat}>Travel Stories & Hotel Guides</div>
            <h1 style={{ fontSize: "clamp(42px, 4vw, 64px)", margin: "18px 0 0", lineHeight: 1.03 }}>
              Discover travel tips, hotel reviews, and destination guides
            </h1>
            <p style={{ marginTop: "22px", maxWidth: "620px", lineHeight: 1.8, color: "#475569" }}>
              FindMyStay brings expert hotel advice, curated destination reads, and seasonal offers in one modern blog experience.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "24px" }}>
              <button
                type="button"
                onClick={onPlanEarly}
                style={{ ...pageStyles.buttonPrimary, minWidth: "180px" }}
              >
                Plan Early
              </button>
            </div>
            <div style={pageStyles.searchBar}>
              <input
                style={pageStyles.input}
                placeholder="Search by title or tag"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button style={pageStyles.buttonPrimary}>Search</button>
            </div>
          </div>
          <div style={pageStyles.featuredCard}>
            <img src={featuredBlog.image} alt={featuredBlog.title} style={pageStyles.featuredImage} />
            <div style={pageStyles.featuredContent}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.18em", color: "#c9a96e", marginBottom: "16px" }}>
                Featured Article
              </span>
              <h2 style={{ fontSize: "clamp(28px, 2.8vw, 36px)", margin: 0, lineHeight: 1.08 }}>
                {featuredBlog.title}
              </h2>
              <p style={{ marginTop: "18px", color: "#475569", lineHeight: 1.8, fontSize: "16px" }}>
                {featuredBlog.description} Read the full article to discover why this hotel guide should be your next travel inspiration.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", marginTop: "24px", alignItems: "center" }}>
                <div style={{ color: "#64748b", fontSize: "14px" }}>
                  {featuredBlog.author} • {formatDate(featuredBlog.date)}
                </div>
                <button
                  style={{ ...pageStyles.buttonPrimary, minWidth: "190px" }}
                  onClick={() => handleReadMore(featuredBlog)}
                >
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </section>

        <div style={pageStyles.blogGrid}>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "18px", marginBottom: "24px" }}>
              <div>
                <div style={{ textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.18em", color: "#475569", marginBottom: "8px" }}>Latest insights</div>
                <h2 style={{ margin: 0, fontSize: "clamp(32px, 3vw, 42px)", lineHeight: 1.06 }}>Fresh blog stories for modern travellers</h2>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <select style={pageStyles.smallBtn} value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <select style={pageStyles.smallBtn} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={pageStyles.blogCards}>
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  style={pageStyles.card}
                  className="blog-card"
                  onClick={() => handleReadMore(blog)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px) scale(1.01)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)")}
                >
                  <img src={blog.image} alt={blog.title} style={pageStyles.cardImage} />
                  <div style={pageStyles.cardBody}>
                    <div style={{ marginBottom: "14px", color: "#c9a96e", fontWeight: 700, fontSize: "13px", letterSpacing: "0.14em" }}>
                      {blog.category}
                    </div>
                    <h3 style={{ margin: "0 0 14px", fontSize: "22px", lineHeight: 1.15, color: "#111827" }}>{blog.title}</h3>
                    <p style={{ margin: 0, color: "#475569", lineHeight: 1.8, fontSize: "15px" }}>{blog.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", marginTop: "22px" }}>
                      <div style={{ color: "#64748b", fontSize: "14px" }}>
                        {blog.author} • {formatDate(blog.date)}
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(blog.id);
                            toast.success(liked.includes(blog.id) ? "Removed like" : "Liked article");
                          }}
                          style={{ background: "transparent", border: "none", color: liked.includes(blog.id) ? "#e11d48" : "#64748b", cursor: "pointer", fontSize: "18px" }}
                        >
                          {liked.includes(blog.id) ? "♥" : "♡"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(blog.id);
                            toast.success(saved.includes(blog.id) ? "Removed bookmark" : "Saved article");
                          }}
                          style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "18px" }}
                        >
                          {saved.includes(blog.id) ? "🔖" : "📌"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside style={pageStyles.sidebarCard}>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.18em", color: "#475569", marginBottom: "12px" }}>Trending Blogs</div>
              <h3 style={{ margin: 0, fontSize: "26px", lineHeight: 1.15 }}>What readers love</h3>
            </div>
            <div style={{ display: "grid", gap: "18px" }}>
              {trending.map((blog) => (
                <div key={blog.id} style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "16px", alignItems: "center" }}>
                  <img src={blog.image} alt={blog.title} style={{ width: "96px", height: "96px", objectFit: "cover", borderRadius: "18px" }} />
                  <div>
                    <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#111827" }}>{blog.title}</p>
                    <span style={{ color: "#64748b", fontSize: "13px" }}>{formatDate(blog.date)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "28px" }}>
              <div style={{ marginBottom: "14px", color: "#475569", fontWeight: 700 }}>Tags</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {Array.from(new Set(blogs.flatMap((blog) => blog.tags))).map((tag) => (
                  <span key={tag} style={{ ...pageStyles.tagPill, background: "#f8fafc", color: "#475569" }}>{tag}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2200} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
}
