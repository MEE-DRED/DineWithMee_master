import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  Menu: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Gear: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
    </svg>
  ),
  MealPlan: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
        d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  Health: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Subscription: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
      <path d="M2 10h20" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Consult: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  Help: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#2d6a4f" />
      <path d="M7 13l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  XCircle: () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#d1d5db" />
      <path d="M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Pencil: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 013.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  ArrowUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  Drop: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
};

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",     icon: "Dashboard",    path: "/dashboard"     },
  { label: "Meal Plans",    icon: "MealPlan",     path: "/meals"         },
  { label: "Health Stats",  icon: "Health",       path: "/healthprofile" },
  { label: "Subscription",  icon: "Subscription", path: "/subscriptions" },
  { label: "Consultations", icon: "Consult",      path: "/consultations" },
];

// ─── Billing History Data ──────────────────────────────────────────────────────
const BILLING_HISTORY = [
  { date: "Sep 24, 2023", plan: "Premium Culinary", amount: "$49.00" },
  { date: "Aug 24, 2023", plan: "Premium Culinary", amount: "$49.00" },
  { date: "Jul 24, 2023", plan: "Premium Culinary", amount: "$49.00" },
];

// ─── Plan Data ────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "essential",
    name: "Essential",
    price: 19,
    tagline: "Perfect for health starters.",
    features: [
      { label: "Daily Meal Tracking",       included: true  },
      { label: "Basic Nutritional Stats",   included: true  },
      { label: "Community Recipes",         included: true  },
      { label: "Personalized Consultations", included: false },
    ],
    cta: "Downgrade to Essential",
    ctaStyle: "outline",
    current: false,
    popular: false,
  },
  {
    id: "premium",
    name: "Premium Culinary",
    price: 49,
    tagline: "Total wellness optimization.",
    features: [
      { label: "AI-Driven Recipe Engine",    included: true },
      { label: "Advanced Bio-Analytics",     included: true },
      { label: "Monthly Specialist Chat",    included: true },
      { label: "Priority Ingredient Delivery", included: true },
    ],
    cta: "Current Plan",
    ctaStyle: "current",
    current: true,
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 99,
    tagline: "Concierge culinary care.",
    features: [
      { label: "Unlimited Consultations", included: true },
      { label: "Custom Chef Consults",    included: true },
      { label: "Full Genomic Analysis",   included: true },
      { label: "VIP Event Access",        included: true },
    ],
    cta: "Upgrade to Elite",
    ctaStyle: "upgrade",
    current: false,
    popular: false,
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ onClose }) {
  const location = useLocation();

  return (
    <aside className="w-56 bg-white border-r border-gray-100 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-50">
        <div className="relative flex-shrink-0">
          {/* Leaf / flame logo matching the image */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#1a3d2e" />
            <path d="M20 8c0 0-8 6-8 13a8 8 0 0016 0c0-7-8-13-8-13z" fill="#e8c87d" />
            <path d="M20 14c0 0-4 4-4 7a4 4 0 008 0c0-3-4-7-4-7z" fill="#c9a84c" opacity="0.6" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-extrabold text-[#1a3d2e] leading-tight">Dine</p>
          <p className="text-sm font-extrabold text-[#1a3d2e] leading-tight">with Mee</p>
          <p className="text-[9px] text-[#c9a84c] font-medium tracking-wide">Healing Through Heritage</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const IconComp = Icons[item.icon];
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#1a3d2e] text-white"
                  : "text-gray-500 hover:text-[#1a3d2e] hover:bg-gray-50"
              }`}
            >
              <IconComp />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-0.5">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-[#1a3d2e] hover:bg-gray-50 w-full transition-all">
          <Icons.Help />
          <span>Help Center</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 w-full transition-all">
          <Icons.Logout />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10">
        <Sidebar onClose={onClose} />
      </div>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, onSelect }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border transition-all duration-200 overflow-visible
      ${plan.current
        ? "bg-[#1a3d2e] text-white border-[#1a3d2e] shadow-2xl scale-[1.02] z-10"
        : "bg-white text-gray-800 border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}>
      {/* Most Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-[#c9763a] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Plan name & price */}
        <h3 className={`text-lg font-bold mb-1 ${plan.current ? "text-white" : "text-gray-900"}`}>
          {plan.name}
        </h3>
        <div className="flex items-end gap-1 mb-1">
          <span className={`text-4xl font-black leading-none ${plan.current ? "text-white" : "text-gray-900"}`}>
            ${plan.price}
          </span>
          <span className={`text-sm mb-1 ${plan.current ? "text-white/60" : "text-gray-400"}`}>/mo</span>
        </div>
        <p className={`text-xs mb-5 ${plan.current ? "text-white/70" : "text-gray-500"}`}>
          {plan.tagline}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {plan.features.map(f => (
            <li key={f.label} className="flex items-start gap-2.5">
              {f.included
                ? <span className="flex-shrink-0 mt-0.5"><Icons.CheckCircle /></span>
                : <span className="flex-shrink-0 mt-0.5"><Icons.XCircle /></span>
              }
              <span className={`text-sm leading-snug ${
                !f.included
                  ? plan.current ? "text-white/30 line-through" : "text-gray-300 line-through"
                  : plan.current ? "text-white/90" : "text-gray-700"
              }`}>
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {plan.ctaStyle === "current" && (
          <button disabled
            className="w-full py-3 rounded-xl text-sm font-bold bg-white/20 text-white cursor-default border border-white/20">
            {plan.cta}
          </button>
        )}
        {plan.ctaStyle === "outline" && (
          <button
            onClick={() => onSelect(plan)}
            className="w-full py-3 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-700 hover:border-[#1a3d2e] hover:text-[#1a3d2e] transition-all">
            {plan.cta}
          </button>
        )}
        {plan.ctaStyle === "upgrade" && (
          <button
            onClick={() => onSelect(plan)}
            className="w-full py-3 rounded-xl text-sm font-bold bg-[#c9763a] hover:bg-[#b8632a] text-white transition-all shadow-md hover:shadow-lg">
            {plan.cta}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Subscriptions() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePlanSelect = (plan) => {
    showToast(`Switching to ${plan.name} plan…`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9f7] text-gray-900 antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar onClose={() => {}} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="bg-[#1a3d2e] text-white px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-all">
              <Icons.Menu />
            </button>
            <h1 className="text-base font-semibold tracking-tight">Subscription Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
              <Icons.Bell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c9763a] rounded-full" />
            </button>
            <button className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
              <Icons.Gear />
            </button>
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
            />
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 p-4 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">

          {/* ── Current Plan + Payment Method ─────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Active Plan Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-wrap items-start gap-3 mb-1">
                <h2 className="text-3xl font-black text-gray-900 leading-tight">Premium Culinary</h2>
                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mt-1">
                  Current Active Plan
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Comprehensive nutritional guidance with artisan meal selections and 24/7 specialist access.
              </p>

              <div className="flex flex-wrap gap-8 mb-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Next Billing Date</p>
                  <p className="text-lg font-bold text-gray-900">October 24, 2023</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Billing Amount</p>
                  <p className="text-lg font-bold text-gray-900">$49.00 / month</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => showToast("Opening upgrade options…")}
                  className="flex items-center gap-2 bg-[#c9763a] hover:bg-[#b8632a] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow hover:shadow-md">
                  <Icons.ArrowUp />
                  Upgrade Plan
                </button>
                <button
                  onClick={() => showToast("Opening billing management…")}
                  className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
                  Manage Billing
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Payment Method</h3>
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  {/* Visa badge */}
                  <div className="w-12 h-8 bg-[#1a1f71] rounded-md flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-xs tracking-tighter italic">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Visa ending in 4242</p>
                    <p className="text-xs text-gray-400">Expires 12/26</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => showToast("Opening payment update form…")}
                className="flex items-center gap-2 text-[#1a3d2e] text-sm font-semibold hover:underline mt-4 transition-all">
                <Icons.Pencil />
                Update Payment Details
              </button>
            </div>
          </div>

          {/* ── Compare Subscription Tiers ────────────────────────────────── */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Compare Subscription Tiers</h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                Discover the perfect balance of nutrition and convenience tailored to your unique wellness journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start pt-6">
              {PLANS.map(plan => (
                <PlanCard key={plan.id} plan={plan} onSelect={handlePlanSelect} />
              ))}
            </div>
          </div>

          {/* ── Recent Billing History ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <h3 className="text-base font-bold text-gray-900">Recent Billing History</h3>
              <button
                onClick={() => showToast("Downloading all receipts…")}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a3d2e] font-medium transition-colors">
                Download All
                <Icons.Download />
              </button>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-4 px-6 py-3 bg-gray-50/80 border-b border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Plan</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Amount</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Receipt</span>
            </div>

            {/* Rows */}
            {BILLING_HISTORY.map((row, i) => (
              <div key={i}
                className={`grid grid-cols-4 px-6 py-4 items-center ${i < BILLING_HISTORY.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50/50 transition-colors`}>
                <span className="text-sm text-gray-700">{row.date}</span>
                <span className="text-sm text-gray-700">{row.plan}</span>
                <span className="text-sm text-gray-700">{row.amount}</span>
                <div className="flex justify-end">
                  <button
                    onClick={() => showToast(`Downloading receipt for ${row.date}…`)}
                    className="text-sm font-bold text-[#c9763a] hover:text-[#b8632a] hover:underline transition-colors">
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom spacing */}
          <div className="h-4" />
        </main>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a3d2e] text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl"
          style={{ animation: "fadeUp 0.2s ease" }}>
          {toastMsg}
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to   { opacity: 1; transform: translate(-50%, 0);    }
        }
      `}</style>
    </div>
  );
}
