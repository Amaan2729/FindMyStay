export default function GlobalStyle() {
  return (
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
      .dest-card:hover .dest-shine { opacity: 1; }
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
      .dest-card:hover .dest-badge { opacity: 1; transform: translateY(0); }
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
      .hero-glow {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle at 20% 30%, rgba(201,169,110,0.2), transparent 45%), radial-gradient(circle at 80% 20%, rgba(233,196,110,0.14), transparent 39%);
        pointer-events: none;
        opacity: 0.85;
      }
      .hero-area::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(29, 42, 57, 0.12), rgba(20, 19, 21, 0.5));
        pointer-events: none;
      }
      .dark-stats { border-radius: 20px; box-shadow: 0 20px 48px rgba(0,0,0,0.35); }
      .stat-glass { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 14px; backdrop-filter: blur(8px); padding: 18px 22px; min-width: 150px; }
      .stat-glass:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.35); }
      .section-heading {
        font-family: 'Playfair Display', serif;
        font-weight: 900;
        color: #1a1a1a;
        margin-bottom: 12px;
        line-height: 1.1;
      }
      .section-subtitle { color: #5a5a5a; }
      .card-glow { box-shadow: 0 16px 40px rgba(0,0,0,0.12); transition: transform 0.3s, box-shadow 0.3s; }
      .card-glow:hover { transform: translateY(-4px); box-shadow: 0 22px 52px rgba(0,0,0,0.2); }
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
  );
}
