import { useState, useEffect } from "react";

// ─── CSS (from Code 1's design system, extended for Code 2 sections) ──────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold:       #C4973A;
  --gold-light: #E8C97A;
  --gold-pale:  #F5EDD8;
  --dark:       #1A1510;
  --dark-2:     #2A2118;
  --dark-3:     #3D3020;
  --muted:      #8A7A62;
  --surface:    #F9F5ED;
  --white:      #FFFFFF;
  --border:     #EAE0CC;
  --green:      #3B6D11;
  --red:        #993C1D;
  --blue:       #185FA5;
}

body, #root { height: 100%; font-family: 'DM Sans', sans-serif; }

.fms-admin {
  display: flex;
  height: 100vh;
  background: var(--surface);
  overflow: hidden;
}

/* ── Sidebar ── */
.sidebar {
  width: 240px;
  min-width: 240px;
  background: var(--dark);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--dark-3);
  overflow-y: auto;
}
.sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid var(--dark-3); }
.logo-name    { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--gold-light); letter-spacing: 0.02em; }
.logo-sub     { font-size: 10px; color: var(--muted); letter-spacing: 0.15em; text-transform: uppercase; margin-top: 2px; }
.sidebar-nav  { flex: 1; padding: 16px 12px; }
.nav-section  { margin-bottom: 24px; }
.nav-label    { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); padding: 0 12px; margin-bottom: 8px; display: block; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px; font-size: 13.5px;
  color: #A89880; cursor: pointer; transition: all 0.15s;
  margin-bottom: 2px; border: none; border-left: 2px solid transparent;
  background: none; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif;
}
.nav-item:hover  { background: var(--dark-3); color: var(--gold-light); }
.nav-item.active { background: var(--dark-3); color: var(--gold-light); border-left: 2px solid var(--gold); padding-left: 10px; }
.nav-badge { margin-left: auto; background: var(--gold); color: var(--dark); font-size: 10px; font-weight: 500; padding: 1px 7px; border-radius: 20px; }
.sidebar-footer { padding: 16px 12px 24px; border-top: 1px solid var(--dark-3); }
.admin-user     { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; }
.avatar-circle  { width: 32px; height: 32px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; color: var(--dark); flex-shrink: 0; }
.avatar-name    { font-size: 13px; font-weight: 500; color: #D4C4A8; }
.avatar-email   { font-size: 11px; color: var(--muted); }

/* ── Main ── */
.main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }
.topbar {
  background: var(--white); border-bottom: 1px solid var(--border);
  padding: 0 32px; height: 60px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between;
}
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--dark); }
.page-date  { font-size: 12px; color: var(--muted); }
.topbar-right { display: flex; align-items: center; gap: 12px; }
.topbar-btn {
  background: none; border: 1px solid #DDD0B4; border-radius: 8px;
  padding: 7px 14px; font-size: 13px; cursor: pointer; color: var(--dark-3);
  font-family: 'DM Sans', sans-serif; display: flex; align-items: center; gap: 6px; transition: border-color 0.15s;
}
.topbar-btn:hover { border-color: var(--gold); color: var(--gold); }
.btn-gold       { background: var(--gold); border-color: var(--gold); color: #fff; font-weight: 500; }
.btn-gold:hover { background: #b5882e; border-color: #b5882e; color: #fff; }
.notif-dot      { width: 8px; height: 8px; background: #E24B4A; border-radius: 50%; }
.content        { padding: 28px 32px; overflow-y: auto; flex: 1; }

/* ── Stats Grid ── */
.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 16px; margin-bottom: 28px;
}
.stat-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px; position: relative; overflow: hidden;
}
.stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gold); }
.stat-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.stat-value { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: var(--dark); line-height: 1; }
.stat-meta  { font-size: 12px; color: var(--muted); margin-top: 6px; display: flex; align-items: center; gap: 4px; }
.up   { color: #3B6D11; }
.down { color: #993C1D; }

/* ── Charts Row ── */
.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 28px; }
.card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 22px; }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.card-title  { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: var(--dark); }
.card-action { font-size: 12px; color: var(--gold); cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; }
.card-action:hover { text-decoration: underline; }

/* ── Bar Chart ── */
.bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 130px; }
.bar-col   { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
.bar-fill  { width: 100%; border-radius: 4px 4px 0 0; background: var(--gold-pale); cursor: pointer; transition: background 0.2s; }
.bar-fill:hover  { background: var(--gold-light); }
.bar-fill.active { background: var(--gold); }
.bar-month { font-size: 10px; color: var(--muted); }

/* ── Donut ── */
.donut-wrap   { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.donut-legend { width: 100%; }
.legend-item  { display: flex; align-items: center; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid #F0E8D4; font-size: 13px; }
.legend-item:last-child { border-bottom: none; }
.legend-dot   { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.legend-name  { flex: 1; margin-left: 8px; color: var(--dark-3); }
.legend-pct   { font-weight: 500; color: var(--dark); }

/* ── Table ── */
.table-wrap { overflow-x: auto; }
table      { width: 100%; border-collapse: collapse; font-size: 13.5px; }
thead th {
  text-align: left; padding: 10px 14px; font-size: 11px;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--muted); font-weight: 400; border-bottom: 1px solid var(--border); background: #FBF8F1;
}
tbody td                { padding: 14px; border-bottom: 1px solid #F5EDD8; color: var(--dark-3); vertical-align: middle; }
tbody tr:last-child td  { border-bottom: none; }
tbody tr:hover td       { background: #FDFAF4; }
.status-badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; font-weight: 500; letter-spacing: 0.03em; }
.guest-cell   { display: flex; align-items: center; gap: 8px; }
.guest-av     { width: 28px; height: 28px; border-radius: 50%; background: var(--gold-pale); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: var(--gold); flex-shrink: 0; }
.booking-id   { font-size: 12px; color: var(--muted); font-family: monospace; }
.action-btn   { background: none; border: 1px solid #DDD0B4; border-radius: 6px; padding: 4px 10px; font-size: 12px; cursor: pointer; color: var(--dark-3); font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
.action-btn:hover { border-color: var(--gold); color: var(--gold); }

/* ── Bottom row ── */
.bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.activity-list { display: flex; flex-direction: column; }
.activity-item { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid #F5EDD8; }
.activity-item:last-child { border-bottom: none; }
.act-dot  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.act-text { font-size: 13px; color: var(--dark-3); line-height: 1.5; flex: 1; }
.act-time { font-size: 11px; color: var(--muted); flex-shrink: 0; margin-top: 2px; }

/* ── Quick actions ── */
.qa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.qa-btn  { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; cursor: pointer; text-align: left; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
.qa-btn:hover  { border-color: var(--gold); background: var(--gold-pale); }
.qa-icon  { font-size: 18px; margin-bottom: 8px; }
.qa-label { font-size: 13px; font-weight: 500; color: var(--dark); display: block; }
.qa-desc  { font-size: 11px; color: var(--muted); display: block; margin-top: 2px; }

/* ── Filter tabs ── */
.tabs-row { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.page-tab { padding: 6px 14px; border-radius: 6px; font-size: 13px; cursor: pointer; border: 1px solid var(--border); background: none; font-family: 'DM Sans', sans-serif; color: var(--dark-3); transition: all 0.15s; }
.page-tab.active           { background: var(--gold); border-color: var(--gold); color: #fff; }
.page-tab:hover:not(.active) { border-color: var(--gold); color: var(--gold); }

/* ── Search input ── */
.search-input {
  width: 100%; font-family: 'DM Sans', sans-serif; font-size: 13px;
  padding: 10px 16px; border-radius: 8px; border: 1px solid var(--border);
  outline: none; color: var(--dark); background: var(--white);
  transition: border-color 0.15s;
}
.search-input:focus { border-color: var(--gold); }

/* ── Overview metric cards ── */
.metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
.metric-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 12px;
  padding: 22px; display: flex; flex-direction: column; gap: 6px;
  transition: transform 0.2s, box-shadow 0.2s; cursor: default; position: relative; overflow: hidden;
}
.metric-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gold); }
.metric-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }
.metric-icon  { font-size: 22px; }
.metric-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.metric-value { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: var(--dark); line-height: 1; }
.metric-sub   { font-size: 12px; color: var(--muted); }

/* ── Health cards ── */
.health-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
.health-card {
  background: var(--white); border: 1px solid var(--border); border-radius: 12px;
  padding: 24px; text-align: center; transition: transform 0.2s, box-shadow 0.2s; cursor: default;
}
.health-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }
.health-icon  { font-size: 28px; margin-bottom: 10px; }
.health-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: var(--dark); margin-bottom: 8px; }
.health-detail{ font-size: 12px; color: var(--muted); margin-top: 8px; line-height: 1.5; }

/* ── Uptime bar ── */
.uptime-bar { display: flex; gap: 3px; margin-bottom: 8px; }
.uptime-block { flex: 1; height: 28px; border-radius: 3px; transition: opacity 0.2s; cursor: default; }
.uptime-block:hover { opacity: 0.6; }
.uptime-meta { display: flex; justify-content: space-between; }

/* ── Empty / Loading states ── */
.state-msg { text-align: center; padding: 40px; font-size: 14px; color: var(--muted); font-family: 'DM Sans', sans-serif; }
.error-msg  { text-align: center; padding: 40px; font-size: 14px; color: #993C1D; }
`;

// ─── Static demo data (same as Code 1, extended) ──────────────────────────────
const MONTHS       = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const BOOKING_VALS = [82, 95, 110, 88, 120, 145, 132, 98, 115, 140, 128, 160];
const STAY_TYPES   = [
  { label: "City Hotels",   pct: 45, color: "#C4973A" },
  { label: "Beach Resorts", pct: 25, color: "#8A7A62" },
  { label: "Hill Stations", pct: 16, color: "#E8C97A" },
  { label: "Others",        pct: 14, color: "#F5EDD8" },
];
const ACTIVITY = [
  { color: "#C4973A", text: "New property listed — Ranthambore Jungle Retreat, Rajasthan", time: "2m ago"  },
  { color: "#3B6D11", text: "Payment received for booking #FMS-2837 — ₹14,200",           time: "18m ago" },
  { color: "#185FA5", text: "Guest Aarav Mehta checked in at Wildflower Hall, Shimla",    time: "1h ago"  },
  { color: "#993C1D", text: "Cancellation request received for booking #FMS-2838",        time: "2h ago"  },
  { color: "#C4973A", text: "5-star review posted for Leela Beach Resort, Goa",           time: "4h ago"  },
];
const QUICK_ACTIONS = [
  { icon: "🏨", label: "Add Property", desc: "List a new stay" },
  { icon: "📋", label: "New Booking",  desc: "Manual entry"   },
  { icon: "👤", label: "Add Guest",    desc: "Register user"  },
  { icon: "📊", label: "Export CSV",   desc: "Booking data"   },
];
const HEALTH_ITEMS = [
  { title: "Database",   status: "Healthy", type: "healthy", icon: "🗄️",  detail: "SQLite / Sequelize ORM" },
  { title: "API Server", status: "Running", type: "healthy", icon: "🚀",  detail: "Express.js — Port 5000" },
  { title: "Frontend",   status: "Active",  type: "healthy", icon: "💻",  detail: "React + Vite — Port 5173" },
  { title: "User Auth",  status: "Secure",  type: "healthy", icon: "🔐",  detail: "bcrypt hashed passwords" },
  { title: "GraphQL",    status: "Standby", type: "warning", icon: "🔷",  detail: "Apollo server available" },
  { title: "TravelBot",  status: "Active",  type: "healthy", icon: "🤖",  detail: "AI assistant running" },
];
const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Overview",  icon: "grid"    },
      { label: "Bookings",  icon: "clipboard", badge: null },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Users",    icon: "users"    },
      { label: "Calendar", icon: "calendar" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Health",   icon: "health"   },
      { label: "Settings", icon: "settings" },
    ],
  },
];
const STATUS_STYLE = {
  upcoming:  { bg: "#E6F1FB", color: "#185FA5" },
  active:    { bg: "#EAF3DE", color: "#3B6D11" },
  completed: { bg: "#F0EDEA", color: "#8A7A62" },
  healthy:   { bg: "#EAF3DE", color: "#3B6D11" },
  warning:   { bg: "#FAEEDA", color: "#854F0B" },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  grid: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.5"/></svg>,
  clipboard: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="1.5"/></svg>,
  users: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" strokeWidth="1.5"/></svg>,
  calendar: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5"/></svg>,
  health: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5"/></svg>,
  settings: <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" strokeWidth="1.5"/></svg>,
  bell: <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth="1.5"/></svg>,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const AV_COLORS = ["#C4973A","#3B6D11","#185FA5","#993C1D","#7C5CBF"];

function GuestAvatar({ name, idx }) {
  const bg   = AV_COLORS[idx % AV_COLORS.length] + "22";
  const color = AV_COLORS[idx % AV_COLORS.length];
  const initials = (name || "?").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div style={{ width: 28, height: 28, borderRadius: "50%", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function StatusBadge({ label, type }) {
  const s = STATUS_STYLE[type] || STATUS_STYLE.completed;
  return <span className="status-badge" style={{ background: s.bg, color: s.color }}>{label}</span>;
}

function getBookingStatus(b) {
  const now = new Date();
  if (new Date(b.checkin) > now)  return { label: "Upcoming",  type: "upcoming"  };
  if (new Date(b.checkout) < now) return { label: "Completed", type: "completed" };
  return { label: "Active", type: "active" };
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-name">FindMyStay</div>
        <div className="logo-sub">Admin Portal</div>
      </div>
      <nav className="sidebar-nav">
        {NAV_SECTIONS.map(section => (
          <div className="nav-section" key={section.label}>
            <span className="nav-label">{section.label}</span>
            {section.items.map(item => (
              <button
                key={item.label}
                className={`nav-item${activePage === item.label ? " active" : ""}`}
                onClick={() => setActivePage(item.label)}
              >
                {Icons[item.icon]}
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="admin-user">
          <div className="avatar-circle">SA</div>
          <div>
            <div className="avatar-name">Super Admin</div>
            <div className="avatar-email">admin@findmystay.in</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BarChart() {
  const [active, setActive] = useState(MONTHS.length - 1);
  const max = Math.max(...BOOKING_VALS);
  return (
    <div className="bar-chart">
      {MONTHS.map((m, i) => (
        <div className="bar-col" key={m}>
          <div
            className={`bar-fill${active === i ? " active" : ""}`}
            style={{ height: `${Math.round((BOOKING_VALS[i] / max) * 100)}%` }}
            title={`${BOOKING_VALS[i]} bookings`}
            onClick={() => setActive(i)}
          />
          <span className="bar-month">{m}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart() {
  const r = 45, cx = 60, cy = 60, strokeW = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg width="130" height="130" viewBox="0 0 120 120">
        {STAY_TYPES.map(({ pct, color, label }) => {
          const dash = (pct / 100) * circ;
          const el = (
            <circle key={label} cx={cx} cy={cy} r={r} fill="none" stroke={color}
              strokeWidth={strokeW} strokeDasharray={`${dash} ${circ}`}
              strokeDashoffset={-offset} transform={`rotate(-90 ${cx} ${cy})`} />
          );
          offset += dash;
          return el;
        })}
        <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="600"
          fill="#1A1510" fontFamily="Cormorant Garamond, serif">45%</text>
        <text x="60" y="70" textAnchor="middle" fontSize="10"
          fill="#8A7A62" fontFamily="DM Sans, sans-serif">City</text>
      </svg>
      <div className="donut-legend">
        {STAY_TYPES.map(({ label, pct, color }) => (
          <div className="legend-item" key={label}>
            <div className="legend-dot" style={{ background: color }} />
            <span className="legend-name">{label}</span>
            <span className="legend-pct">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page: Overview (Code 1 Dashboard + Code 2 metric cards) ─────────────────

function OverviewPage({ users, bookings, loading, error, setActivePage }) {
  const [tableFilter, setTableFilter] = useState("All");
  const TABS = ["All", "Upcoming", "Active", "Completed"];

  const totalRevenue = bookings.reduce((s, b) => s + (b.totalPrice || 0), 0);
  const upcoming     = bookings.filter(b => new Date(b.checkin) > new Date()).length;

  // Use demo stats for top cards; derive live counts if data available
  const stats = [
    { label: "Total Bookings",    value: bookings.length || "1,284",   arrow: "↑ 12%",  meta: "vs last month", up: true  },
    { label: "Revenue (INR)",     value: totalRevenue ? `₹${(totalRevenue/100000).toFixed(1)}L` : "₹48.6L", arrow: "↑ 8.4%", meta: "vs last month", up: true },
    { label: "Registered Users",  value: users.length || "3,412",      arrow: "↑ 34",   meta: "this week",    up: true  },
    { label: "Upcoming Bookings", value: upcoming || "4.7",            arrow: "↓ 0.1",  meta: "vs last month", up: false },
  ];

  const filtered = tableFilter === "All"
    ? bookings
    : bookings.filter(b => getBookingStatus(b).label === tableFilter);

  return (
    <>
      {/* Stat cards */}
      <div className="stats-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-meta">
              <span className={s.up ? "up" : "down"}>{s.arrow}</span>
              {s.meta}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Bookings by Month</div>
            <button className="card-action">View all →</button>
          </div>
          <BarChart />
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Stay Types</div></div>
          <DonutChart />
        </div>
      </div>

      {/* Recent Bookings table (live or placeholder) */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">Recent Bookings</div>
          <button className="card-action" onClick={() => setActivePage("Bookings")}>View all →</button>
        </div>
        <div className="tabs-row">
          {TABS.map(t => (
            <button key={t} className={`page-tab${tableFilter === t ? " active" : ""}`} onClick={() => setTableFilter(t)}>{t}</button>
          ))}
        </div>
        {loading && <div className="state-msg">Loading bookings…</div>}
        {error   && <div className="error-msg">{error}</div>}
        {!loading && !error && (
          bookings.length > 0 ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {["Guest","Hotel","Check-in","Check-out","Rooms","Total","Status"].map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {(filtered.length ? filtered : bookings).slice(0, 8).map((b, i) => {
                    const st = getBookingStatus(b);
                    return (
                      <tr key={b.id || i}>
                        <td>
                          <div className="guest-cell">
                            <GuestAvatar name={b.name} idx={i} />
                            {b.name || "—"}
                          </div>
                        </td>
                        <td>{b.hotelName || "—"}</td>
                        <td>{fmtDate(b.checkin)}</td>
                        <td>{fmtDate(b.checkout)}</td>
                        <td style={{ textAlign: "center" }}>{b.rooms || "—"}</td>
                        <td style={{ fontWeight: 500 }}>{b.totalPrice ? `₹${b.totalPrice.toLocaleString("en-IN")}` : "—"}</td>
                        <td><StatusBadge label={st.label} type={st.type} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="state-msg">No bookings data. Connect your backend to display live bookings.</div>
          )
        )}
      </div>

      {/* Activity + Quick Actions */}
      <div className="bottom-row">
        <div className="card">
          <div className="card-header"><div className="card-title">Recent Activity</div></div>
          <div className="activity-list">
            {ACTIVITY.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="act-dot" style={{ background: a.color }} />
                <div className="act-text">{a.text}</div>
                <div className="act-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Quick Actions</div></div>
          <div className="qa-grid">
            {QUICK_ACTIONS.map(qa => (
              <button className="qa-btn" key={qa.label}>
                <div className="qa-icon">{qa.icon}</div>
                <span className="qa-label">{qa.label}</span>
                <span className="qa-desc">{qa.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page: Users ─────────────────────────────────────────────────────────────

function UsersPage({ users, bookings, loading, error }) {
  const [search, setSearch] = useState("");
  const filtered = users.filter(u =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">Platform Users</div>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{filtered.length} user{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        {loading && <div className="state-msg">Loading users…</div>}
        {error   && <div className="error-msg">{error}</div>}
        {!loading && !error && (
          <>
            <div style={{ marginBottom: 16 }}>
              <input
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email…"
              />
            </div>
            {users.length > 0 ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>{["User","Email","Role","Joined","Bookings"].map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {filtered.length ? filtered.map((u, i) => {
                      const uBookings = bookings.filter(b => b.email === u.email || b.name === u.name).length;
                      const role = u.role || (u.email === "admin@findmystay.com" ? "Admin" : "Guest");
                      const type = role === "Admin" ? "healthy" : "completed";
                      return (
                        <tr key={u.id || i}>
                          <td>
                            <div className="guest-cell">
                              <GuestAvatar name={u.name} idx={i} />
                              <span style={{ fontWeight: 500 }}>{u.name || "—"}</span>
                            </div>
                          </td>
                          <td style={{ color: "var(--muted)" }}>{u.email || "—"}</td>
                          <td><StatusBadge label={role} type={type} /></td>
                          <td style={{ color: "var(--muted)" }}>{u.createdAt ? fmtDate(u.createdAt) : "N/A"}</td>
                          <td style={{ fontWeight: 600, color: "var(--gold)" }}>{uBookings || "—"}</td>
                        </tr>
                      );
                    }) : (
                      <tr><td colSpan="5" className="state-msg">No users match your search.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="state-msg">No user data. Connect your backend at <code>localhost:5000/api/auth/users</code></div>
            )}
          </>
        )}
      </div>
    </>
  );
}

// ─── Page: Bookings ───────────────────────────────────────────────────────────

function BookingsPage({ bookings, loading, error }) {
  const [filter, setFilter] = useState("all");

  const counts = {
    all:      bookings.length,
    upcoming: bookings.filter(b => new Date(b.checkin) > new Date()).length,
    active:   bookings.filter(b => new Date(b.checkin) <= new Date() && new Date(b.checkout) >= new Date()).length,
    past:     bookings.filter(b => new Date(b.checkout) < new Date()).length,
  };

  const filtered = filter === "all" ? bookings
    : filter === "upcoming" ? bookings.filter(b => new Date(b.checkin) > new Date())
    : filter === "active"   ? bookings.filter(b => new Date(b.checkin) <= new Date() && new Date(b.checkout) >= new Date())
    : bookings.filter(b => new Date(b.checkout) < new Date());

  return (
    <>
      <div className="tabs-row">
        {[
          { key: "all",      label: `All (${counts.all})`           },
          { key: "upcoming", label: `Upcoming (${counts.upcoming})`  },
          { key: "active",   label: `Active (${counts.active})`     },
          { key: "past",     label: `Past (${counts.past})`         },
        ].map(t => (
          <button key={t.key} className={`page-tab${filter === t.key ? " active" : ""}`} onClick={() => setFilter(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="card">
        {loading && <div className="state-msg">Loading bookings…</div>}
        {error   && <div className="error-msg">{error}</div>}
        {!loading && !error && (
          bookings.length > 0 ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {["ID","Guest","Hotel","Check-in","Check-out","Rooms","Guests","Total","Status"].map(h => <th key={h}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length ? filtered.map((b, i) => {
                    const st = getBookingStatus(b);
                    return (
                      <tr key={b.id || i}>
                        <td><span className="booking-id">#{b.id}</span></td>
                        <td>
                          <div className="guest-cell">
                            <GuestAvatar name={b.name} idx={i} />
                            <div>
                              <div style={{ fontWeight: 500 }}>{b.name || "—"}</div>
                              <div style={{ fontSize: 11, color: "var(--muted)" }}>{b.email || ""}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontWeight: 500 }}>{b.hotelName || "—"}</td>
                        <td style={{ color: "var(--muted)" }}>{fmtDate(b.checkin)}</td>
                        <td style={{ color: "var(--muted)" }}>{fmtDate(b.checkout)}</td>
                        <td style={{ textAlign: "center" }}>{b.rooms}</td>
                        <td style={{ textAlign: "center", color: "var(--muted)" }}>{b.guests || "—"}</td>
                        <td style={{ fontWeight: 600 }}>{b.totalPrice ? `₹${b.totalPrice.toLocaleString("en-IN")}` : "—"}</td>
                        <td><StatusBadge label={st.label} type={st.type} /></td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="9" className="state-msg">No bookings found for this filter.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="state-msg">No booking data. Connect your backend at <code>localhost:5000/api/admin/bookings</code></div>
          )
        )}
      </div>
    </>
  );
}

// ─── Page: Health ─────────────────────────────────────────────────────────────

function HealthPage() {
  return (
    <>
      <div className="health-grid">
        {HEALTH_ITEMS.map(item => (
          <div className="health-card" key={item.title}>
            <div className="health-icon">{item.icon}</div>
            <div className="health-title">{item.title}</div>
            <StatusBadge label={item.status} type={item.type} />
            <div className="health-detail">{item.detail}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Uptime — Last 30 Days</div></div>
        <div className="uptime-bar">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="uptime-block"
              style={{ background: i === 14 ? "rgba(153,60,29,0.55)" : "rgba(59,109,17,0.65)" }}
              title={i === 14 ? "Incident" : "Healthy"}
            />
          ))}
        </div>
        <div className="uptime-meta">
          <span style={{ fontSize: 11, color: "var(--muted)" }}>30 days ago</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#3B6D11" }}>96.7% uptime</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Today</span>
        </div>
      </div>
    </>
  );
}

// ─── Page: Settings placeholder ───────────────────────────────────────────────

function PlaceholderPage({ name }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", color: "var(--muted)", fontFamily: "'Cormorant Garamond', serif" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
      <div style={{ fontSize: 28, color: "var(--dark)" }}>{name}</div>
      <div style={{ fontSize: 14, marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>This section is under construction</div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard({ onBack }) {
  const [activePage, setActivePage] = useState("Overview");
  const [users, setUsers]           = useState([]);
  const [bookings, setBookings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [clock, setClock]           = useState("");

  // Live clock
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch data from backend (Code 2 logic, verbatim)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [usersRes, bookingsRes] = await Promise.all([
          fetch("http://localhost:5000/api/auth/users"),
          fetch("http://localhost:5000/api/admin/bookings"),
        ]);
        if (!usersRes.ok) throw new Error(`Users HTTP ${usersRes.status}`);
        if (!bookingsRes.ok) throw new Error(`Bookings HTTP ${bookingsRes.status}`);
        setUsers((await usersRes.json()) || []);
        setBookings((await bookingsRes.json()) || []);
      } catch (err) {
        console.error("Admin fetch error", err);
        setError("Backend unavailable — showing static demo data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return <OverviewPage users={users} bookings={bookings} loading={loading} error={error} setActivePage={setActivePage} />;
      case "Bookings":
        return <BookingsPage bookings={bookings} loading={loading} error={error} />;
      case "Users":
        return <UsersPage users={users} bookings={bookings} loading={loading} error={error} />;
      case "Health":
        return <HealthPage />;
      default:
        return <PlaceholderPage name={activePage} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="fms-admin">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <div className="main">
          <div className="topbar">
            <div>
              <div className="page-title">{activePage}</div>
              <div className="page-date">{today} &nbsp;·&nbsp; {clock}</div>
            </div>
            <div className="topbar-right">
              <button className="topbar-btn">
                {Icons.bell}
                Alerts
                <div className="notif-dot" />
              </button>
              {onBack && (
                <button className="topbar-btn" onClick={onBack}>← Back to Home</button>
              )}
              <button className="topbar-btn btn-gold">+ New Booking</button>
            </div>
          </div>

          <div className="content">
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}