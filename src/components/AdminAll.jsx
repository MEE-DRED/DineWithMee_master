import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ─── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  sidebar: "#1A3728",
  sidebarHover: "#22452F",
  sidebarActive: "#2D5840",
  accent: "#E07A4F",
  teal: "#2DB89A",
  bg: "#EEE9DF",
  card: "#FFFFFF",
  dark: "#1A1A1A",
  mid: "#4B5563",
  muted: "#9CA3AF",
  border: "#E2DDD6",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#6366F1",
};

// ─── Nav Config (8 pages, Meal Management inserted at position 4) ────────────
const NAV = [
  { id: "overview",    label: "System Overview",    icon: "▦"  },
  { id: "users",       label: "User Directory",      icon: "👥" },
  { id: "providers",   label: "Provider Mgmt",       icon: "🧑‍🍳" },
  { id: "meals",       label: "Meal Management",     icon: "🥘" },
  { id: "ingredients", label: "Ingredients Database", icon: "🌿" },
  { id: "moderation",  label: "Content Moderation",  icon: "🚩" },
  { id: "components",  label: "Components Library",  icon: "🧩" },
  { id: "campaigns",   label: "Campaign Center",     icon: "📢" },
  { id: "security",    label: "Security & Audit",    icon: "🛡" },
  { id: "settings",    label: "General Settings",    icon: "⚙️" },
];

// ─── SVG Icon primitive (used by Meal Management section) ───────────────────
const Ic = ({ d, size = 16, sw = 1.8, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const P = {
  plus:   ["M12 5v14", "M5 12h14"],
  list:   ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m17 8-5-5-5 5", "M12 3v12"],
  eye:    ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  trash:  ["M3 6h18", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"],
  x:      ["M18 6 6 18", "M6 6l12 12"],
  check:  ["M20 6 9 17l-5-5"],
  fork:   ["M8 3v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V3", "M10 8v13", "M16 3l-1 7h2l-1 7"],
  search: ["M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M21 21l-4.35-4.35"],
  edit:   ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  refresh:["M23 4v6h-6", "M1 20v-6h6", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"],
  menu:   ["M3 12h18", "M3 6h18", "M3 18h18"],
};

// ─── Dine with Mee API config ────────────────────────────────────────────────
// Live backend — see https://new-dine-with-mee-backend-z7it.onrender.com/api-docs
const API_BASE        = "https://new-dine-with-mee-backend-z7it.onrender.com/api/v1";
const MEALS_ENDPOINT  = `${API_BASE}/meals`;

// Admin/Nutritionist-only routes require a Bearer token. Adjust the localStorage
// key below to match wherever your login flow stores the auth token.
const AUTH_TOKEN_KEY = "authToken";
function getAuthToken() {
  try { return localStorage.getItem(AUTH_TOKEN_KEY) || ""; } catch { return ""; }
}

// Axios instance for the Dine with Mee API — attaches the Bearer token (when
// present) to every outgoing request via a request interceptor.
const api = axios.create({ baseURL: API_BASE });
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Generic request wrapper: adds auth header, parses JSON, throws readable errors.
async function apiRequest(path, { method = "GET", body, isFormData = false } = {}) {
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";

  try {
    const res = await api.request({
      url: path,
      method,
      headers,
      data: body,
    });
    return res.data ?? null;
  } catch (err) {
    const data = err.response?.data;
    const status = err.response?.status;
    const msg = data?.message || data?.error || (status ? `Request failed (${status})` : err.message);
    throw new Error(msg);
  }
}

// Normalizes whatever shape the backend wraps the meal list/object in
// (raw array, { meals }, { data }, { data: { meals } }, single object, etc).
function extractMealList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.meals)) return data.meals;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.meals)) return data.data.meals;
  return [];
}
function extractMeal(data) {
  return data?.meal || data?.data?.meal || data?.data || data || null;
}

// ─── Ingredients API normalizers ─────────────────────────────────────────────
// Same defensive-unwrap approach as meals: the backend's wrapper shape can
// vary by route (raw array, { ingredients }, { data }, { data: { ingredients } }).
function extractIngredientList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.ingredients)) return data.ingredients;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.ingredients)) return data.data.ingredients;
  return [];
}
function extractIngredient(data) {
  return data?.ingredient || data?.data?.ingredient || data?.data || data || null;
}
// Normalizes a raw ingredient record into the shape the UI reads from, so the
// page never breaks regardless of which field names the live API returns.
function normalizeIngredient(ing) {
  const id = ing._id || ing.id;
  return {
    ...ing,
    _id: id,
    name: ing.name || "Unnamed Ingredient",
    category: ing.category || "Other",
    origin: ing.origin || ing.region || "",
    calories: ing.calories ?? ing.kcal ?? "",
    protein: ing.protein ?? "",
    carbs: ing.carbs ?? ing.carbohydrates ?? "",
    fats: ing.fats ?? ing.fat ?? "",
    fiber: ing.fiber ?? "",
    healthSuitability: Array.isArray(ing.healthSuitability)
      ? ing.healthSuitability
      : Array.isArray(ing.suitability)
        ? ing.suitability
        : typeof ing.healthSuitability === "string"
          ? ing.healthSuitability.split(",").map(s => s.trim()).filter(Boolean)
          : [],
    allergens: Array.isArray(ing.allergens) ? ing.allergens : (ing.allergens || "").toString().split(",").map(s => s.trim()).filter(Boolean),
    description: ing.description || ing.notes || "",
  };
}

// ─── Admin API normalizers ───────────────────────────────────────────────────
// The exact wrapper shape the backend uses can vary by route (raw array,
// { users }, { data }, { data: { users } }, etc.) — these helpers unwrap
// whichever shape comes back so the UI never breaks on a shape mismatch.
function extractAdminUsers(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.users)) return data.data.users;
  return [];
}
function extractAdminUser(data) {
  return data?.user || data?.data?.user || data?.data || data || null;
}
function extractStatsObj(data) {
  return data?.stats || data?.data?.stats || data?.data || data || {};
}
function extractContentList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.content)) return data.data.content;
  return [];
}
// Normalizes a raw admin-user record into the shape the UI reads from.
function normalizeAdminUser(u) {
  const id = u._id || u.id || u.userId;
  return {
    ...u,
    _id: id,
    name: u.name || u.fullName || [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email || "Unnamed User",
    email: u.email || "",
    role: u.role || u.userType || "Customer",
    isActive: u.isActive ?? u.active ?? (u.status ? u.status === "active" : true),
    isVerified: u.isVerified ?? u.verified ?? false,
    joined: u.joined || u.createdAt || u.dateJoined || "",
    rating: u.rating ?? u.avgRating ?? null,
  };
}
// Normalizes a raw content-moderation record into the shape the UI reads from.
function normalizeContentItem(c) {
  const id = c._id || c.id || c.contentId;
  return {
    ...c,
    _id: id,
    title: c.title || c.name || c.mealName || `Content #${String(id).slice(-6)}`,
    type: c.type || c.contentType || "Post",
    author: c.author || c.submittedBy?.name || c.user?.name || c.ownerName || "Unknown",
    createdAt: c.createdAt || c.submittedAt || c.date || "",
    description: c.description || c.body || c.text || "",
  };
}

// ─── Shared toast system (used by pages that perform admin write actions) ───
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);
  const addToast = (msg, type = "success") => {
    const id = ++seq.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  };
  const dismissToast = id => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, addToast, dismissToast };
}

function ToastStack({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div
      className="left-4 right-4 sm:left-auto sm:right-5 sm:max-w-[320px]"
      style={{ position: "fixed", bottom: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}
    >
      {toasts.map(t => (
        <div key={t.id} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", borderRadius: 10, fontWeight: 600, fontSize: 12,
          pointerEvents: "auto", boxShadow: "0 4px 20px rgba(0,0,0,.2)", gap: 12,
          background: t.type === "error" ? "#DC2626" : t.type === "info" ? C.sidebar : "#065F46",
          color: "#fff", border: t.type === "info" ? "1px solid rgba(255,255,255,.1)" : "none",
        }}>
          <span>{t.type === "success" ? "✓ " : t.type === "error" ? "✗ " : "ℹ "}{t.msg}</span>
          <button onClick={() => onDismiss(t.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", padding: 0 }}>
            <Ic d={P.x} size={13} color="rgba(255,255,255,.7)" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Shared UI Primitives ────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.card, borderRadius: 14,
      padding: "18px 20px", border: `1px solid ${C.border}`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)", ...style,
    }}>
      {children}
    </div>
  );
}

function Badge({ text, type = "default" }) {
  const map = {
    default: { bg: "#F3F4F6", color: C.mid },
    success: { bg: "#D1FAE5", color: "#059669" },
    warning: { bg: "#FEF3C7", color: "#B45309" },
    danger:  { bg: "#FEE2E2", color: "#DC2626" },
    info:    { bg: "#E0E7FF", color: "#4338CA" },
    purple:  { bg: "#EDE9FE", color: "#7C3AED" },
  };
  const s = map[type] || map.default;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "2px 9px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>{text}</span>
  );
}

function KPICard({ label, value, delta, color = C.teal }) {
  return (
    <Card>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      {delta && <div style={{ fontSize: 11, color: "#22C55E", marginTop: 6 }}>↑ {delta}</div>}
    </Card>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: C.dark }}>{children}</div>;
}

function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3" style={{ marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 21, fontWeight: 800, color: C.dark, margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.card, fontSize: 12, cursor: "pointer", color: C.mid }}>Export</button>
        {action && (
          <button style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: C.accent, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 38, height: 20, borderRadius: 10,
      background: value ? C.teal : C.border,
      position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0,
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2, left: value ? 20 : 2,
        transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.25)",
      }} />
    </div>
  );
}

function Avatar({ name, color = C.teal, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: color, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.4, fontWeight: 700, color: "#fff",
    }}>{name[0]}</div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            {headers.map(h => (
              <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: C.muted, fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function TR({ children }) {
  return <tr style={{ borderBottom: `1px solid ${C.border}` }}>{children}</tr>;
}

function TD({ children, bold, color, mono }) {
  return (
    <td style={{
      padding: "10px 12px", fontSize: 12,
      fontWeight: bold ? 600 : 400,
      color: color || C.dark,
      fontFamily: mono ? "monospace" : "inherit",
    }}>{children}</td>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
// Off-canvas drawer on mobile/tablet (< lg), permanently docked from lg (1024px) up.
function Sidebar({ active, setActive, mobileOpen, onClose }) {
  return (
    <>
      {/* Backdrop — only rendered/visible while the mobile drawer is open */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-[210px] flex flex-col
          transition-transform duration-200 ease-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: C.sidebar, color: "#fff" }}
      >
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, background: C.accent,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
              }}>🍽</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>Dine with Mee</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 1 }}>Admin Portal</div>
              </div>
            </div>
            {/* Close button — mobile/tablet only */}
            <button onClick={onClose} className="lg:hidden" style={{ background: "none", border: "none", color: "rgba(255,255,255,.6)", cursor: "pointer", padding: 4 }}>
              <Ic d={P.x} size={16} />
            </button>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", padding: "8px 12px 4px", textTransform: "uppercase", letterSpacing: ".08em" }}>Main Menu</div>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); onClose?.(); }}
              style={{
                display: "flex", alignItems: "center", gap: 9,
                width: "100%", padding: "8px 12px", borderRadius: 8,
                border: "none", cursor: "pointer", textAlign: "left", marginBottom: 2,
                background: active === item.id ? C.sidebarActive : "transparent",
                color: active === item.id ? "#fff" : "rgba(255,255,255,.55)",
                fontSize: 12, fontWeight: active === item.id ? 600 : 400,
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
              {item.label}
              {active === item.id && (
                <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: 2, background: C.accent }} />
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", background: C.accent,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800,
            }}>A</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Super Admin</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>admin@dinewithmee.com</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 1 — SYSTEM OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════
const growthData = [
  { month: "Jan", users: 4200,  revenue: 31000 },
  { month: "Feb", users: 5100,  revenue: 38000 },
  { month: "Mar", users: 6300,  revenue: 44000 },
  { month: "Apr", users: 7800,  revenue: 52000 },
  { month: "May", users: 9100,  revenue: 61000 },
  { month: "Jun", users: 11400, revenue: 74000 },
  { month: "Jul", users: 14200, revenue: 84200 },
];
const activityLog = [
  { user: "Chef Maria R.",  action: "Profile updated",               time: "2 min ago",  status: "success" },
  { user: "Admin Kim S.",   action: "New provider approved",         time: "15 min ago", status: "success" },
  { user: "System",         action: "Automated backup completed",    time: "1 hr ago",   status: "info"    },
  { user: "Chef James O.",  action: "Failed login attempt (3×)",    time: "2 hr ago",   status: "danger"  },
  { user: "Admin Lee P.",   action: "Role permissions changed",      time: "3 hr ago",   status: "warning" },
  { user: "System",         action: "Health check passed",           time: "4 hr ago",   status: "success" },
];

// ── GET /api/v1/admin/dashboard/stats + GET /api/v1/admin/system/health ─────
function Overview() {
  const [stats, setStats]       = useState(null);
  const [health, setHealth]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [statsRes, healthRes] = await Promise.allSettled([
          apiRequest("/admin/dashboard/stats"),
          apiRequest("/admin/system/health"),
        ]);
        if (cancelled) return;
        if (statsRes.status === "fulfilled") setStats(extractStatsObj(statsRes.value));
        else setError(statsRes.reason?.message || "Could not reach admin stats API.");
        if (healthRes.status === "fulfilled") setHealth(extractStatsObj(healthRes.value));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Falls back to demo figures whenever a field isn't present in the live response,
  // so the dashboard never looks broken while the backend catches up.
  const kpi = {
    activeUsers: stats?.activeUsers ?? stats?.totalUsers ?? "14.2k",
    providers:   stats?.totalProviders ?? stats?.providers ?? "1,482",
    ordersToday: stats?.ordersToday ?? stats?.todayOrders ?? "3,291",
    revenueMTD:  stats?.revenueMTD ?? stats?.monthlyRevenue ?? "$84.2k",
  };
  const healthStatus = health?.status || (health ? "healthy" : null);

  return (
    <div>
      <PageHeader title="System Overview" subtitle="Live platform performance at a glance" action="+ Generate Report" />
      {error && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: 12, marginBottom: 14 }}>
          {error} — showing cached figures below.
        </div>
      )}
      {healthStatus && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14, padding: "5px 12px", borderRadius: 20, background: healthStatus === "healthy" || healthStatus === "ok" ? "#D1FAE5" : "#FEF3C7", fontSize: 11, fontWeight: 700, color: healthStatus === "healthy" || healthStatus === "ok" ? "#059669" : "#B45309" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor" }} />
          System status: {healthStatus}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 18 }}>
        <KPICard label="Active Users"  value={loading ? "…" : kpi.activeUsers}  delta="+8.3% vs last month"  color={C.teal}   />
        <KPICard label="Providers"     value={loading ? "…" : kpi.providers}    delta="+3.1% vs last month"  color={C.info}   />
        <KPICard label="Orders Today"  value={loading ? "…" : kpi.ordersToday}  delta="+12.4% vs yesterday"  color={C.accent} />
        <KPICard label="Revenue MTD"   value={loading ? "…" : kpi.revenueMTD}   delta="+5.7% vs last month"  color="#EC4899"  />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]" style={{ gap: 14, marginBottom: 18 }}>
        <Card>
          <SectionTitle>Platform Growth</SectionTitle>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={growthData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gTeal"   x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor={C.teal}   stopOpacity={0.22}/><stop offset="95%" stopColor={C.teal}   stopOpacity={0}/></linearGradient>
                <linearGradient id="gAccent" x1="0" y1="0" x2="0" y2="1"><stop offset="5%"  stopColor={C.accent} stopOpacity={0.18}/><stop offset="95%" stopColor={C.accent} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="users"   stroke={C.teal}   fill="url(#gTeal)"   strokeWidth={2} name="Users"   />
              <Area type="monotone" dataKey="revenue" stroke={C.accent} fill="url(#gAccent)" strokeWidth={2} name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <SectionTitle>New Provider Onboarding</SectionTitle>
          <div style={{ width: 110, height: 110, borderRadius: "50%", background: `conic-gradient(${C.teal} 72%, ${C.border} 0)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <div style={{ width: 82, height: 82, borderRadius: "50%", background: C.card, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: C.teal }}>72%</div>
          </div>
          <div style={{ fontSize: 13, color: C.mid, textAlign: "center" }}>Completion Rate</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.dark, marginTop: 4 }}>148</div>
          <div style={{ fontSize: 11, color: C.muted }}>providers this month</div>
        </Card>
      </div>
      <Card>
        <SectionTitle>System Activity Log</SectionTitle>
        <Table
          headers={["User", "Action", "Time", "Status"]}
          rows={activityLog.map((row, i) => (
            <TR key={i}>
              <TD bold>{row.user}</TD>
              <TD color={C.mid}>{row.action}</TD>
              <TD color={C.muted}>{row.time}</TD>
              <td style={{ padding: "10px 12px" }}><Badge text={row.status} type={row.status} /></td>
            </TR>
          ))}
        />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 2 — USER DIRECTORY  (GET/PUT /api/v1/admin/users …)
// ═══════════════════════════════════════════════════════════════════════════
const avatarColors = [C.teal, C.accent, C.info, "#EC4899", "#F59E0B", "#8B5CF6", "#06B6D4"];
const ROLE_FILTERS   = ["all", "Chef", "Nutritionist", "Customer", "Admin"];
const STATUS_FILTERS = ["all", "active", "inactive"];

function UserDirectory() {
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch]       = useState("");
  const [roleFilter, setRoleFilter]     = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [busyId, setBusyId]       = useState(null);
  const { toasts, addToast, dismissToast } = useToasts();

  // ── GET /api/v1/admin/users?search=&role=&status= ─────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const params = new URLSearchParams();
      if (search.trim())            params.set("search", search.trim());
      if (roleFilter !== "all")     params.set("role", roleFilter);
      if (statusFilter !== "all")   params.set("status", statusFilter);
      const qs = params.toString();
      const data = await apiRequest(`/admin/users${qs ? `?${qs}` : ""}`);
      setUsers(extractAdminUsers(data).map(normalizeAdminUser));
    } catch (err) {
      setLoadError(err.message || "Could not reach the admin users API.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchUsers(); /* eslint-disable-line */ }, []);
  useEffect(() => { const t = setTimeout(fetchUsers, 350); return () => clearTimeout(t); /* eslint-disable-line */ }, [search, roleFilter, statusFilter]);

  // ── PUT /api/v1/admin/users/{userId}/status ────────────────────────────────
  const toggleStatus = async u => {
    setBusyId(u._id);
    const nextActive = !u.isActive;
    try {
      await apiRequest(`/admin/users/${u._id}/status`, { method: "PUT", body: { isActive: nextActive } });
      setUsers(prev => prev.map(x => (x._id === u._id ? { ...x, isActive: nextActive } : x)));
      addToast(`${u.name} ${nextActive ? "activated" : "deactivated"}.`, "success");
    } catch (err) {
      addToast(err.message || "Status update failed.", "error");
    } finally {
      setBusyId(null);
    }
  };

  // ── PUT /api/v1/admin/users/{userId}/verify ────────────────────────────────
  const toggleVerify = async u => {
    setBusyId(u._id);
    const nextVerified = !u.isVerified;
    try {
      await apiRequest(`/admin/users/${u._id}/verify`, { method: "PUT", body: { isVerified: nextVerified } });
      setUsers(prev => prev.map(x => (x._id === u._id ? { ...x, isVerified: nextVerified } : x)));
      addToast(`${u.name} ${nextVerified ? "verified" : "unverified"}.`, "success");
    } catch (err) {
      addToast(err.message || "Verification update failed.", "error");
    } finally {
      setBusyId(null);
    }
  };

  const total     = users.length;
  const activeCt  = users.filter(u => u.isActive).length;
  const chefCt    = users.filter(u => u.role === "Chef" || u.role === "Nutritionist").length;
  const customerCt = users.filter(u => u.role === "Customer").length;

  return (
    <div style={{ position: "relative" }}>
      <PageHeader title="User Directory" subtitle="Manage all chefs, nutritionists, customers and admins" action="↻ Refresh" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 18 }}>
        <KPICard label="Total Users"   value={loading ? "…" : total.toLocaleString()}    color={C.teal}   />
        <KPICard label="Active Users"  value={loading ? "…" : activeCt.toLocaleString()} color={C.info}   />
        <KPICard label="Chefs/Nutris"  value={loading ? "…" : chefCt.toLocaleString()}   color={C.accent} />
        <KPICard label="Customers"     value={loading ? "…" : customerCt.toLocaleString()} color="#EC4899" />
      </div>
      <Card>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2" style={{ marginBottom: 14 }}>
          <SectionTitle>All Users</SectionTitle>
          <input placeholder="🔍 Search by name or email…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-[220px]"
            style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div className="flex flex-wrap" style={{ gap: 14, marginBottom: 14 }}>
          <div className="flex flex-wrap items-center" style={{ gap: 6 }}>
            <span style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", fontWeight: 700, marginRight: 2 }}>Role</span>
            {ROLE_FILTERS.map(r => (
              <button key={r} onClick={() => setRoleFilter(r)} style={{ padding: "4px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: roleFilter === r ? C.sidebar : C.border, color: roleFilter === r ? "#fff" : C.mid }}>{r}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center" style={{ gap: 6 }}>
            <span style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", fontWeight: 700, marginRight: 2 }}>Status</span>
            {STATUS_FILTERS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "4px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: statusFilter === s ? C.sidebar : C.border, color: statusFilter === s ? "#fff" : C.mid }}>{s}</button>
            ))}
          </div>
        </div>

        {loadError && (
          <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: 12, marginBottom: 14 }}>
            {loadError}
          </div>
        )}

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", fontSize: 12, color: C.muted }}>Loading users…</div>
        ) : users.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", fontSize: 12, color: C.muted }}>No users match these filters.</div>
        ) : (
          <Table
            headers={["Name", "Role", "Status", "Verified", "Joined", "Actions"]}
            rows={users.map((u, i) => (
              <TR key={u._id}>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Avatar name={u.name} color={avatarColors[i % avatarColors.length]} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{u.name}</div>
                      {u.email && <div style={{ fontSize: 10, color: C.muted }}>{u.email}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ padding: "10px 12px" }}><Badge text={u.role} type={u.role === "Chef" || u.role === "Nutritionist" ? "info" : "default"} /></td>
                <td style={{ padding: "10px 12px" }}><Badge text={u.isActive ? "active" : "inactive"} type={u.isActive ? "success" : "danger"} /></td>
                <td style={{ padding: "10px 12px" }}><Badge text={u.isVerified ? "verified" : "unverified"} type={u.isVerified ? "success" : "warning"} /></td>
                <TD color={C.muted}>{u.joined ? new Date(u.joined).toLocaleDateString() : "—"}</TD>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => toggleStatus(u)} disabled={busyId === u._id} style={{ padding: "4px 9px", borderRadius: 6, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: busyId === u._id ? "wait" : "pointer", color: u.isActive ? C.danger : "#059669", fontWeight: 700 }}>
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => toggleVerify(u)} disabled={busyId === u._id} style={{ padding: "4px 9px", borderRadius: 6, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: busyId === u._id ? "wait" : "pointer", color: u.isVerified ? C.mid : C.teal, fontWeight: 700 }}>
                      {u.isVerified ? "Unverify" : "Verify"}
                    </button>
                  </div>
                </td>
              </TR>
            ))}
          />
        )}
      </Card>
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 3 — PROVIDER MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════
const providers = [
  { name: "Maria Rodriguez", cuisine: "Italian",     orders: 342, rating: 4.9, revenue: "$4,820", status: "active"  },
  { name: "James Okafor",    cuisine: "West African", orders: 218, rating: 4.7, revenue: "$3,100", status: "active"  },
  { name: "Yuki Tanaka",     cuisine: "Japanese",    orders: 198, rating: 4.8, revenue: "$2,940", status: "active"  },
  { name: "Sofia Alves",     cuisine: "Brazilian",   orders: 156, rating: 4.5, revenue: "$2,280", status: "pending" },
  { name: "Carlos Torres",   cuisine: "Mexican",     orders: 289, rating: 4.6, revenue: "$3,890", status: "active"  },
];
const perfData = [
  { week: "Wk 1", orders: 240, revenue: 3200 },
  { week: "Wk 2", orders: 310, revenue: 4100 },
  { week: "Wk 3", orders: 280, revenue: 3750 },
  { week: "Wk 4", orders: 360, revenue: 4800 },
];
const aiInsights = [
  { msg: "Maria's Italian menu is trending +22% this week",   type: "success" },
  { msg: "3 providers have been inactive for 7+ days",        type: "warning" },
  { msg: "West African cuisine demand up 18% this month",     type: "info"    },
  { msg: "Sofia's onboarding is 80% complete — send nudge?", type: "warning" },
  { msg: "Yuki ranked #1 in customer satisfaction this week", type: "success" },
];

function ProviderManagement() {
  return (
    <div>
      <PageHeader title="Provider Management" subtitle="Oversee chefs, performance and onboarding pipeline" action="+ Add Provider" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 18 }}>
        <KPICard label="Total Providers" value="1,482" delta="+3.1%" color={C.teal}   />
        <KPICard label="Active Today"    value="891"   delta="+6.4%" color={C.info}   />
        <KPICard label="Pending Review"  value="42"                  color={C.accent} />
        <KPICard label="Avg Rating"      value="4.7★"               color="#F59E0B"  />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]" style={{ gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionTitle>Provider Performance Trends</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={perfData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} />
                <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="orders"  fill={C.teal}   radius={[4,4,0,0]} name="Orders"  />
                <Bar dataKey="revenue" fill={C.accent} radius={[4,4,0,0]} name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <SectionTitle>Top Providers</SectionTitle>
            <Table
              headers={["Chef", "Cuisine", "Orders", "Rating", "Revenue", "Status"]}
              rows={providers.map((p, i) => (
                <TR key={i}>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Avatar name={p.name} color={avatarColors[i]} />
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>
                  <TD color={C.mid}>{p.cuisine}</TD>
                  <TD bold>{p.orders}</TD>
                  <TD color="#F59E0B">⭐ {p.rating}</TD>
                  <TD bold color={C.teal}>{p.revenue}</TD>
                  <td style={{ padding: "10px 12px" }}><Badge text={p.status} type={p.status === "active" ? "success" : "warning"} /></td>
                </TR>
              ))}
            />
          </Card>
        </div>
        <Card>
          <SectionTitle>🤖 AI Chef Assistant</SectionTitle>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>Real-time insights powered by AI</div>
          {aiInsights.map((item, i) => (
            <div key={i} style={{ padding: "9px 11px", borderRadius: 8, marginBottom: 8, fontSize: 12, lineHeight: 1.4, background: item.type === "success" ? "#D1FAE5" : item.type === "warning" ? "#FEF3C7" : "#E0E7FF", color: item.type === "success" ? "#065F46" : item.type === "warning" ? "#92400E" : "#3730A3" }}>{item.msg}</div>
          ))}
          <button style={{ width: "100%", marginTop: 4, padding: 10, borderRadius: 8, border: "none", background: C.sidebar, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Ask AI Assistant →</button>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 4 — MEAL MANAGEMENT  (integrated from AdminMealManager.jsx)
// ═══════════════════════════════════════════════════════════════════════════
const EMPTY_FORM = { name: "", category: "Breakfast", kcal: "", protein: "", carbs: "", fats: "", ingredients: "", instructions: "", tags: "", imageFile: null };
const CATEGORIES  = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Salad", "Soup", "Smoothie", "Beverage", "Other"];
const MACROCOLS   = [
  { key: "kcal",    label: "Calories (kcal)", accent: "#C2410C", border: "#FED7AA", bg: "#FFF7ED" },
  { key: "protein", label: "Protein (g)",     accent: "#047857", border: "#A7F3D0", bg: "#ECFDF5" },
  { key: "carbs",   label: "Carbs (g)",       accent: "#1D4ED8", border: "#BFDBFE", bg: "#EFF6FF" },
  { key: "fats",    label: "Fat (g)",         accent: "#7E22CE", border: "#E9D5FF", bg: "#FAF5FF" },
];

// Meal card (posted meals grid)
function MealCard({ meal, onView, onEdit, onDelete }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
      padding: 16, display: "flex", flexDirection: "column", gap: 10,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)", position: "relative",
    }}>
      {meal.mocked && (
        <span style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", padding: "2px 6px", borderRadius: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Local</span>
      )}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>{meal.category}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, lineHeight: 1.3 }}>{meal.name}</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {meal.kcal    && <span style={{ fontSize: 10, fontWeight: 600, background: "#FFF7ED", color: "#C2410C", padding: "2px 7px", borderRadius: 20 }}>{meal.kcal} kcal</span>}
        {meal.protein && <span style={{ fontSize: 10, fontWeight: 600, background: "#ECFDF5", color: "#047857", padding: "2px 7px", borderRadius: 20 }}>P: {meal.protein}g</span>}
        {meal.carbs   && <span style={{ fontSize: 10, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8", padding: "2px 7px", borderRadius: 20 }}>C: {meal.carbs}g</span>}
        {meal.fats    && <span style={{ fontSize: 10, fontWeight: 600, background: "#FAF5FF", color: "#7E22CE", padding: "2px 7px", borderRadius: 20 }}>F: {meal.fats}g</span>}
      </div>
      {meal.tags && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {(Array.isArray(meal.tags) ? meal.tags : meal.tags.split(",").map(t => t.trim())).filter(Boolean).slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 10, background: "#D1FAE5", color: "#065F46", padding: "2px 6px", borderRadius: 20, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => onView(meal)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.mid, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <Ic d={P.eye} size={13} /> View
        </button>
        <button onClick={() => onEdit(meal)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.mid }}>
          <Ic d={P.edit} size={13} />
        </button>
        <button onClick={() => onDelete(meal)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.danger }}>
          <Ic d={P.trash} size={13} color={C.danger} />
        </button>
      </div>
    </div>
  );
}

// Meal detail modal
function MealDetailModal({ meal, onClose }) {
  const ingredients = Array.isArray(meal.ingredients) ? meal.ingredients : (meal.ingredients || "").split(",").map(s => s.trim()).filter(Boolean);
  const instructions = Array.isArray(meal.instructions) ? meal.instructions : (meal.instructions || "").split("\n").map(s => s.trim()).filter(Boolean);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 500, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", position: "relative" }}>
        <div style={{ padding: "20px 22px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontSize: 10, background: C.bg, color: C.muted, fontWeight: 700, padding: "2px 8px", borderRadius: 5, textTransform: "uppercase" }}>{meal.category}</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginTop: 6 }}>{meal.name}</div>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.muted }}>
            <Ic d={P.x} size={14} />
          </button>
        </div>
        <div style={{ padding: "18px 22px" }}>
          {/* Macro grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 10, marginBottom: 18 }}>
            {MACROCOLS.map(col => (
              <div key={col.key} style={{ textAlign: "center", padding: "10px 6px", borderRadius: 10, background: col.bg, border: `1px solid ${col.border}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: col.accent }}>{meal[col.key] || "—"}</div>
                <div style={{ fontSize: 10, color: col.accent, marginTop: 2, fontWeight: 500 }}>{col.label.split(" ")[0]}</div>
              </div>
            ))}
          </div>
          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.muted, marginBottom: 8 }}>Ingredients</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {ingredients.map((ing, i) => <li key={i} style={{ fontSize: 12, color: C.mid, marginBottom: 4 }}>{ing}</li>)}
              </ul>
            </div>
          )}
          {/* Instructions */}
          {instructions.length > 0 && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.muted, marginBottom: 8 }}>Instructions</div>
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {instructions.map((ins, i) => <li key={i} style={{ fontSize: 12, color: C.mid, marginBottom: 6, lineHeight: 1.5 }}>{ins}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Meal Management page
function MealManagement() {
  const [tab, setTab]               = useState("list");        // "form" | "list"
  const [formData, setFormData]     = useState(EMPTY_FORM);
  const [postedMeals, setPostedMeals] = useState([]);           // server + local-fallback meals
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [loadError, setLoadError]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);         // meal object being edited, or null = creating
  const [viewMeal, setViewMeal]     = useState(null);
  const [toasts, setToasts]         = useState([]);
  const [query, setQuery]           = useState("");
  const [searching, setSearching]   = useState(false);
  const toastSeq                    = useRef(0);
  const fileInputRef                = useRef(null);

  // Toast helpers
  const addToast = (msg, type = "success") => {
    const id = ++toastSeq.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  };

  // ── GET /api/v1/meals — load all meals on mount ─────────────────────────
  const fetchMeals = async () => {
    setLoadingMeals(true);
    setLoadError("");
    try {
      const data = await apiRequest("/meals");
      setPostedMeals(extractMealList(data).map(m => ({ ...m, _localId: m._id || m.id })));
    } catch (err) {
      setLoadError(err.message || "Could not reach the meals API.");
    } finally {
      setLoadingMeals(false);
    }
  };
  useEffect(() => { fetchMeals(); }, []); // load meals from the server once on mount

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    if (e.target.files?.[0]) setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const startCreate = () => {
    setEditingMeal(null);
    setFormData(EMPTY_FORM);
    setTab("form");
  };

  const startEdit = meal => {
    setEditingMeal(meal);
    setFormData({
      name: meal.name || "",
      category: meal.category || "Breakfast",
      kcal: meal.kcal ?? "",
      protein: meal.protein ?? "",
      carbs: meal.carbs ?? "",
      fats: meal.fats ?? "",
      ingredients: Array.isArray(meal.ingredients) ? meal.ingredients.join(", ") : (meal.ingredients || ""),
      instructions: Array.isArray(meal.instructions) ? meal.instructions.join("\n") : (meal.instructions || ""),
      tags: Array.isArray(meal.tags) ? meal.tags.join(", ") : (meal.tags || ""),
      imageFile: null,
    });
    setTab("form");
  };

  // ── POST /api/v1/meals (create)  ·  PATCH /api/v1/meals/{id} (update) ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.kcal) {
      addToast("Meal name and calories are required.", "error");
      return;
    }
    setSubmitting(true);
    const isEdit = Boolean(editingMeal);
    const mealId = editingMeal?._id || editingMeal?.id;
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (k !== "imageFile" && v) body.append(k, v); });
      if (formData.imageFile) body.append("image", formData.imageFile);

      const data = await apiRequest(isEdit ? `/meals/${mealId}` : "/meals", {
        method: isEdit ? "PATCH" : "POST",
        body,
        isFormData: true,
      });
      const saved = extractMeal(data) || formData;

      if (isEdit) {
        setPostedMeals(prev => prev.map(m => (m._localId === mealId ? { ...saved, _localId: mealId } : m)));
        addToast("Meal updated on server.");
      } else {
        const newId = saved?._id || saved?.id || Date.now();
        setPostedMeals(prev => [{ ...saved, _localId: newId }, ...prev]);
        addToast("Meal posted to server successfully!");
      }
    } catch (err) {
      if (isEdit) {
        // Update failed — keep the previous record, just notify.
        addToast(err.message || "Update failed — server unavailable.", "error");
      } else {
        // Create failed (offline / CORS) — fall back to a local-only record.
        const localRecord = {
          ...formData,
          _localId: Date.now(),
          mocked: true,
          ingredients: formData.ingredients.split(",").map(s => s.trim()).filter(Boolean),
          instructions: formData.instructions.split("\n").map(s => s.trim()).filter(Boolean),
          tags: formData.tags.split(",").map(s => s.trim()).filter(Boolean),
        };
        setPostedMeals(prev => [localRecord, ...prev]);
        addToast("Saved locally — server unavailable.", "info");
      }
    } finally {
      setSubmitting(false);
      setFormData(EMPTY_FORM);
      setEditingMeal(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTab("list");
    }
  };

  // ── DELETE /api/v1/meals/{id} ────────────────────────────────────────────
  const handleDelete = async meal => {
    const id = meal._id || meal.id || meal._localId;
    if (!window.confirm(`Delete "${meal.name}"? This can't be undone.`)) return;

    if (meal.mocked) {
      setPostedMeals(prev => prev.filter(m => m._localId !== meal._localId));
      addToast("Meal removed.", "info");
      return;
    }
    setDeletingId(id);
    try {
      await apiRequest(`/meals/${id}`, { method: "DELETE" });
      setPostedMeals(prev => prev.filter(m => m._localId !== id));
      addToast("Meal deleted from server.", "info");
    } catch (err) {
      addToast(err.message || "Delete failed — server unavailable.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ── GET /api/v1/meals/search?query= ──────────────────────────────────────
  const handleSearch = async e => {
    e?.preventDefault?.();
    if (!query.trim()) { fetchMeals(); return; }
    setSearching(true);
    setLoadError("");
    try {
      const data = await apiRequest(`/meals/search?query=${encodeURIComponent(query.trim())}`);
      setPostedMeals(extractMealList(data).map(m => ({ ...m, _localId: m._id || m.id })));
    } catch (err) {
      setLoadError(err.message || "Search failed.");
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => { setQuery(""); fetchMeals(); };

  // ── input style helper ─────────────────────────────────────────────────
  const inp = (extra = {}) => ({
    width: "100%", padding: "9px 12px", borderRadius: 10,
    border: `1px solid ${C.border}`, fontSize: 13, outline: "none",
    background: "#FAFAF8", boxSizing: "border-box", color: C.dark, ...extra,
  });
  const lbl = { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 5 };

  return (
    <div style={{ position: "relative" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3" style={{ marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 800, color: C.dark, margin: 0 }}>Meal Management</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 0" }}>Create and manage meal entries for the platform</p>
        </div>
        {/* Tab switcher */}
        <div className="self-start sm:self-auto" style={{ display: "flex", background: "#F3F2EE", padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
          {[["list", "Active Meals", P.list], ["form", "+ Add Meal", P.plus]].map(([id, label, icon]) => (
            <button key={id} onClick={() => (id === "form" ? startCreate() : setTab(id))} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: tab === id ? C.card : "transparent",
              color: tab === id ? C.dark : C.muted,
              boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,.08)" : "none",
            }}>
              <Ic d={icon} size={13} color={tab === id ? C.dark : C.muted} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── LIST TAB ── */}
      {tab === "list" && (
        <div>
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 20 }}>
            <KPICard label="Total Meals"   value={postedMeals.length || "0"} color={C.teal}   />
            <KPICard label="Avg Calories"  value={postedMeals.length ? Math.round(postedMeals.reduce((a, m) => a + (+m.kcal || 0), 0) / postedMeals.length) + " kcal" : "—"} color={C.accent} />
            <KPICard label="Categories"    value={new Set(postedMeals.map(m => m.category)).size || "—"} color={C.info}   />
            <KPICard label="Server Synced" value={postedMeals.filter(m => !m.mocked).length} color="#F59E0B" />
          </div>

          {/* Search + refresh bar (GET /meals/search, GET /meals) */}
          <form onSubmit={handleSearch} className="flex flex-wrap sm:flex-nowrap" style={{ gap: 10, marginBottom: 16 }}>
            <div style={{ position: "relative", flex: "1 1 200px" }}>
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}>
                <Ic d={P.search} size={14} />
              </div>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search meals by name, tag or category…"
                style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, outline: "none", background: C.card, boxSizing: "border-box" }}
              />
            </div>
            {query && (
              <button type="button" onClick={clearSearch} style={{ padding: "9px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, fontSize: 12, cursor: "pointer", color: C.mid }}>
                Clear
              </button>
            )}
            <button type="submit" disabled={searching} style={{ padding: "9px 16px", borderRadius: 10, border: "none", background: C.dark, color: "#fff", fontSize: 12, fontWeight: 700, cursor: searching ? "not-allowed" : "pointer" }}>
              {searching ? "Searching…" : "Search"}
            </button>
            <button type="button" onClick={fetchMeals} title="Refresh from server" style={{ width: 36, borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.mid }}>
              <Ic d={P.refresh} size={14} />
            </button>
          </form>

          {loadError && (
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: 12, marginBottom: 16 }}>
              {loadError} — showing any locally cached meals below.
            </div>
          )}

          {loadingMeals ? (
            <Card style={{ padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: C.muted }}>Loading meals from server…</div>
            </Card>
          ) : postedMeals.length === 0 ? (
            <Card style={{ padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🥘</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>No meals found</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 18 }}>{query ? "Try a different search term, or clear the search." : "Create your first meal entry to populate the platform menu."}</div>
              <button onClick={startCreate} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: C.sidebar, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Post First Meal
              </button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: 14 }}>
              {postedMeals.map(meal => (
                <MealCard key={meal._localId} meal={meal} onView={setViewMeal} onEdit={startEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── FORM TAB ── */}
      {tab === "form" && (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]" style={{ gap: 20 }}>
          {/* Form */}
          <Card style={{ padding: 24 }}>
            <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{editingMeal ? "Edit Meal Entry" : "New Meal Entry"}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{editingMeal ? `Updating "${editingMeal.name}"` : "Fill in the details below to add a meal to the platform"}</div>
              </div>
              {editingMeal && (
                <button onClick={() => { setEditingMeal(null); setFormData(EMPTY_FORM); setTab("list"); }} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", color: C.mid }}>
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14, marginBottom: 14 }}>
              <div>
                <label style={lbl}>Meal Name *</label>
                <input name="name" value={formData.name} onChange={handleInput} placeholder="e.g. Avocado Salmon Bowl" style={inp()} />
              </div>
              <div>
                <label style={lbl}>Category</label>
                <select name="category" value={formData.category} onChange={handleInput} style={inp({ appearance: "none", cursor: "pointer" })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Macro row */}
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 12, marginBottom: 14 }}>
              {MACROCOLS.map(col => (
                <div key={col.key}>
                  <label style={{ ...lbl, color: col.accent }}>{col.label} *</label>
                  <input name={col.key} value={formData[col.key]} onChange={handleInput} placeholder="0" style={inp({ border: `1px solid ${col.border}`, background: col.bg })} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Ingredients <span style={{ color: C.muted, fontWeight: 400 }}>(comma-separated)</span></label>
              <textarea name="ingredients" value={formData.ingredients} onChange={handleInput} rows={2} placeholder="2 Eggs, 50g Almond Flour, 1 Avocado, Sea Salt…" style={{ ...inp(), resize: "vertical", lineHeight: 1.5 }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Instructions <span style={{ color: C.muted, fontWeight: 400 }}>(one step per line)</span></label>
              <textarea name="instructions" value={formData.instructions} onChange={handleInput} rows={3} placeholder={"Step 1: Preheat pan over medium heat.\nStep 2: Season salmon with salt and pepper."} style={{ ...inp(), resize: "vertical", lineHeight: 1.5 }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Dietary Tags <span style={{ color: C.muted, fontWeight: 400 }}>(comma-separated)</span></label>
              <input name="tags" value={formData.tags} onChange={handleInput} placeholder="Keto, Gluten-Free, High-Protein" style={inp()} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>Image Upload</label>
              <div style={{ border: `2px dashed ${C.border}`, borderRadius: 10, padding: "18px 0", textAlign: "center", cursor: "pointer", position: "relative", background: "#FAFAF8" }}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
                <Ic d={P.upload} size={22} color={C.muted} />
                <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{formData.imageFile ? formData.imageFile.name : "Drop image or click to browse"}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>PNG, JPG · max 8 MB</div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={submitting} style={{
              width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
              background: submitting ? C.muted : C.sidebar, color: "#fff",
              fontSize: 13, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {submitting
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg> {editingMeal ? "Saving…" : "Posting…"}</>
                : editingMeal
                  ? <><Ic d={P.check} size={15} color="#fff" sw={2.5} /> Save Changes</>
                  : <><Ic d={P.plus} size={15} color="#fff" sw={2.5} /> Post Meal</>
              }
            </button>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </Card>

          {/* Live preview panel */}
          <div style={{ background: C.sidebar, borderRadius: 14, padding: 22, color: "#fff", border: "1px solid rgba(255,255,255,.06)", alignSelf: "start", position: "sticky", top: 20 }}>
            <div style={{ fontSize: 10, background: "rgba(45,184,154,.2)", color: C.teal, padding: "2px 8px", borderRadius: 5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", display: "inline-block", marginBottom: 10 }}>Live Preview</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Payload Mirror</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginBottom: 16 }}>What gets sent to the API</div>

            <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: "14px 16px", fontFamily: "monospace", fontSize: 11, color: "#A3E6CB", lineHeight: 1.7, marginBottom: 18 }}>
              <span style={{ color: "#6EE7B7" }}>{editingMeal ? "PATCH" : "POST"}</span> /api/v1/meals{editingMeal ? `/${editingMeal._id || editingMeal.id}` : ""}<br />
              <span style={{ color: "#94A3B8" }}>{"{"}</span><br />
              <span style={{ color: "#94A3B8", paddingLeft: 12 }}>"name": </span><span style={{ color: "#FCD34D" }}>"{formData.name || "…"}"</span>,<br />
              <span style={{ color: "#94A3B8", paddingLeft: 12 }}>"category": </span><span style={{ color: "#FCD34D" }}>"{formData.category}"</span>,<br />
              <span style={{ color: "#94A3B8", paddingLeft: 12 }}>"kcal": </span><span style={{ color: "#FB923C" }}>{formData.kcal || 0}</span>,<br />
              <span style={{ color: "#94A3B8", paddingLeft: 12 }}>"protein": </span><span style={{ color: "#6EE7B7" }}>"{formData.protein || "0"}g"</span>,<br />
              <span style={{ color: "#94A3B8", paddingLeft: 12 }}>"image": </span><span style={{ color: "#94A3B8" }}>{formData.imageFile ? `"${formData.imageFile.name}"` : "null"}</span><br />
              <span style={{ color: "#94A3B8" }}>{"}"}</span>
            </div>

            <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>Target Endpoint</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,.25)", borderRadius: 8, padding: "9px 12px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, boxShadow: `0 0 0 3px ${C.teal}30` }} />
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,.6)", wordBreak: "break-all" }}>new-dine-with-mee-backend-z7it.onrender.com</span>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {viewMeal && <MealDetailModal meal={viewMeal} onClose={() => setViewMeal(null)} />}

      {/* Toast stack */}
      <div className="left-4 right-4 sm:left-auto sm:right-5 sm:max-w-[320px]" style={{ position: "fixed", bottom: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px", borderRadius: 10, fontWeight: 600, fontSize: 12,
            pointerEvents: "auto", boxShadow: "0 4px 20px rgba(0,0,0,.2)", gap: 12,
            background: t.type === "error" ? "#DC2626" : t.type === "info" ? C.sidebar : "#065F46",
            color: "#fff", border: t.type === "info" ? "1px solid rgba(255,255,255,.1)" : "none",
          }}>
            <span>{t.type === "success" ? "✓ " : t.type === "error" ? "✗ " : "ℹ "}{t.msg}</span>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", padding: 0 }}>
              <Ic d={P.x} size={13} color="rgba(255,255,255,.7)" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE — INGREDIENTS DATABASE  (African ingredients database endpoints)
//  GET    /api/v1/ingredients                 — Get all ingredients
//  POST   /api/v1/ingredients                 — Create ingredient (Admin only)
//  GET    /api/v1/ingredients/search           — Search ingredients
//  GET    /api/v1/ingredients/suitability      — Get ingredients by health suitability
//  GET    /api/v1/ingredients/{id}             — Get ingredient by ID
//  PATCH  /api/v1/ingredients/{id}             — Update ingredient (Admin only)
//  DELETE /api/v1/ingredients/{id}             — Delete ingredient (Admin only)
// ═══════════════════════════════════════════════════════════════════════════
const EMPTY_INGREDIENT_FORM = {
  name: "", category: "Vegetables", origin: "",
  calories: "", protein: "", carbs: "", fats: "", fiber: "",
  healthSuitability: "", allergens: "", description: "",
};
const INGREDIENT_CATEGORIES = ["Grains", "Vegetables", "Fruits", "Legumes", "Tubers", "Proteins", "Spices & Herbs", "Dairy", "Nuts & Seeds", "Beverages", "Other"];
const SUITABILITY_TAGS = ["Diabetic-Friendly", "Hypertension-Friendly", "Heart-Healthy", "Low-Sodium", "High-Fiber", "Weight Management", "Pregnancy-Safe", "Low-Fat"];
const ING_MACROCOLS = [
  { key: "calories", label: "Calories (kcal)", accent: "#C2410C", border: "#FED7AA", bg: "#FFF7ED" },
  { key: "protein",  label: "Protein (g)",     accent: "#047857", border: "#A7F3D0", bg: "#ECFDF5" },
  { key: "carbs",    label: "Carbs (g)",       accent: "#1D4ED8", border: "#BFDBFE", bg: "#EFF6FF" },
  { key: "fats",     label: "Fat (g)",         accent: "#7E22CE", border: "#E9D5FF", bg: "#FAF5FF" },
  { key: "fiber",    label: "Fiber (g)",       accent: "#B45309", border: "#FDE68A", bg: "#FFFBEB" },
];

// Ingredient card (grid view)
function IngredientCard({ ingredient, onView, onEdit, onDelete, busy }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
      padding: 16, display: "flex", flexDirection: "column", gap: 10,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)", position: "relative",
    }}>
      {ingredient.mocked && (
        <span style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 700, background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", padding: "2px 6px", borderRadius: 5, textTransform: "uppercase", letterSpacing: ".04em" }}>Local</span>
      )}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>{ingredient.category}{ingredient.origin ? ` · ${ingredient.origin}` : ""}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, lineHeight: 1.3 }}>{ingredient.name}</div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {ingredient.calories !== "" && ingredient.calories != null && <span style={{ fontSize: 10, fontWeight: 600, background: "#FFF7ED", color: "#C2410C", padding: "2px 7px", borderRadius: 20 }}>{ingredient.calories} kcal</span>}
        {ingredient.protein !== "" && ingredient.protein != null && <span style={{ fontSize: 10, fontWeight: 600, background: "#ECFDF5", color: "#047857", padding: "2px 7px", borderRadius: 20 }}>P: {ingredient.protein}g</span>}
        {ingredient.carbs !== "" && ingredient.carbs != null && <span style={{ fontSize: 10, fontWeight: 600, background: "#EFF6FF", color: "#1D4ED8", padding: "2px 7px", borderRadius: 20 }}>C: {ingredient.carbs}g</span>}
      </div>
      {ingredient.healthSuitability?.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {ingredient.healthSuitability.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 10, background: "#D1FAE5", color: "#065F46", padding: "2px 6px", borderRadius: 20, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => onView(ingredient)} style={{ flex: 1, padding: "7px 0", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.mid, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <Ic d={P.eye} size={13} /> View
        </button>
        <button onClick={() => onEdit(ingredient)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.mid }}>
          <Ic d={P.edit} size={13} />
        </button>
        <button onClick={() => onDelete(ingredient)} disabled={busy} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: busy ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.danger }}>
          <Ic d={P.trash} size={13} color={C.danger} />
        </button>
      </div>
    </div>
  );
}

// Ingredient detail modal — reflects data returned from GET /ingredients/{id}
function IngredientDetailModal({ ingredient, loading, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.card, borderRadius: 20, width: "100%", maxWidth: 480, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", position: "relative" }}>
        <div style={{ padding: "20px 22px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{ fontSize: 10, background: C.bg, color: C.muted, fontWeight: 700, padding: "2px 8px", borderRadius: 5, textTransform: "uppercase" }}>{ingredient.category}</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, marginTop: 6 }}>{ingredient.name}</div>
            {ingredient.origin && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Origin: {ingredient.origin}</div>}
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.muted }}>
            <Ic d={P.x} size={14} />
          </button>
        </div>
        <div style={{ padding: "18px 22px" }}>
          {loading ? (
            <div style={{ fontSize: 12, color: C.muted, textAlign: "center", padding: "20px 0" }}>Loading full record…</div>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-5" style={{ gap: 8, marginBottom: 18 }}>
                {ING_MACROCOLS.map(col => (
                  <div key={col.key} style={{ textAlign: "center", padding: "10px 4px", borderRadius: 10, background: col.bg, border: `1px solid ${col.border}` }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: col.accent }}>{ingredient[col.key] || "—"}</div>
                    <div style={{ fontSize: 9, color: col.accent, marginTop: 2, fontWeight: 500 }}>{col.label.split(" ")[0]}</div>
                  </div>
                ))}
              </div>
              {ingredient.healthSuitability?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.muted, marginBottom: 8 }}>Health Suitability</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {ingredient.healthSuitability.map(t => <Badge key={t} text={t} type="success" />)}
                  </div>
                </div>
              )}
              {ingredient.allergens?.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.muted, marginBottom: 8 }}>Allergens</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {ingredient.allergens.map(t => <Badge key={t} text={t} type="danger" />)}
                  </div>
                </div>
              )}
              {ingredient.description && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.muted, marginBottom: 8 }}>Description</div>
                  <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{ingredient.description}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function IngredientsManagement() {
  const [tab, setTab]                     = useState("list");   // "list" | "form"
  const [formData, setFormData]           = useState(EMPTY_INGREDIENT_FORM);
  const [ingredients, setIngredients]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [loadError, setLoadError]         = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [deletingId, setDeletingId]       = useState(null);
  const [editingIngredient, setEditingIngredient] = useState(null); // null = creating
  const [viewIngredient, setViewIngredient]       = useState(null);
  const [viewLoading, setViewLoading]     = useState(false);
  const [query, setQuery]                 = useState("");
  const [searching, setSearching]         = useState(false);
  const [suitabilityFilter, setSuitabilityFilter] = useState("all");
  const { toasts, addToast, dismissToast } = useToasts();

  // ── GET /api/v1/ingredients — load all ingredients on mount ───────────────
  const fetchIngredients = async () => {
    setLoading(true);
    setLoadError("");
    setSuitabilityFilter("all");
    try {
      const data = await apiRequest("/ingredients");
      setIngredients(extractIngredientList(data).map(normalizeIngredient));
    } catch (err) {
      setLoadError(err.message || "Could not reach the ingredients API.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchIngredients(); }, []); // eslint-disable-line

  const startCreate = () => {
    setEditingIngredient(null);
    setFormData(EMPTY_INGREDIENT_FORM);
    setTab("form");
  };

  const startEdit = ing => {
    setEditingIngredient(ing);
    setFormData({
      name: ing.name || "",
      category: ing.category || "Vegetables",
      origin: ing.origin || "",
      calories: ing.calories ?? "",
      protein: ing.protein ?? "",
      carbs: ing.carbs ?? "",
      fats: ing.fats ?? "",
      fiber: ing.fiber ?? "",
      healthSuitability: Array.isArray(ing.healthSuitability) ? ing.healthSuitability.join(", ") : (ing.healthSuitability || ""),
      allergens: Array.isArray(ing.allergens) ? ing.allergens.join(", ") : (ing.allergens || ""),
      description: ing.description || "",
    });
    setTab("form");
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── POST /api/v1/ingredients (create)  ·  PATCH /api/v1/ingredients/{id} (update) ──
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast("Ingredient name is required.", "error");
      return;
    }
    setSubmitting(true);
    const isEdit = Boolean(editingIngredient);
    const ingId = editingIngredient?._id;
    const body = {
      name: formData.name.trim(),
      category: formData.category,
      origin: formData.origin.trim(),
      calories: formData.calories === "" ? undefined : Number(formData.calories),
      protein: formData.protein === "" ? undefined : Number(formData.protein),
      carbs: formData.carbs === "" ? undefined : Number(formData.carbs),
      fats: formData.fats === "" ? undefined : Number(formData.fats),
      fiber: formData.fiber === "" ? undefined : Number(formData.fiber),
      healthSuitability: formData.healthSuitability.split(",").map(s => s.trim()).filter(Boolean),
      allergens: formData.allergens.split(",").map(s => s.trim()).filter(Boolean),
      description: formData.description.trim(),
    };

    try {
      const data = await apiRequest(isEdit ? `/ingredients/${ingId}` : "/ingredients", {
        method: isEdit ? "PATCH" : "POST",
        body,
      });
      const saved = normalizeIngredient(extractIngredient(data) || body);

      if (isEdit) {
        setIngredients(prev => prev.map(i => (i._id === ingId ? { ...saved, _id: ingId } : i)));
        addToast("Ingredient updated on server.");
      } else {
        setIngredients(prev => [{ ...saved, _id: saved._id || Date.now() }, ...prev]);
        addToast("Ingredient added to the database.");
      }
    } catch (err) {
      if (isEdit) {
        addToast(err.message || "Update failed — server unavailable.", "error");
      } else {
        // Create failed (offline / permissions) — fall back to a local-only record.
        setIngredients(prev => [normalizeIngredient({ ...body, _id: Date.now(), mocked: true }), ...prev]);
        addToast(err.message || "Saved locally — server unavailable.", "info");
      }
    } finally {
      setSubmitting(false);
      setFormData(EMPTY_INGREDIENT_FORM);
      setEditingIngredient(null);
      setTab("list");
    }
  };

  // ── DELETE /api/v1/ingredients/{id} ────────────────────────────────────────
  const handleDelete = async ing => {
    if (!window.confirm(`Delete "${ing.name}"? This can't be undone.`)) return;
    if (ing.mocked) {
      setIngredients(prev => prev.filter(i => i._id !== ing._id));
      addToast("Ingredient removed.", "info");
      return;
    }
    setDeletingId(ing._id);
    try {
      await apiRequest(`/ingredients/${ing._id}`, { method: "DELETE" });
      setIngredients(prev => prev.filter(i => i._id !== ing._id));
      addToast("Ingredient deleted from server.", "info");
    } catch (err) {
      addToast(err.message || "Delete failed — server unavailable.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ── GET /api/v1/ingredients/{id} — fetch the canonical record for the modal ──
  const handleView = async ing => {
    setViewIngredient(ing);
    setViewLoading(true);
    try {
      const data = await apiRequest(`/ingredients/${ing._id}`);
      const full = extractIngredient(data);
      if (full) setViewIngredient(normalizeIngredient(full));
    } catch {
      // Keep showing the row's cached data if the single-record fetch fails.
    } finally {
      setViewLoading(false);
    }
  };

  // ── GET /api/v1/ingredients/search?query= ───────────────────────────────────
  const handleSearch = async e => {
    e?.preventDefault?.();
    if (!query.trim()) { fetchIngredients(); return; }
    setSearching(true);
    setLoadError("");
    setSuitabilityFilter("all");
    try {
      const data = await apiRequest(`/ingredients/search?query=${encodeURIComponent(query.trim())}`);
      setIngredients(extractIngredientList(data).map(normalizeIngredient));
    } catch (err) {
      setLoadError(err.message || "Search failed.");
    } finally {
      setSearching(false);
    }
  };
  const clearSearch = () => { setQuery(""); fetchIngredients(); };

  // ── GET /api/v1/ingredients/suitability?condition= ─────────────────────────
  const handleSuitabilityFilter = async tag => {
    setSuitabilityFilter(tag);
    setQuery("");
    if (tag === "all") { fetchIngredients(); return; }
    setLoading(true);
    setLoadError("");
    try {
      const data = await apiRequest(`/ingredients/suitability?condition=${encodeURIComponent(tag)}`);
      setIngredients(extractIngredientList(data).map(normalizeIngredient));
    } catch (err) {
      setLoadError(err.message || "Could not filter by health suitability.");
    } finally {
      setLoading(false);
    }
  };

  const inp = (extra = {}) => ({
    width: "100%", padding: "9px 12px", borderRadius: 10,
    border: `1px solid ${C.border}`, fontSize: 13, outline: "none",
    background: "#FAFAF8", boxSizing: "border-box", color: C.dark, ...extra,
  });
  const lbl = { fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 5 };

  const categoryCount = new Set(ingredients.map(i => i.category)).size;
  const diabeticCount = ingredients.filter(i => i.healthSuitability.includes("Diabetic-Friendly")).length;

  return (
    <div style={{ position: "relative" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3" style={{ marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 800, color: C.dark, margin: 0 }}>Ingredients Database</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 0" }}>Manage the African ingredients catalog used across meals</p>
        </div>
        {/* Tab switcher */}
        <div className="self-start sm:self-auto" style={{ display: "flex", background: "#F3F2EE", padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
          {[["list", "All Ingredients", P.list], ["form", "+ Add Ingredient", P.plus]].map(([id, label, icon]) => (
            <button key={id} onClick={() => (id === "form" ? startCreate() : setTab(id))} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: tab === id ? C.card : "transparent",
              color: tab === id ? C.dark : C.muted,
              boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,.08)" : "none",
            }}>
              <Ic d={icon} size={13} color={tab === id ? C.dark : C.muted} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── LIST TAB ── */}
      {tab === "list" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 20 }}>
            <KPICard label="Total Ingredients"     value={ingredients.length || "0"} color={C.teal}   />
            <KPICard label="Categories"            value={categoryCount || "—"}      color={C.info}   />
            <KPICard label="Diabetic-Friendly"     value={diabeticCount}             color={C.accent} />
            <KPICard label="Server Synced"         value={ingredients.filter(i => !i.mocked).length} color="#F59E0B" />
          </div>

          {/* Search (GET /ingredients/search) + refresh (GET /ingredients) */}
          <form onSubmit={handleSearch} className="flex flex-wrap sm:flex-nowrap" style={{ gap: 10, marginBottom: 14 }}>
            <div style={{ position: "relative", flex: "1 1 200px" }}>
              <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}>
                <Ic d={P.search} size={14} />
              </div>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search ingredients by name or category…"
                style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 13, outline: "none", background: C.card, boxSizing: "border-box" }}
              />
            </div>
            {query && (
              <button type="button" onClick={clearSearch} style={{ padding: "9px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, fontSize: 12, cursor: "pointer", color: C.mid }}>
                Clear
              </button>
            )}
            <button type="submit" disabled={searching} style={{ padding: "9px 16px", borderRadius: 10, border: "none", background: C.dark, color: "#fff", fontSize: 12, fontWeight: 700, cursor: searching ? "not-allowed" : "pointer" }}>
              {searching ? "Searching…" : "Search"}
            </button>
            <button type="button" onClick={fetchIngredients} title="Refresh from server" style={{ width: 36, borderRadius: 10, border: `1px solid ${C.border}`, background: C.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.mid }}>
              <Ic d={P.refresh} size={14} />
            </button>
          </form>

          {/* Health-suitability filter (GET /ingredients/suitability) */}
          <div className="flex flex-wrap items-center" style={{ gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", fontWeight: 700, marginRight: 2 }}>Suitability</span>
            <button onClick={() => handleSuitabilityFilter("all")} style={{ padding: "4px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, background: suitabilityFilter === "all" ? C.sidebar : C.border, color: suitabilityFilter === "all" ? "#fff" : C.mid }}>all</button>
            {SUITABILITY_TAGS.map(tag => (
              <button key={tag} onClick={() => handleSuitabilityFilter(tag)} style={{ padding: "4px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, background: suitabilityFilter === tag ? C.sidebar : C.border, color: suitabilityFilter === tag ? "#fff" : C.mid }}>{tag}</button>
            ))}
          </div>

          {loadError && (
            <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: 12, marginBottom: 16 }}>
              {loadError} — showing any locally cached ingredients below.
            </div>
          )}

          {loading ? (
            <Card style={{ padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: C.muted }}>Loading ingredients from server…</div>
            </Card>
          ) : ingredients.length === 0 ? (
            <Card style={{ padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🌿</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>No ingredients found</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 18 }}>{query || suitabilityFilter !== "all" ? "Try a different search or filter." : "Add your first ingredient to populate the database."}</div>
              <button onClick={startCreate} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: C.sidebar, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Add First Ingredient
              </button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: 14 }}>
              {ingredients.map(ing => (
                <IngredientCard key={ing._id} ingredient={ing} onView={handleView} onEdit={startEdit} onDelete={handleDelete} busy={deletingId === ing._id} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── FORM TAB ── */}
      {tab === "form" && (
        <Card style={{ padding: 24, maxWidth: 720 }}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{editingIngredient ? "Edit Ingredient" : "New Ingredient"}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{editingIngredient ? `Updating "${editingIngredient.name}"` : "Add a new item to the African ingredients database"}</div>
            </div>
            {editingIngredient && (
              <button onClick={() => { setEditingIngredient(null); setFormData(EMPTY_INGREDIENT_FORM); setTab("list"); }} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`, background: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", color: C.mid }}>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Ingredient Name *</label>
              <input name="name" value={formData.name} onChange={handleInput} placeholder="e.g. Egusi Seeds" style={inp()} />
            </div>
            <div>
              <label style={lbl}>Category</label>
              <select name="category" value={formData.category} onChange={handleInput} style={inp({ appearance: "none", cursor: "pointer" })}>
                {INGREDIENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Origin / Region <span style={{ color: C.muted, fontWeight: 400 }}>(optional)</span></label>
            <input name="origin" value={formData.origin} onChange={handleInput} placeholder="e.g. West Africa" style={inp()} />
          </div>

          {/* Macro row */}
          <div className="grid grid-cols-2 sm:grid-cols-5" style={{ gap: 10, marginBottom: 14 }}>
            {ING_MACROCOLS.map(col => (
              <div key={col.key}>
                <label style={{ ...lbl, color: col.accent }}>{col.label}</label>
                <input name={col.key} value={formData[col.key]} onChange={handleInput} placeholder="0" style={inp({ border: `1px solid ${col.border}`, background: col.bg })} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Health Suitability <span style={{ color: C.muted, fontWeight: 400 }}>(comma-separated, e.g. Diabetic-Friendly, Low-Sodium)</span></label>
            <input name="healthSuitability" value={formData.healthSuitability} onChange={handleInput} placeholder="Diabetic-Friendly, Heart-Healthy" style={inp()} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Allergens <span style={{ color: C.muted, fontWeight: 400 }}>(comma-separated)</span></label>
            <input name="allergens" value={formData.allergens} onChange={handleInput} placeholder="e.g. Peanuts, Tree Nuts" style={inp()} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Description <span style={{ color: C.muted, fontWeight: 400 }}>(optional)</span></label>
            <textarea name="description" value={formData.description} onChange={handleInput} rows={3} placeholder="Notes on preparation, culinary use, or nutritional highlights…" style={{ ...inp(), resize: "vertical", lineHeight: 1.5 }} />
          </div>

          <button onClick={handleSubmit} disabled={submitting} style={{
            width: "100%", padding: "12px 0", borderRadius: 10, border: "none",
            background: submitting ? C.muted : C.sidebar, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            {submitting
              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg> {editingIngredient ? "Saving…" : "Adding…"}</>
              : editingIngredient
                ? <><Ic d={P.check} size={15} color="#fff" sw={2.5} /> Save Changes</>
                : <><Ic d={P.plus} size={15} color="#fff" sw={2.5} /> Add Ingredient</>
            }
          </button>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </Card>
      )}

      {/* Detail modal (GET /ingredients/{id}) */}
      {viewIngredient && <IngredientDetailModal ingredient={viewIngredient} loading={viewLoading} onClose={() => setViewIngredient(null)} />}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE — CONTENT MODERATION
//  GET /api/v1/admin/content/moderation · GET /api/v1/admin/content/pending
//  PUT /api/v1/admin/content/{contentId}/approve · PUT …/{contentId}/reject
// ═══════════════════════════════════════════════════════════════════════════
function ContentModerationCard({ item, onApprove, onReject, busy }) {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <Badge text={item.type} type="info" />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{item.title}</span>
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>
            Submitted by {item.author}{item.createdAt ? ` · ${new Date(item.createdAt).toLocaleString()}` : ""}
          </div>
          {item.description && (
            <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.5, maxWidth: 560 }}>
              {item.description.length > 220 ? `${item.description.slice(0, 220)}…` : item.description}
            </div>
          )}
        </div>
        <div className="flex sm:flex-col" style={{ gap: 8, flexShrink: 0 }}>
          <button onClick={() => onApprove(item)} disabled={busy === item._id} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8, border: "none", background: "#D1FAE5", color: "#059669",
            fontSize: 12, fontWeight: 700, cursor: busy === item._id ? "wait" : "pointer",
          }}>
            <Ic d={P.check} size={13} /> Approve
          </button>
          <button onClick={() => onReject(item)} disabled={busy === item._id} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8, border: "none", background: "#FEE2E2", color: "#DC2626",
            fontSize: 12, fontWeight: 700, cursor: busy === item._id ? "wait" : "pointer",
          }}>
            <Ic d={P.x} size={13} /> Reject
          </button>
        </div>
      </div>
    </Card>
  );
}

function ContentModeration() {
  const [stats, setStats]           = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [pending, setPending]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [loadError, setLoadError]   = useState("");
  const [busyId, setBusyId]         = useState(null);
  const { toasts, addToast, dismissToast } = useToasts();

  // ── GET /api/v1/admin/content/moderation — summary stats ──────────────────
  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const data = await apiRequest("/admin/content/moderation");
      setStats(extractStatsObj(data));
    } catch {
      setStats(null); // KPI cards fall back to placeholders below
    } finally {
      setStatsLoading(false);
    }
  };

  // ── GET /api/v1/admin/content/pending — queue of items to review ──────────
  const fetchPending = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await apiRequest("/admin/content/pending");
      setPending(extractContentList(data).map(normalizeContentItem));
    } catch (err) {
      setLoadError(err.message || "Could not reach the content moderation API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); fetchPending(); }, []);

  // ── PUT /api/v1/admin/content/{contentId}/approve ──────────────────────────
  const handleApprove = async item => {
    setBusyId(item._id);
    try {
      await apiRequest(`/admin/content/${item._id}/approve`, { method: "PUT" });
      setPending(prev => prev.filter(x => x._id !== item._id));
      addToast(`"${item.title}" approved.`, "success");
    } catch (err) {
      addToast(err.message || "Approve failed.", "error");
    } finally {
      setBusyId(null);
    }
  };

  // ── PUT /api/v1/admin/content/{contentId}/reject ───────────────────────────
  const handleReject = async item => {
    if (!window.confirm(`Reject and delete "${item.title}"? This can't be undone.`)) return;
    setBusyId(item._id);
    try {
      await apiRequest(`/admin/content/${item._id}/reject`, { method: "PUT" });
      setPending(prev => prev.filter(x => x._id !== item._id));
      addToast(`"${item.title}" rejected.`, "info");
    } catch (err) {
      addToast(err.message || "Reject failed.", "error");
    } finally {
      setBusyId(null);
    }
  };

  const refreshAll = () => { fetchStats(); fetchPending(); };

  return (
    <div style={{ position: "relative" }}>
      <PageHeader title="Content Moderation" subtitle="Review and action content flagged or awaiting approval" action="↻ Refresh" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 18 }}>
        <KPICard label="Pending Review" value={statsLoading ? "…" : (stats?.pending ?? stats?.totalPending ?? pending.length)} color={C.accent} />
        <KPICard label="Approved"       value={statsLoading ? "…" : (stats?.approved ?? stats?.totalApproved ?? "—")}        color="#22C55E"  />
        <KPICard label="Rejected"       value={statsLoading ? "…" : (stats?.rejected ?? stats?.totalRejected ?? "—")}        color={C.danger} />
        <KPICard label="Total Reviewed" value={statsLoading ? "…" : (stats?.totalReviewed ?? stats?.total ?? "—")}           color={C.info}   />
      </div>

      {loadError && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: 12, marginBottom: 16 }}>
          {loadError}
        </div>
      )}

      {loading ? (
        <Card style={{ padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.muted }}>Loading pending content…</div>
        </Card>
      ) : pending.length === 0 ? (
        <Card style={{ padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>✅</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Nothing pending</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 18 }}>The moderation queue is clear — new submissions will appear here.</div>
          <button onClick={refreshAll} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: C.sidebar, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Refresh Queue
          </button>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pending.map(item => (
            <ContentModerationCard key={item._id} item={item} onApprove={handleApprove} onReject={handleReject} busy={busyId} />
          ))}
        </div>
      )}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 5 — SYSTEM COMPONENTS LIBRARY
// ═══════════════════════════════════════════════════════════════════════════
const devices = [
  { name: "Kitchen Temp Sensor A1", status: "online",  data: "72 °F"    },
  { name: "Chef Wristband #42",     status: "online",  data: "Active"   },
  { name: "Smart Scale Unit 3",     status: "offline", data: "—"        },
  { name: "Timer Display B2",       status: "online",  data: "Running"  },
  { name: "IoT Hub Node #7",        status: "online",  data: "14 peers" },
];

// Default demo metrics — shown until/unless the live health check overrides them.
const DEFAULT_HEALTH_METRICS = [
  { key: "uptime",   metric: "API Uptime",        value: "99.97%", color: C.teal,    bar: 99 },
  { key: "response", metric: "Avg Response Time", value: "142 ms", color: C.info,    bar: 85 },
  { key: "errors",   metric: "Error Rate",        value: "0.03%",  color: C.accent,  bar: 3  },
  { key: "dbPool",   metric: "DB Pool Usage",     value: "48/100", color: "#F59E0B", bar: 48 },
  { key: "cache",    metric: "Cache Hit Rate",    value: "91.2%",  color: C.teal,    bar: 91 },
];

function SystemComponents() {
  const [health, setHealth]   = useState(null);
  const [checking, setChecking] = useState(true);
  const [checkedAt, setCheckedAt] = useState(null);

  // ── GET /api/v1/admin/system/health ────────────────────────────────────────
  const checkHealth = async () => {
    setChecking(true);
    try {
      const data = await apiRequest("/admin/system/health");
      setHealth(extractStatsObj(data));
      setCheckedAt(new Date());
    } catch {
      setHealth(null);
    } finally {
      setChecking(false);
    }
  };
  useEffect(() => { checkHealth(); }, []);

  const metrics = DEFAULT_HEALTH_METRICS.map(m => {
    const live = health?.[m.key];
    return live !== undefined ? { ...m, value: String(live) } : m;
  });
  const overallStatus = health?.status || (checking ? null : "unknown");

  return (
    <div>
      <PageHeader title="System Components Library" subtitle="Health monitoring, wearable sync, and AI tooling" />
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginBottom: 14 }}>
        <Card>
          <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
            <SectionTitle>🫀 System Health Insights</SectionTitle>
            <button onClick={checkHealth} disabled={checking} title="Re-check system health" style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${C.border}`, background: "none", cursor: checking ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.mid }}>
              <Ic d={P.refresh} size={12} />
            </button>
          </div>
          {overallStatus && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: overallStatus === "healthy" || overallStatus === "ok" ? "#D1FAE5" : overallStatus === "unknown" ? "#F3F4F6" : "#FEF3C7", color: overallStatus === "healthy" || overallStatus === "ok" ? "#059669" : overallStatus === "unknown" ? C.muted : "#B45309" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
              {overallStatus === "unknown" ? "Live check unavailable — showing cached metrics" : `Status: ${overallStatus}`}
            </div>
          )}
          {metrics.map(m => (
            <div key={m.metric} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: C.mid }}>{m.metric}</span>
                <span style={{ fontWeight: 700, color: m.color }}>{m.value}</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: C.border }}>
                <div style={{ height: "100%", borderRadius: 3, background: m.color, width: `${m.bar}%` }} />
              </div>
            </div>
          ))}
          {checkedAt && <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>Last checked {checkedAt.toLocaleTimeString()}</div>}
        </Card>
        <Card>
          <SectionTitle>⌚ Smart Wearable Sync</SectionTitle>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 12 }}>Connected kitchen and chef IoT devices</div>
          {devices.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < devices.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{d.name}</div>
                <div style={{ fontSize: 10, marginTop: 2, color: d.status === "online" ? "#16A34A" : C.muted }}>● {d.status}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{d.data}</span>
            </div>
          ))}
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14 }}>
        <Card>
          <SectionTitle>📋 Bulk Assignment Console</SectionTitle>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>Assign providers to campaigns or regions in bulk</div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 8, marginBottom: 10 }}>
            {[["Select Region", ["All Regions", "North Zone", "South Zone", "East Zone"]], ["Select Campaign", ["Summer Feast", "New Chef Welcome", "Loyalty Q3"]]].map(([ph, opts]) => (
              <select key={ph} style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, background: C.card }}>
                <option>{ph}</option>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <button style={{ width: "100%", padding: 10, borderRadius: 8, border: "none", background: C.accent, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Run Bulk Assignment</button>
          <div style={{ marginTop: 10, padding: "9px 11px", borderRadius: 8, background: "#D1FAE5", fontSize: 11, color: "#065F46" }}>✓ Last run 2 hr ago — 42 providers assigned</div>
        </Card>
        <Card>
          <SectionTitle>🤖 AI/ML Testing Rate</SectionTitle>
          <div style={{ textAlign: "center", padding: "14px 0 10px" }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: C.teal, lineHeight: 1 }}>99.9%</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Overall Model Accuracy</div>
          </div>
          {[
            { label: "Recommendation Engine", acc: "99.2%" },
            { label: "Fraud Detection",        acc: "99.8%" },
            { label: "Demand Forecasting",     acc: "97.4%" },
            { label: "Quality Scoring",        acc: "98.6%" },
          ].map(m => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, color: C.mid }}>{m.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.teal }}>{m.acc}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 6 — CAMPAIGN CENTER
// ═══════════════════════════════════════════════════════════════════════════
const campaigns = [
  { name: "Summer Feast Festival", type: "Promotion",  reach: "12,400", conv: "2,840", budget: "$8,200",  spent: "$5,100",  status: "active"  },
  { name: "New Chef Welcome",       type: "Onboarding", reach: "3,200",  conv: "890",   budget: "$2,000",  spent: "$1,800",  status: "active"  },
  { name: "Loyalty Rewards Q3",     type: "Retention",  reach: "8,900",  conv: "3,200", budget: "$5,000",  spent: "$2,300",  status: "paused"  },
  { name: "Winter Special Menu",    type: "Seasonal",   reach: "—",      conv: "—",     budget: "$4,500",  spent: "$0",      status: "draft"   },
  { name: "Referral Growth Drive",  type: "Growth",     reach: "22,100", conv: "5,400", budget: "$12,000", spent: "$10,800", status: "active"  },
  { name: "Chef Spotlight Series",  type: "Brand",      reach: "9,300",  conv: "1,100", budget: "$3,200",  spent: "$3,200",  status: "ended"   },
];

function CampaignCenter() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? campaigns : campaigns.filter(c => c.status === filter);
  return (
    <div>
      <PageHeader title="Campaign Center" subtitle="Manage all promotions, referrals, and outreach" action="+ New Campaign" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 18 }}>
        <KPICard label="Total Budget" value="$68,400" color={C.teal}   />
        <KPICard label="Amount Spent" value="$41,200" color={C.accent} />
        <KPICard label="Total Reach"  value="125k"    color={C.info}   />
        <KPICard label="Conversions"  value="18,240"  color="#F59E0B"  />
      </div>
      <Card>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3" style={{ marginBottom: 16 }}>
          <SectionTitle>All Campaigns</SectionTitle>
          <div className="flex gap-1.5 overflow-x-auto sm:gap-1.5" style={{ paddingBottom: 2 }}>
            {["all", "active", "paused", "draft", "ended"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, background: filter === f ? C.sidebar : C.border, color: filter === f ? "#fff" : C.mid, textTransform: "capitalize", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</button>
            ))}
          </div>
        </div>
        <Table
          headers={["Campaign", "Type", "Reach", "Conversions", "Budget", "Spent", "Status", ""]}
          rows={visible.map((c, i) => (
            <TR key={i}>
              <TD bold>{c.name}</TD>
              <td style={{ padding: "10px 12px" }}><Badge text={c.type} type="info" /></td>
              <TD color={C.mid}>{c.reach}</TD>
              <TD bold color={C.teal}>{c.conv}</TD>
              <TD>{c.budget}</TD>
              <TD color={C.accent}>{c.spent}</TD>
              <td style={{ padding: "10px 12px" }}><Badge text={c.status} type={c.status === "active" ? "success" : c.status === "paused" ? "warning" : c.status === "ended" ? "danger" : "default"} /></td>
              <td style={{ padding: "10px 12px" }}><button style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.mid }}>Edit</button></td>
            </TR>
          ))}
        />
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 7 — SECURITY & AUDIT
// ═══════════════════════════════════════════════════════════════════════════
const auditLogs = [
  { user: "Admin Kim S.",  action: "Changed user role",        resource: "User #4421",  ip: "192.168.1.10", time: "10:42 AM"  },
  { user: "Admin Lee P.",  action: "Exported user data CSV",   resource: "Users export", ip: "10.0.0.5",     time: "09:15 AM"  },
  { user: "Chef Maria R.", action: "Updated menu items",       resource: "Menu #88",     ip: "172.16.0.3",   time: "08:30 AM"  },
  { user: "System",        action: "Auto-backup completed",    resource: "DB Snapshot",  ip: "—",            time: "03:00 AM"  },
  { user: "Admin Kim S.",  action: "Deleted expired campaign", resource: "Campaign #12", ip: "192.168.1.10", time: "Yesterday" },
  { user: "Admin Lee P.",  action: "Reset user password",      resource: "User #3210",   ip: "10.0.0.5",     time: "Yesterday" },
];
const secRoles = [
  { role: "Super Admin", count: 2,     color: "#EF4444", max: 15000 },
  { role: "Admin",       count: 8,     color: C.accent,  max: 15000 },
  { role: "Provider",    count: 1482,  color: C.teal,    max: 15000 },
  { role: "Customer",    count: 10998, color: C.info,    max: 15000 },
];
const secPolicies = [
  { name: "Two-Factor Authentication (2FA)",  on: true  },
  { name: "Session Timeout (30 min idle)",    on: true  },
  { name: "IP Allowlist Enforcement",         on: false },
  { name: "Data Encryption at Rest",          on: true  },
  { name: "Rate Limiting (API)",              on: true  },
];

function SecurityAudit() {
  const [tab, setTab] = useState("global");
  return (
    <div>
      <PageHeader title="System Security & Audit" subtitle="Access logs, role policies and data governance" action="+ Add Policy" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: 14, marginBottom: 18 }}>
        <KPICard label="Security Score"  value="96/100" color={C.teal}   />
        <KPICard label="Active Policies" value="24"     color={C.info}   />
        <KPICard label="Alerts (24 hr)"  value="3"      color={C.accent} />
        <KPICard label="Admin Sessions"  value="7"      color="#F59E0B"  />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]" style={{ gap: 14 }}>
        <Card>
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[["global", "Global Log"], ["admin", "Admin Audit"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: tab === id ? C.sidebar : C.border, color: tab === id ? "#fff" : C.mid }}>{label}</button>
            ))}
          </div>
          <Table
            headers={["User", "Action", "Resource", "IP Address", "Time"]}
            rows={auditLogs.map((l, i) => (
              <TR key={i}>
                <TD bold>{l.user}</TD>
                <TD color={C.mid}>{l.action}</TD>
                <TD color={C.muted}>{l.resource}</TD>
                <TD mono color={C.mid}>{l.ip}</TD>
                <TD color={C.muted}>{l.time}</TD>
              </TR>
            ))}
          />
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionTitle>Role Breakdown</SectionTitle>
            {secRoles.map(r => (
              <div key={r.role} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: C.mid }}>{r.role}</span>
                  <span style={{ fontWeight: 700 }}>{r.count.toLocaleString()}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: C.border }}>
                  <div style={{ height: "100%", borderRadius: 3, background: r.color, width: `${(r.count / r.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <SectionTitle>Security Policies</SectionTitle>
            {secPolicies.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < secPolicies.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 12, color: C.mid, maxWidth: 160 }}>{p.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: p.on ? "#16A34A" : C.muted }}>{p.on ? "ENABLED" : "OFF"}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE 8 — GENERAL SETTINGS
// ═══════════════════════════════════════════════════════════════════════════
function GeneralSettings() {
  const [name,        setName]        = useState("Dine with Mee");
  const [tagline,     setTagline]     = useState("Connecting chefs & food lovers");
  const [darkMode,    setDarkMode]    = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [twoFA,       setTwoFA]       = useState(true);
  const [autoBackup,  setAutoBackup]  = useState(true);

  const plans = [
    { name: "Starter",    price: "$99/mo",  desc: "Up to 500 users",   active: false },
    { name: "Growth",     price: "$299/mo", desc: "Up to 5,000 users", active: true  },
    { name: "Enterprise", price: "Custom",  desc: "Unlimited users",   active: false },
  ];

  return (
    <div>
      <PageHeader title="General Settings" subtitle="Platform configuration, branding and preferences" action="Save Changes" />
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14, marginBottom: 14 }}>
        <Card>
          <SectionTitle>Platform Branding</SectionTitle>
          {[{ label: "Platform Name", value: name, onChange: setName }, { label: "Tagline", value: tagline, onChange: setTagline }].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5 }}>{f.label}</label>
              <input value={f.value} onChange={e => f.onChange(e.target.value)} style={{ width: "100%", padding: "8px 11px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13, boxSizing: "border-box", outline: "none" }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 8 }}>Brand Color</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[C.sidebar, C.accent, C.teal, C.info, "#EC4899", "#F59E0B"].map((col, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 7, background: col, cursor: "pointer", outline: col === C.sidebar ? `3px solid ${C.dark}` : "3px solid transparent", outlineOffset: 2 }} />
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 6 }}>Logo Upload</label>
            <div style={{ border: `2px dashed ${C.border}`, borderRadius: 8, padding: 14, textAlign: "center", cursor: "pointer", fontSize: 12, color: C.muted }}>📁 Click or drag to upload logo (PNG, SVG)</div>
          </div>
        </Card>
        <Card>
          <SectionTitle>System Preferences</SectionTitle>
          {[
            { label: "Dark Mode",           desc: "Enable dark theme across admin portal",       val: darkMode,    set: setDarkMode    },
            { label: "Email Notifications", desc: "Get alerts for critical system events",       val: emailNotifs, set: setEmailNotifs },
            { label: "Maintenance Mode",    desc: "Take the platform temporarily offline",       val: maintenance, set: setMaintenance },
            { label: "Enforce 2FA",         desc: "Require two-factor auth for all admin users", val: twoFA,       set: setTwoFA       },
            { label: "Automated Backups",   desc: "Run daily DB snapshots at 03:00 UTC",         val: autoBackup,  set: setAutoBackup  },
          ].map((pref, i, arr) => (
            <div key={pref.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{pref.label}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{pref.desc}</div>
              </div>
              <Toggle value={pref.val} onChange={pref.set} />
            </div>
          ))}
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 14 }}>
        <Card>
          <SectionTitle>Billing Cycles</SectionTitle>
          {plans.map(p => (
            <div key={p.name} style={{ padding: 13, borderRadius: 10, marginBottom: 8, border: p.active ? `2px solid ${C.teal}` : `1px solid ${C.border}`, background: p.active ? "#F0FDF4" : C.card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.desc}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: p.active ? C.teal : C.dark }}>{p.price}</div>
                {p.active ? <Badge text="Current Plan" type="success" /> : <button style={{ padding: "3px 8px", borderRadius: 6, border: `1px solid ${C.border}`, background: "none", fontSize: 11, cursor: "pointer", color: C.mid, marginTop: 4 }}>Upgrade</button>}
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>Next billing: <strong>August 25, 2026</strong> · $299.00</div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionTitle>Revenue Growth</SectionTitle>
            <ResponsiveContainer width="100%" height={110}>
              <LineChart data={growthData}>
                <Line type="monotone" dataKey="revenue" stroke={C.teal} strokeWidth={2} dot={false} />
                <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <SectionTitle>Need Config Help?</SectionTitle>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 12, lineHeight: 1.5 }}>Reach out to the Dine with Mee team for support and onboarding guidance.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[{ icon: "📚", label: "Documentation & Guides" }, { icon: "💬", label: "Contact Support" }, { icon: "🎓", label: "API Reference" }].map(link => (
                <div key={link.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 8, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 12, color: C.dark }}>
                  <span>{link.icon}</span><span>{link.label}</span><span style={{ marginLeft: "auto", color: C.muted }}>→</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminAll() {
  const [active, setActive] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const PAGES = {
    overview:   <Overview />,
    users:      <UserDirectory />,
    providers:  <ProviderManagement />,
    meals:      <MealManagement />,
    ingredients:<IngredientsManagement />,
    moderation: <ContentModeration />,
    components: <SystemComponents />,
    campaigns:  <CampaignCenter />,
    security:   <SecurityAudit />,
    settings:   <GeneralSettings />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: C.bg }}>
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-[210px]">
        {/* Mobile/tablet top bar — hidden from lg up, where the sidebar is always docked */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-20" style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <button onClick={() => setMobileNavOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.dark, padding: 4 }}>
            <Ic d={P.menu} size={20} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🍽</div>
            <span style={{ fontWeight: 800, fontSize: 13, color: C.dark }}>Dine with Mee</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7 lg:py-[26px]">
          {PAGES[active]}
        </main>
      </div>
    </div>
  );
}