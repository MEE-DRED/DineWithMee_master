import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Icon primitive ───────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, className = "", strokeWidth = 1.8 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

// ─── Icon paths ───────────────────────────────────────────────────────────────
const IC = {
  dashboard:  ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  meal:       ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", "M7 2v20", "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"],
  health:     "M22 12h-4l-3 9L9 3l-3 9H2",
  consult:    ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  orders:     ["M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"],
  settings:   ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  bell:       ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  search:     ["M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M21 21l-4.35-4.35"],
  plus:       "M12 5v14M5 12h14",
  filter:     ["M22 3H2l8 9.46V19l4 2V12.46L22 3"],
  chevDown:   "M6 9l6 6 6-6",
  chevRight:  "M9 18l6-6-6-6",
  truck:      ["M1 3h15v13H1z", "M16 8h4l3 3v5h-7V8z", "M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", "M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
  check:      "M20 6L9 17l-5-5",
  clock:      ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  refresh:    ["M23 4v6h-6", "M1 20v-6h6", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"],
  package:    ["M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", "M3.27 6.96L12 12.01l8.73-5.05", "M12 22.08V12"],
  star:       "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  xCircle:    ["M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0z", "M15 9l-6 6M9 9l6 6"],
  hamburger:  "M3 12h18M3 6h18M3 18h18",
  eye:        ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  repeat:     ["M17 1l4 4-4 4", "M3 11V9a4 4 0 0 1 4-4h14", "M7 23l-4-4 4-4", "M21 13v2a4 4 0 0 1-4 4H3"],
  leaf:       "M2 22 16 8M16.5 2C10 2 6 6 6 12c0 3 1.5 5.5 4 7 .5-4.5 3-8.5 6.5-11",
  drop:       "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV = [
  { label: "Dashboard",     icon: IC.dashboard, path: "/dashboard"     },
  { label: "Meal Plans",    icon: IC.meal,      path: "/meals"         },
  { label: "Health Stats",  icon: IC.health,    path: "/healthprofile" },
  { label: "Consultations", icon: IC.consult,   path: "/consultations" },
  { label: "Orders",        icon: IC.orders,    path: "/orders"        },
  { label: "Settings",      icon: IC.settings,  path: "/security"      },
];

const ORDERS = [
  {
    id: "ORD-4821",
    date: "Jan 18, 2024",
    items: ["Omega-3 Fish Oil 1000mg ×2", "Vitamin D3 + K2 5000IU ×1"],
    total: "$47.90",
    status: "Delivered",
    eta: "Delivered Jan 21",
    rating: 5,
    pharmacy: "MedPlus Pharmacy",
    tags: ["Supplement"],
  },
  {
    id: "ORD-4756",
    date: "Jan 10, 2024",
    items: ["Metformin ER 500mg ×30", "Blood Glucose Test Strips ×50"],
    total: "$29.40",
    status: "In Transit",
    eta: "Expected Jan 20",
    rating: null,
    pharmacy: "ClearRx Direct",
    tags: ["Prescription", "Medical"],
  },
  {
    id: "ORD-4690",
    date: "Dec 28, 2023",
    items: ["Magnesium Glycinate 400mg ×1", "CoQ10 200mg ×1", "Zinc Bisglycinate ×1"],
    total: "$63.15",
    status: "Delivered",
    eta: "Delivered Jan 2",
    rating: 4,
    pharmacy: "NutriDirect Co.",
    tags: ["Supplement"],
  },
  {
    id: "ORD-4601",
    date: "Dec 15, 2023",
    items: ["Omega-3 Fish Oil 1000mg ×2"],
    total: "$22.50",
    status: "Cancelled",
    eta: "Cancelled Dec 16",
    rating: null,
    pharmacy: "MedPlus Pharmacy",
    tags: ["Supplement"],
  },
];

const SUMMARY_CARDS = [
  { label: "Total Orders",    value: "24",    sub: "Since Jan 2023",   icon: IC.package,  color: "bg-[#f0ede8]", iconColor: "text-[#c96a4f]" },
  { label: "Active Refills",  value: "3",     sub: "Auto-ship enabled", icon: IC.repeat,   color: "bg-[#e8f5f0]", iconColor: "text-[#3a7d5a]" },
  { label: "Avg. Delivery",   value: "3.2d",  sub: "Last 90 days",     icon: IC.truck,    color: "bg-[#e8f0ef]", iconColor: "text-[#1a6a7e]" },
  { label: "Total Spent",     value: "$618",  sub: "This year",        icon: IC.leaf,     color: "bg-[#fdf3e8]", iconColor: "text-[#b87333]" },
];

const FILTERS = ["All", "Delivered", "In Transit", "Cancelled"];

const RECOMMENDED = [
  { name: "Ashwagandha KSM-66", dose: "300mg • Stress & Recovery", price: "$18.99", badge: "Popular" },
  { name: "Collagen Peptides",  dose: "10g • Joint & Skin Support",  price: "$34.50", badge: "New"     },
  { name: "Berberine HCl",      dose: "500mg • Glucose Support",    price: "$24.00", badge: "Matched"  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-emerald-50 text-emerald-600",
    "In Transit": "bg-blue-50 text-blue-600",
    Cancelled: "bg-red-50 text-red-500",
    Processing: "bg-amber-50 text-amber-600",
  };
  const icons = {
    Delivered: IC.check,
    "In Transit": IC.truck,
    Cancelled: IC.xCircle,
    Processing: IC.clock,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${styles[status] ?? "bg-gray-100 text-gray-500"}`}>
      <Icon d={icons[status] ?? IC.clock} size={11} strokeWidth={2.2} />
      {status}
    </span>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function Stars({ n, total = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Icon key={i} d={IC.star} size={12}
          className={i < n ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

// ─── Order card ───────────────────────────────────────────────────────────────
function OrderCard({ order, expanded, onToggle }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md overflow-hidden`}>
      {/* Header row */}
      <div className="flex items-start sm:items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer select-none" onClick={onToggle}>
        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
            <Icon d={IC.package} size={17} className="text-[#c96a4f]" />
          </div>
          {/* Meta */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="font-extrabold text-[#1a2e2a] text-sm">{order.id}</span>
              {order.tags.map(t => (
                <span key={t} className="text-[9px] font-bold uppercase tracking-widest bg-[#f0ede8] text-[#c96a4f] px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
            <p className="text-gray-400 text-xs truncate">{order.pharmacy} · {order.date}</p>
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <StatusBadge status={order.status} />
            <span className="text-xs text-gray-400">{order.eta}</span>
          </div>
          <span className="font-extrabold text-[#1a2e2a] text-sm">{order.total}</span>
          <Icon d={IC.chevDown} size={15} className={`text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Mobile status */}
      <div className="sm:hidden px-5 pb-3 flex items-center justify-between">
        <StatusBadge status={order.status} />
        <span className="text-xs text-gray-400">{order.eta}</span>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-4 animate-fadeIn">
          {/* Items */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Items</p>
            <ul className="space-y-1.5">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#1a2e2a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c96a4f] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline strip */}
          <div className="flex items-center gap-0">
            {["Ordered", "Packed", "Shipped", "Delivered"].map((step, i, arr) => {
              const stepIdx = i;
              const statusMap = { Delivered: 4, "In Transit": 2, Processing: 1, Cancelled: 0 };
              const active = stepIdx < (statusMap[order.status] ?? 0);
              const last = i === arr.length - 1;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${active ? "bg-[#1a2e2a]" : "bg-gray-100"}`}>
                      {active && <Icon d={IC.check} size={10} className="text-white" strokeWidth={2.5} />}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 whitespace-nowrap font-semibold">{step}</span>
                  </div>
                  {!last && <div className={`flex-1 h-0.5 mb-4 mx-1 ${active ? "bg-[#1a2e2a]" : "bg-gray-100"}`} />}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {order.rating ? (
              <div className="flex items-center gap-2">
                <Stars n={order.rating} />
                <span className="text-xs text-gray-400">Your rating</span>
              </div>
            ) : order.status === "Delivered" ? (
              <button className="text-xs font-semibold text-[#c96a4f] hover:underline flex items-center gap-1">
                <Icon d={IC.star} size={12} className="text-[#c96a4f]" /> Rate this order
              </button>
            ) : <span />}

            <div className="flex gap-2">
              {order.status === "Delivered" && (
                <button className="flex items-center gap-1.5 text-xs font-bold text-[#1a2e2a] border border-gray-200 px-3 py-1.5 rounded-xl hover:border-[#1a2e2a] transition-colors">
                  <Icon d={IC.repeat} size={12} /> Reorder
                </button>
              )}
              <button className="flex items-center gap-1.5 text-xs font-bold text-[#1a2e2a] border border-gray-200 px-3 py-1.5 rounded-xl hover:border-[#1a2e2a] transition-colors">
                <Icon d={IC.eye} size={12} /> View Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState("ORD-4756");
  const [searchQ, setSearchQ] = useState("");
  const location = useLocation();

  const filtered = ORDERS.filter(o => {
    const matchFilter = activeFilter === "All" || o.status === activeFilter;
    const matchSearch = searchQ === "" || o.id.toLowerCase().includes(searchQ.toLowerCase()) ||
      o.items.some(i => i.toLowerCase().includes(searchQ.toLowerCase())) ||
      o.pharmacy.toLowerCase().includes(searchQ.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f3ef] font-sans flex flex-col">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .animate-fadeIn { animation: fadeIn .18s ease forwards; }
      `}</style>

      {/* ── Mobile topbar ── */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Icon d={IC.hamburger} size={20} className="text-[#1a2e2a]" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#c96a4f] flex items-center justify-center shadow">
            <span className="text-white text-xs font-extrabold">D</span>
          </div>
          <span className="font-extrabold text-[#1a2e2a] text-sm">Dine with Mee</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative">
            <Icon d={IC.bell} size={18} className="text-[#1a2e2a]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#c96a4f] rounded-full" />
          </button>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 to-amber-400" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-30 w-56 bg-white flex flex-col pt-6 pb-4
          shadow-xl lg:shadow-none transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2.5 px-5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#c96a4f] flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-sm">D</span>
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-[#1a2e2a] text-sm">Dine with Mee</p>
              <p className="text-[10px] text-gray-400 font-medium">Eating Things Strong</p>
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-0.5">
            {NAV.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#1a2e2a] text-white font-semibold shadow-sm"
                      : "text-gray-400 hover:text-[#1a2e2a] hover:bg-gray-50"
                  }`}
                >
                  <Icon d={item.icon} size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-3 mt-4">
            <button className="w-full bg-[#1a2e2a] hover:bg-[#243d38] text-white font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
              <Icon d={IC.plus} size={15} /> New Meal Plan
            </button>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

          {/* Desktop topbar */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <h1 className="text-2xl font-extrabold text-[#1a2e2a] tracking-tight">Orders</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon d={IC.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  type="text"
                  placeholder="Search orders…"
                  className="pl-9 pr-4 py-2 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 w-52 placeholder:text-gray-400"
                />
              </div>
              <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition">
                <Icon d={IC.bell} size={16} className="text-[#1a2e2a]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c96a4f] rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-white shadow" />
            </div>
          </div>

          {/* Mobile title + search */}
          <div className="lg:hidden mb-5 space-y-3">
            <h1 className="text-xl font-extrabold text-[#1a2e2a]">Orders</h1>
            <div className="relative">
              <Icon d={IC.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                type="text"
                placeholder="Search orders…"
                className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm text-gray-600 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c96a4f]/30 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* ── Summary cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {SUMMARY_CARDS.map(card => (
              <div key={card.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
                <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center`}>
                  <Icon d={card.icon} size={16} className={card.iconColor} />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-[#1a2e2a] leading-tight">{card.value}</p>
                  <p className="text-[11px] font-semibold text-gray-400 mt-0.5">{card.label}</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Two-column body ── */}
          <div className="flex flex-col xl:flex-row gap-6">

            {/* LEFT — Order list */}
            <div className="flex-1 min-w-0">
              {/* Filters + count */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        activeFilter === f
                          ? "bg-[#1a2e2a] text-white shadow-sm"
                          : "bg-white text-gray-400 border border-gray-200 hover:border-[#1a2e2a] hover:text-[#1a2e2a]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">{filtered.length} order{filtered.length !== 1 ? "s" : ""}</span>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-[#1a2e2a] border border-gray-200 bg-white px-3 py-1.5 rounded-xl hover:border-[#1a2e2a] transition-colors">
                    <Icon d={IC.filter} size={12} /> Filter
                  </button>
                </div>
              </div>

              {/* Order cards */}
              <div className="space-y-3">
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                    <Icon d={IC.package} size={32} className="text-gray-200 mx-auto mb-3" />
                    <p className="font-bold text-gray-400 text-sm">No orders found</p>
                    <p className="text-gray-300 text-xs mt-1">Try adjusting your filter or search</p>
                  </div>
                ) : (
                  filtered.map(order => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      expanded={expandedId === order.id}
                      onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* RIGHT — Sidebar panels */}
            <div className="w-full xl:w-72 flex-shrink-0 space-y-4">

              {/* Active Refills */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-extrabold text-[#1a2e2a] text-base">Active Refills</h2>
                  <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-full">3 Active</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Metformin ER 500mg", cycle: "Monthly", next: "Feb 10", progress: 72 },
                    { name: "Omega-3 Fish Oil",   cycle: "Monthly", next: "Feb 18", progress: 45 },
                    { name: "Vitamin D3 + K2",    cycle: "Bi-monthly", next: "Mar 5", progress: 20 },
                  ].map(r => (
                    <div key={r.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-[#1a2e2a] leading-tight">{r.name}</p>
                        <span className="text-[10px] text-gray-400 font-medium">{r.cycle}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#c96a4f] transition-all duration-700"
                          style={{ width: `${r.progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-400">Next refill: <span className="font-semibold text-[#1a2e2a]">{r.next}</span></p>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full text-xs font-bold text-[#c96a4f] border border-[#c96a4f]/30 py-2.5 rounded-xl hover:bg-[#c96a4f]/5 transition-colors">
                  Manage Refills
                </button>
              </div>

              {/* Recommended for You */}
              <div className="bg-[#1a2e2a] rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-extrabold text-base">Recommended</h2>
                  <Icon d={IC.drop} size={16} className="text-[#c96a4f]" />
                </div>
                <p className="text-[#a8bdb8] text-xs mb-4 leading-relaxed">Based on your health profile and recent consultations.</p>
                <div className="space-y-3">
                  {RECOMMENDED.map(item => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon d={IC.leaf} size={15} className="text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white leading-tight truncate">{item.name}</p>
                        <p className="text-[10px] text-[#a8bdb8] truncate">{item.dose}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-extrabold text-white">{item.price}</p>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          item.badge === "Popular" ? "bg-amber-500/20 text-amber-400" :
                          item.badge === "New"     ? "bg-blue-500/20 text-blue-400" :
                                                     "bg-emerald-500/20 text-emerald-400"
                        }`}>{item.badge}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full bg-white text-[#1a2e2a] font-bold text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Shop Supplements
                </button>
              </div>

              {/* Delivery address */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-extrabold text-[#1a2e2a] text-sm">Default Address</h2>
                  <button className="text-[11px] font-bold text-[#c96a4f] hover:underline">Edit</button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon d={IC.truck} size={14} className="text-[#c96a4f]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a2e2a]">Sarah M.</p>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                      14 Wellspring Crescent<br />
                      Suite 3B, Melbourne VIC 3000
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
