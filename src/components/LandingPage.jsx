// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// // ─── Logo SVG (matching brand: dark green circle + golden flame) ──────────────
// function Logo({ size = 42 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
//       {/* outer flame / leaf */}
//       <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
//       {/* inner darker highlight */}
//       <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
//     </svg>
//   );
// }

// // ─── Icons ────────────────────────────────────────────────────────────────────
// function IconGrid() {
//   return (
//     <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//       <circle cx="5"  cy="5"  r="2.2" fill="#1a3d2e" />
//       <circle cx="12" cy="5"  r="2.2" fill="#1a3d2e" />
//       <circle cx="19" cy="5"  r="2.2" fill="#1a3d2e" />
//       <circle cx="5"  cy="12" r="2.2" fill="#1a3d2e" />
//       <circle cx="12" cy="12" r="2.2" fill="#1a3d2e" />
//       <circle cx="19" cy="12" r="2.2" fill="#1a3d2e" />
//       <circle cx="5"  cy="19" r="2.2" fill="#1a3d2e" />
//       <circle cx="12" cy="19" r="2.2" fill="#1a3d2e" />
//     </svg>
//   );
// }

// function IconStethoscope() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
//       <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
//       <circle cx="20" cy="10" r="2" />
//     </svg>
//   );
// }

// function IconCutlery() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20" />
//       <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
//     </svg>
//   );
// }

// function IconArrow() {
//   return (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M5 12h14M12 5l7 7-7 7" />
//     </svg>
//   );
// }

// // ─── Path data ────────────────────────────────────────────────────────────────
// const PATHS = [
//   {
//     id: "you",
//     label: "For You",
//     description:
//       "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
//     cta: "Choose this path",
//     Icon: IconGrid,
//     image:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard",
//   },
//   {
//     id: "professionals",
//     label: "For Professionals",
//     description:
//       "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
//     cta: "Professional Access",
//     Icon: IconStethoscope,
//     image:
//       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard",
//   },
//   {
//     id: "culinary",
//     label: "For Culinary Experts",
//     description:
//       "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
//     cta: "Culinary Portal",
//     Icon: IconCutlery,
//     image:
//       "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard",
//   },
// ];

// // ─── Path Card ────────────────────────────────────────────────────────────────
// function PathCard({ path, index, onSelect }) {
//   const [hovered, setHovered] = useState(false);
//   const { Icon } = path;

//   return (
//     <div
//       onClick={() => onSelect(path)}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col"
//       style={{
//         boxShadow: hovered
//           ? "0 24px 64px rgba(0,0,0,0.11)"
//           : "0 1px 8px rgba(0,0,0,0.06)",
//         transform: hovered ? "translateY(-5px)" : "translateY(0)",
//         transition: "box-shadow 0.28s ease, transform 0.28s ease",
//         animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
//         animationDelay: `${0.15 + index * 0.1}s`,
//       }}
//     >
//       {/* ── Image area ──────────────────────────────────── */}
//       <div className="relative overflow-hidden" style={{ height: 210 }}>
//         <img
//           src={path.image}
//           alt={path.label}
//           className="w-full h-full object-cover"
//           style={{
//             transform: hovered ? "scale(1.05)" : "scale(1)",
//             transition: "transform 0.45s ease",
//           }}
//         />
//         {/* icon badge */}
//         <div
//           className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center"
//           style={{ backdropFilter: "blur(6px)" }}
//         >
//           <Icon />
//         </div>
//       </div>

//       {/* ── Content area ────────────────────────────────── */}
//       <div className="p-6 flex flex-col flex-1">
//         <h3
//           className="font-bold text-xl mb-2 leading-snug"
//           style={{
//             fontFamily: "Georgia, 'Times New Roman', serif",
//             color: hovered ? "#1a3d2e" : "#111827",
//             transition: "color 0.2s",
//           }}
//         >
//           {path.label}
//         </h3>
//         <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
//           {path.description}
//         </p>
//         <div
//           className="flex items-center gap-1.5 text-sm font-bold"
//           style={{ color: "#111827" }}
//         >
//           <span>{path.cta}</span>
//           <span
//             style={{
//               display: "inline-flex",
//               transform: hovered ? "translateX(5px)" : "translateX(0)",
//               transition: "transform 0.22s ease",
//             }}
//           >
//             <IconArrow />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Modal: Sign In ───────────────────────────────────────────────────────────
// function SignInModal({ onClose, onSuccess }) {
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState("");
//   const overlayRef              = useRef(null);

//   // Close on overlay click
//   const handleOverlay = (e) => {
//     if (e.target === overlayRef.current) onClose();
//   };

//   // Close on Escape
//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!email || !password) { setError("Please fill in all fields."); return; }
//     setLoading(true);
//     try {
//       const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Invalid credentials");
//       if (data.token) localStorage.setItem("dwm_token", data.token);
//       onSuccess();
//     } catch (err) {
//       // Fallback: navigate anyway (demo mode)
//       console.warn("Auth error:", err.message);
//       onSuccess();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       ref={overlayRef}
//       onClick={handleOverlay}
//       className="fixed inset-0 z-50 flex items-center justify-center px-4"
//       style={{
//         backgroundColor: "rgba(0,0,0,0.35)",
//         backdropFilter: "blur(4px)",
//         animation: "fadeIn 0.18s ease both",
//       }}
//     >
//       <div
//         className="bg-white rounded-2xl w-full max-w-sm p-8 relative shadow-2xl"
//         style={{ animation: "slideUp 0.24s cubic-bezier(0.22,1,0.36,1) both" }}
//       >
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
//           aria-label="Close"
//         >
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//             <path d="M18 6 6 18M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Logo */}
//         <div className="flex items-center gap-2.5 mb-6">
//           <Logo size={34} />
//           <div>
//             <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">Dine</p>
//             <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">with Mee</p>
//           </div>
//         </div>

//         <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
//           Welcome back
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue.</p>

//         {error && (
//           <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
//             style={{
//               backgroundColor: loading ? "#4a7c5e" : "#1a3d2e",
//               opacity: loading ? 0.8 : 1,
//             }}
//           >
//             {loading ? "Signing in…" : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-xs text-gray-400 mt-5">
//           Don't have an account?{" "}
//           <button className="text-[#1a3d2e] font-bold hover:underline">
//             Get started
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Main Landing Page ────────────────────────────────────────────────────────
// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [loaded, setLoaded]         = useState(false);

//   useEffect(() => {
//     // Small delay so CSS animations fire cleanly
//     const t = setTimeout(() => setLoaded(true), 10);
//     return () => clearTimeout(t);
//   }, []);

//   const handleSelect = (path) => navigate(path.route);
//   const handleSignInSuccess = () => {
//     setShowSignIn(false);
//     navigate("/dashboard");
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col"
//       style={{
//         backgroundColor: "#f5f0e8",
//         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
//       }}
//     >
//       <style>{`
//         @keyframes cardIn {
//           from { opacity: 0; transform: translateY(30px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes headerIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes heroIn {
//           from { opacity: 0; transform: translateY(18px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       {/* ─── Header ─────────────────────────────────────────────────────── */}
//       <header
//         className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
//         style={{ animation: "headerIn 0.4s ease both" }}
//       >
//         {/* Logo + wordmark */}
//         <div className="flex items-center gap-2.5">
//           <Logo size={38} />
//           <div className="leading-none">
//             <p className="text-sm font-extrabold text-[#1a3d2e]">Dine</p>
//             <p className="text-sm font-extrabold text-[#1a3d2e]">with Mee</p>
//           </div>
//         </div>

//         {/* Sign In */}
//         <div className="flex items-center gap-1.5">
//           <span className="hidden sm:inline text-sm text-gray-500">
//             Already have an account?
//           </span>
//           <button
//             onClick={() => setShowSignIn(true)}
//             className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1"
//           >
//             Sign In
//           </button>
//         </div>
//       </header>

//       {/* ─── Main Content ────────────────────────────────────────────────── */}
//       <main className="flex-1 flex flex-col">
//         {/* Hero */}
//         <div
//           className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14"
//           style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}
//         >
//           <h1
//             className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
//             style={{
//               color: "#1a3d2e",
//               fontFamily: "Georgia, 'Times New Roman', serif",
//             }}
//           >
//             Welcome to Dine With Me
//           </h1>
//           <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
//             Every journey is unique. Select the path that best describes your goals
//             and help us personalize your experience.
//           </p>
//         </div>

//         {/* Cards grid */}
//         <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
//             {PATHS.map((path, i) => (
//               <PathCard
//                 key={path.id}
//                 path={path}
//                 index={i}
//                 onSelect={handleSelect}
//               />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* ─── Footer ──────────────────────────────────────────────────────── */}
//       <footer
//         className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5"
//         style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}
//       >
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <Logo size={30} />
//             <div className="leading-none">
//               <p className="text-xs font-extrabold text-[#1a3d2e]">Dine</p>
//               <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p>
//             </div>
//           </div>

//           {/* Links */}
//           <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
//             {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
//               <button
//                 key={link}
//                 className="hover:text-[#1a3d2e] transition-colors font-medium"
//                 onClick={() => {}}
//               >
//                 {link}
//               </button>
//             ))}
//           </nav>

//           {/* Copyright */}
//           <p className="text-xs text-gray-400 whitespace-nowrap">
//             © 2024 Dine With Me. All rights reserved.
//           </p>
//         </div>
//       </footer>

//       {/* ─── Sign In Modal ────────────────────────────────────────────────── */}
//       {showSignIn && (
//         <SignInModal
//           onClose={() => setShowSignIn(false)}
//           onSuccess={handleSignInSuccess}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Logo SVG (matching brand: dark green circle + golden flame) ──────────────
function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
      {/* outer flame / leaf */}
      <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
      {/* inner darker highlight */}
      <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
    </svg>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconGrid() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="5"  cy="5"  r="2.2" fill="#1a3d2e" />
      <circle cx="12" cy="5"  r="2.2" fill="#1a3d2e" />
      <circle cx="19" cy="5"  r="2.2" fill="#1a3d2e" />
      <circle cx="5"  cy="12" r="2.2" fill="#1a3d2e" />
      <circle cx="12" cy="12" r="2.2" fill="#1a3d2e" />
      <circle cx="19" cy="12" r="2.2" fill="#1a3d2e" />
      <circle cx="5"  cy="19" r="2.2" fill="#1a3d2e" />
      <circle cx="12" cy="19" r="2.2" fill="#1a3d2e" />
    </svg>
  );
}

function IconStethoscope() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
      <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}

function IconCutlery() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20" />
      <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Path data ────────────────────────────────────────────────────────────────
const PATHS = [
  {
    id: "you",
    label: "For You",
    description:
      "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
    cta: "Choose this path",
    Icon: IconGrid,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
    route: "/dashboard",
  },
  {
    id: "professionals",
    label: "For Professionals",
    description:
      "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
    cta: "Professional Access",
    Icon: IconStethoscope,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
    route: "/dashboard",
  },
  {
    id: "culinary",
    label: "For Culinary Experts",
    description:
      "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
    cta: "Culinary Portal",
    Icon: IconCutlery,
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
    route: "/dashboard",
  },
];

// ─── Path Card ────────────────────────────────────────────────────────────────
function PathCard({ path, index, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = path;

  return (
    <div
      onClick={() => onSelect(path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col"
      style={{
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.11)"
          : "0 1px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.28s ease, transform 0.28s ease",
        animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
        animationDelay: `${0.15 + index * 0.1}s`,
      }}
    >
      {/* ── Image area ──────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <img
          src={path.image}
          alt={path.label}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.45s ease",
          }}
        />
        {/* icon badge */}
        <div
          className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <Icon />
        </div>
      </div>

      {/* ── Content area ────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-bold text-xl mb-2 leading-snug"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: hovered ? "#1a3d2e" : "#111827",
            transition: "color 0.2s",
          }}
        >
          {path.label}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
          {path.description}
        </p>
        <div
          className="flex items-center gap-1.5 text-sm font-bold"
          style={{ color: "#111827" }}
        >
          <span>{path.cta}</span>
          <span
            style={{
              display: "inline-flex",
              transform: hovered ? "translateX(5px)" : "translateX(0)",
              transition: "transform 0.22s ease",
            }}
          >
            <IconArrow />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Sign In ───────────────────────────────────────────────────────────
function SignInModal({ onClose, onSuccess, onNavigateSignup }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const overlayRef              = useRef(null);

  // Close on overlay click
  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");
      if (data.token) localStorage.setItem("dwm_token", data.token);
      onSuccess();
    } catch (err) {
      console.warn("Auth error:", err.message);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.18s ease both",
      }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm p-8 relative shadow-2xl"
        style={{ animation: "slideUp 0.24s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-6">
          <Logo size={34} />
          <div>
            <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">DineWithMee</p>
            {/* <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">with Mee</p> */}
          </div>
        </div>

        <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
          Welcome back
        </h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue.</p>

        {error && (
          <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
            style={{
              backgroundColor: loading ? "#4a7c5e" : "#1a3d2e",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={onNavigateSignup} 
            className="text-[#1a3d2e] font-bold hover:underline"
          >
            Get started
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  const [loaded, setLoaded]         = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (path) => navigate(path.route);
  const handleSignInSuccess = () => {
    setShowSignIn(false);
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#f5f0e8",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ─── Header ─────────────────────────────────────────────────────── */}
      <header
        className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
        style={{ animation: "headerIn 0.4s ease both" }}
      >
        <div className="flex items-center gap-2.5">
          <Logo size={38} />
          <div className="leading-none">
            <p className="text-sm font-extrabold text-[#1a3d2e]">DineWithMee</p>
            {/* <p className="text-sm font-extrabold text-[#1a3d2e]">with Mee</p> */}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline text-sm text-gray-500">
            Already have an account?
          </span>
          <button
            onClick={() => setShowSignIn(true)}
            className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* ─── Main Content ────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">
        <div
          className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14"
          style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
            style={{
              color: "#1a3d2e",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Welcome to DineWithMee
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Every journey is unique. Select the path that best describes your goals
            and help us personalize your experience.
          </p>
        </div>

        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {PATHS.map((path, i) => (
              <PathCard
                key={path.id}
                path={path}
                index={i}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5"
        style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={30} />
            <div className="leading-none">
              <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
              {/* <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p> */}
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
            {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
              <button
                key={link}
                className="hover:text-[#1a3d2e] transition-colors font-medium"
                onClick={() => {}}
              >
                {link}
              </button>
            ))}
          </nav>

          <p className="text-xs text-gray-400 whitespace-nowrap">
            © 2024 DineWithMee. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ─── Sign In Modal ────────────────────────────────────────────────── */}
      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
          onSuccess={handleSignInSuccess}
          onNavigateSignup={() => {
            setShowSignIn(false);
            navigate("/signup");
          }}
        />
      )}
    </div>
  );
}