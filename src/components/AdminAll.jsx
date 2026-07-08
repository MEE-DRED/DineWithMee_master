import { useState, useRef } from "react";
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
};

// ─── Meals API endpoint ──────────────────────────────────────────────────────
const MEALS_ENDPOINT = "https://new-dine-with-mee-backend.onrender.com/api/v1/meals";

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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
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
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${C.border}` }}>
          {headers.map(h => (
            <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: C.muted, fontWeight: 500 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
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
function Sidebar({ active, setActive }) {
  return (
    <aside style={{
      width: 210, background: C.sidebar, color: "#fff",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "fixed", left: 0, top: 0, zIndex: 20,
    }}>
      <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
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
      </div>

      <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", padding: "8px 12px 4px", textTransform: "uppercase", letterSpacing: ".08em" }}>Main Menu</div>
        {NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
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

function Overview() {
  return (
    <div>
      <PageHeader title="System Overview" subtitle="Live platform performance at a glance" action="+ Generate Report" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        <KPICard label="Active Users"  value="14.2k"  delta="+8.3% vs last month"  color={C.teal}   />
        <KPICard label="Providers"     value="1,482"  delta="+3.1% vs last month"  color={C.info}   />
        <KPICard label="Orders Today"  value="3,291"  delta="+12.4% vs yesterday"  color={C.accent} />
        <KPICard label="Revenue MTD"   value="$84.2k" delta="+5.7% vs last month"  color="#EC4899"  />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14, marginBottom: 18 }}>
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
//  PAGE 2 — USER DIRECTORY
// ═══════════════════════════════════════════════════════════════════════════
const allUsers = [
  { id: 1, name: "Maria Rodriguez", role: "Chef",     status: "active",   joined: "Jan 2024", rating: 4.9 },
  { id: 2, name: "James Okafor",    role: "Chef",     status: "active",   joined: "Feb 2024", rating: 4.7 },
  { id: 3, name: "Sarah Chen",      role: "Customer", status: "active",   joined: "Mar 2024", rating: null },
  { id: 4, name: "David Kim",       role: "Chef",     status: "pending",  joined: "Apr 2024", rating: null },
  { id: 5, name: "Emma Wilson",     role: "Customer", status: "inactive", joined: "Dec 2023", rating: null },
  { id: 6, name: "Carlos Torres",   role: "Chef",     status: "active",   joined: "Jan 2024", rating: 4.5 },
  { id: 7, name: "Aisha Brown",     role: "Chef",     status: "active",   joined: "Mar 2024", rating: 4.8 },
];
const applications = [
  { name: "Luca Ferrari", cuisine: "Italian",  time: "2 hr ago"   },
  { name: "Yuna Park",    cuisine: "Korean",   time: "Yesterday"  },
  { name: "Omar Shaikh",  cuisine: "Moroccan", time: "2 days ago" },
];
const avatarColors = [C.teal, C.accent, C.info, "#EC4899", "#F59E0B", "#8B5CF6", "#06B6D4"];

function UserDirectory() {
  const [search, setSearch] = useState("");
  const filtered = allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <PageHeader title="User Directory" subtitle="Manage all chefs, customers and admins" action="+ Invite User" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        <KPICard label="Total Users"  value="12,482" delta="+6.2%" color={C.teal}   />
        <KPICard label="Active Chefs" value="8,291"  delta="+4.1%" color={C.info}   />
        <KPICard label="Customers"    value="4,103k" delta="+7.8%" color={C.accent} />
        <KPICard label="Total Spend"  value="$84.2k" delta="+5.7%" color="#EC4899"  />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <SectionTitle>Staffed Providers</SectionTitle>
            <input placeholder="🔍 Search users…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 12, outline: "none", width: 180 }} />
          </div>
          <Table
            headers={["Name", "Role", "Status", "Joined", "Rating"]}
            rows={filtered.map((u, i) => (
              <TR key={u.id}>
                <td style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Avatar name={u.name} color={avatarColors[i % avatarColors.length]} />
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: "10px 12px" }}><Badge text={u.role} type={u.role === "Chef" ? "info" : "default"} /></td>
                <td style={{ padding: "10px 12px" }}><Badge text={u.status} type={u.status === "active" ? "success" : u.status === "pending" ? "warning" : "danger"} /></td>
                <TD color={C.muted}>{u.joined}</TD>
                <TD color="#F59E0B">{u.rating ? `⭐ ${u.rating}` : "—"}</TD>
              </TR>
            ))}
          />
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <SectionTitle>New Applications</SectionTitle>
            {applications.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < applications.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Avatar name={a.name} color={C.accent} size={30} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{a.name}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{a.cuisine} · {a.time}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <button style={{ padding: "3px 9px", borderRadius: 6, border: "none", background: "#D1FAE5", color: "#059669", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>✓</button>
                  <button style={{ padding: "3px 9px", borderRadius: 6, border: "none", background: "#FEE2E2", color: "#DC2626", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>✗</button>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <SectionTitle>Growth Insights</SectionTitle>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={growthData.slice(-5)}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="users" fill={C.teal} radius={[4, 4, 0, 0]} name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        <KPICard label="Total Providers" value="1,482" delta="+3.1%" color={C.teal}   />
        <KPICard label="Active Today"    value="891"   delta="+6.4%" color={C.info}   />
        <KPICard label="Pending Review"  value="42"                  color={C.accent} />
        <KPICard label="Avg Rating"      value="4.7★"               color="#F59E0B"  />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
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
function MealCard({ meal, onView, onDelete }) {
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
        <button onClick={() => onDelete(meal._localId)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${C.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.danger }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
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
  const [postedMeals, setPostedMeals] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [viewMeal, setViewMeal]     = useState(null);
  const [toasts, setToasts]         = useState([]);
  const toastSeq                    = useRef(0);
  const fileInputRef                = useRef(null);

  // Toast helpers
  const addToast = (msg, type = "success") => {
    const id = ++toastSeq.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = e => {
    if (e.target.files?.[0]) setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.kcal) {
      addToast("Meal name and calories are required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (k !== "imageFile" && v) body.append(k, v); });
      if (formData.imageFile) body.append("image", formData.imageFile);

      const res  = await fetch(MEALS_ENDPOINT, { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");
      setPostedMeals(prev => [{ ...formData, _localId: Date.now(), serverRecord: data.meal || null }, ...prev]);
      addToast("Meal posted to server successfully!");
    } catch {
      // Offline / CORS fallback — store locally
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
    } finally {
      setSubmitting(false);
      setFormData(EMPTY_FORM);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTab("list");
    }
  };

  const deleteLocal = id => {
    setPostedMeals(prev => prev.filter(m => m._localId !== id));
    addToast("Meal removed.", "info");
  };

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 21, fontWeight: 800, color: C.dark, margin: 0 }}>Meal Management</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 0" }}>Create and manage meal entries for the platform</p>
        </div>
        {/* Tab switcher */}
        <div style={{ display: "flex", background: "#F3F2EE", padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
          {[["list", "Active Meals", P.list], ["form", "+ Add Meal", P.plus]].map(([id, label, icon]) => (
            <button key={id} onClick={() => setTab(id)} style={{
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
            <KPICard label="Total Meals"   value={postedMeals.length || "0"} color={C.teal}   />
            <KPICard label="Avg Calories"  value={postedMeals.length ? Math.round(postedMeals.reduce((a, m) => a + (+m.kcal || 0), 0) / postedMeals.length) + " kcal" : "—"} color={C.accent} />
            <KPICard label="Categories"    value={new Set(postedMeals.map(m => m.category)).size || "—"} color={C.info}   />
            <KPICard label="Server Synced" value={postedMeals.filter(m => !m.mocked).length} color="#F59E0B" />
          </div>

          {postedMeals.length === 0 ? (
            <Card style={{ padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🥘</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 6 }}>No meals posted yet</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 18 }}>Create your first meal entry to populate the platform menu.</div>
              <button onClick={() => setTab("form")} style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: C.sidebar, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Post First Meal
              </button>
            </Card>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {postedMeals.map(meal => (
                <MealCard key={meal._localId} meal={meal} onView={setViewMeal} onDelete={deleteLocal} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── FORM TAB ── */}
      {tab === "form" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          {/* Form */}
          <Card style={{ padding: 24 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>New Meal Entry</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Fill in the details below to add a meal to the platform</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 14 }}>
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
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0 1 10 10" /></svg> Posting…</>
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
              <span style={{ color: "#6EE7B7" }}>POST</span> /api/v1/meals<br />
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
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,.6)", wordBreak: "break-all" }}>new-dine-with-mee-backend.onrender.com</span>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {viewMeal && <MealDetailModal meal={viewMeal} onClose={() => setViewMeal(null)} />}

      {/* Toast stack */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", maxWidth: 320 }}>
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
//  PAGE 5 — SYSTEM COMPONENTS LIBRARY
// ═══════════════════════════════════════════════════════════════════════════
const devices = [
  { name: "Kitchen Temp Sensor A1", status: "online",  data: "72 °F"    },
  { name: "Chef Wristband #42",     status: "online",  data: "Active"   },
  { name: "Smart Scale Unit 3",     status: "offline", data: "—"        },
  { name: "Timer Display B2",       status: "online",  data: "Running"  },
  { name: "IoT Hub Node #7",        status: "online",  data: "14 peers" },
];

function SystemComponents() {
  return (
    <div>
      <PageHeader title="System Components Library" subtitle="Health monitoring, wearable sync, and AI tooling" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Card>
          <SectionTitle>🫀 System Health Insights</SectionTitle>
          {[
            { metric: "API Uptime",        value: "99.97%", color: C.teal,   bar: 99 },
            { metric: "Avg Response Time", value: "142 ms", color: C.info,   bar: 85 },
            { metric: "Error Rate",        value: "0.03%",  color: C.accent, bar: 3  },
            { metric: "DB Pool Usage",     value: "48/100", color: "#F59E0B",bar: 48 },
            { metric: "Cache Hit Rate",    value: "91.2%",  color: C.teal,   bar: 91 },
          ].map(m => (
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <SectionTitle>📋 Bulk Assignment Console</SectionTitle>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>Assign providers to campaigns or regions in bulk</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        <KPICard label="Total Budget" value="$68,400" color={C.teal}   />
        <KPICard label="Amount Spent" value="$41,200" color={C.accent} />
        <KPICard label="Total Reach"  value="125k"    color={C.info}   />
        <KPICard label="Conversions"  value="18,240"  color="#F59E0B"  />
      </div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <SectionTitle>All Campaigns</SectionTitle>
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "active", "paused", "draft", "ended"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, background: filter === f ? C.sidebar : C.border, color: filter === f ? "#fff" : C.mid, textTransform: "capitalize" }}>{f}</button>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        <KPICard label="Security Score"  value="96/100" color={C.teal}   />
        <KPICard label="Active Policies" value="24"     color={C.info}   />
        <KPICard label="Alerts (24 hr)"  value="3"      color={C.accent} />
        <KPICard label="Admin Sessions"  value="7"      color="#F59E0B"  />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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

  const PAGES = {
    overview:   <Overview />,
    users:      <UserDirectory />,
    providers:  <ProviderManagement />,
    meals:      <MealManagement />,
    components: <SystemComponents />,
    campaigns:  <CampaignCenter />,
    security:   <SecurityAudit />,
    settings:   <GeneralSettings />,
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: C.bg }}>
      <Sidebar active={active} setActive={setActive} />
      <main style={{ marginLeft: 210, flex: 1, overflowY: "auto", padding: "26px 28px" }}>
        {PAGES[active]}
      </main>
    </div>
  );
}