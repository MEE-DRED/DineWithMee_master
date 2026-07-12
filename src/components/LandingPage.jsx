// // // import { useState, useEffect, useRef } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // // ─── Logo SVG (matching brand: dark green circle + golden flame) ──────────────
// // // function Logo({ size = 42 }) {
// // //   return (
// // //     <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //       <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
// // //       {/* outer flame / leaf */}
// // //       <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
// // //       {/* inner darker highlight */}
// // //       <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
// // //     </svg>
// // //   );
// // // }

// // // // ─── Icons ────────────────────────────────────────────────────────────────────
// // // function IconGrid() {
// // //   return (
// // //     <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
// // //       <circle cx="5"  cy="5"  r="2.2" fill="#1a3d2e" />
// // //       <circle cx="12" cy="5"  r="2.2" fill="#1a3d2e" />
// // //       <circle cx="19" cy="5"  r="2.2" fill="#1a3d2e" />
// // //       <circle cx="5"  cy="12" r="2.2" fill="#1a3d2e" />
// // //       <circle cx="12" cy="12" r="2.2" fill="#1a3d2e" />
// // //       <circle cx="19" cy="12" r="2.2" fill="#1a3d2e" />
// // //       <circle cx="5"  cy="19" r="2.2" fill="#1a3d2e" />
// // //       <circle cx="12" cy="19" r="2.2" fill="#1a3d2e" />
// // //     </svg>
// // //   );
// // // }

// // // function IconStethoscope() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
// // //       <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
// // //       <circle cx="20" cy="10" r="2" />
// // //     </svg>
// // //   );
// // // }

// // // function IconCutlery() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20" />
// // //       <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
// // //     </svg>
// // //   );
// // // }

// // // function IconArrow() {
// // //   return (
// // //     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// // //       <path d="M5 12h14M12 5l7 7-7 7" />
// // //     </svg>
// // //   );
// // // }

// // // // ─── Path data ────────────────────────────────────────────────────────────────
// // // const PATHS = [
// // //   {
// // //     id: "you",
// // //     label: "For You",
// // //     description:
// // //       "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
// // //     cta: "Choose this path",
// // //     Icon: IconGrid,
// // //     image:
// // //       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
// // //     route: "/dashboard",
// // //   },
// // //   {
// // //     id: "professionals",
// // //     label: "For Professionals",
// // //     description:
// // //       "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
// // //     cta: "Professional Access",
// // //     Icon: IconStethoscope,
// // //     image:
// // //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
// // //     route: "/dashboard",
// // //   },
// // //   {
// // //     id: "culinary",
// // //     label: "For Culinary Experts",
// // //     description:
// // //       "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
// // //     cta: "Culinary Portal",
// // //     Icon: IconCutlery,
// // //     image:
// // //       "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
// // //     route: "/dashboard",
// // //   },
// // // ];

// // // // ─── Path Card ────────────────────────────────────────────────────────────────
// // // function PathCard({ path, index, onSelect }) {
// // //   const [hovered, setHovered] = useState(false);
// // //   const { Icon } = path;

// // //   return (
// // //     <div
// // //       onClick={() => onSelect(path)}
// // //       onMouseEnter={() => setHovered(true)}
// // //       onMouseLeave={() => setHovered(false)}
// // //       className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col"
// // //       style={{
// // //         boxShadow: hovered
// // //           ? "0 24px 64px rgba(0,0,0,0.11)"
// // //           : "0 1px 8px rgba(0,0,0,0.06)",
// // //         transform: hovered ? "translateY(-5px)" : "translateY(0)",
// // //         transition: "box-shadow 0.28s ease, transform 0.28s ease",
// // //         animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
// // //         animationDelay: `${0.15 + index * 0.1}s`,
// // //       }}
// // //     >
// // //       {/* ── Image area ──────────────────────────────────── */}
// // //       <div className="relative overflow-hidden" style={{ height: 210 }}>
// // //         <img
// // //           src={path.image}
// // //           alt={path.label}
// // //           className="w-full h-full object-cover"
// // //           style={{
// // //             transform: hovered ? "scale(1.05)" : "scale(1)",
// // //             transition: "transform 0.45s ease",
// // //           }}
// // //         />
// // //         {/* icon badge */}
// // //         <div
// // //           className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center"
// // //           style={{ backdropFilter: "blur(6px)" }}
// // //         >
// // //           <Icon />
// // //         </div>
// // //       </div>

// // //       {/* ── Content area ────────────────────────────────── */}
// // //       <div className="p-6 flex flex-col flex-1">
// // //         <h3
// // //           className="font-bold text-xl mb-2 leading-snug"
// // //           style={{
// // //             fontFamily: "Georgia, 'Times New Roman', serif",
// // //             color: hovered ? "#1a3d2e" : "#111827",
// // //             transition: "color 0.2s",
// // //           }}
// // //         >
// // //           {path.label}
// // //         </h3>
// // //         <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
// // //           {path.description}
// // //         </p>
// // //         <div
// // //           className="flex items-center gap-1.5 text-sm font-bold"
// // //           style={{ color: "#111827" }}
// // //         >
// // //           <span>{path.cta}</span>
// // //           <span
// // //             style={{
// // //               display: "inline-flex",
// // //               transform: hovered ? "translateX(5px)" : "translateX(0)",
// // //               transition: "transform 0.22s ease",
// // //             }}
// // //           >
// // //             <IconArrow />
// // //           </span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Modal: Sign In ───────────────────────────────────────────────────────────
// // // function SignInModal({ onClose, onSuccess }) {
// // //   const [email, setEmail]       = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [loading, setLoading]   = useState(false);
// // //   const [error, setError]       = useState("");
// // //   const overlayRef              = useRef(null);

// // //   // Close on overlay click
// // //   const handleOverlay = (e) => {
// // //     if (e.target === overlayRef.current) onClose();
// // //   };

// // //   // Close on Escape
// // //   useEffect(() => {
// // //     const handler = (e) => { if (e.key === "Escape") onClose(); };
// // //     window.addEventListener("keydown", handler);
// // //     return () => window.removeEventListener("keydown", handler);
// // //   }, [onClose]);

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError("");
// // //     if (!email || !password) { setError("Please fill in all fields."); return; }
// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email, password }),
// // //       });
// // //       const data = await res.json();
// // //       if (!res.ok) throw new Error(data.message || "Invalid credentials");
// // //       if (data.token) localStorage.setItem("dwm_token", data.token);
// // //       onSuccess();
// // //     } catch (err) {
// // //       // Fallback: navigate anyway (demo mode)
// // //       console.warn("Auth error:", err.message);
// // //       onSuccess();
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div
// // //       ref={overlayRef}
// // //       onClick={handleOverlay}
// // //       className="fixed inset-0 z-50 flex items-center justify-center px-4"
// // //       style={{
// // //         backgroundColor: "rgba(0,0,0,0.35)",
// // //         backdropFilter: "blur(4px)",
// // //         animation: "fadeIn 0.18s ease both",
// // //       }}
// // //     >
// // //       <div
// // //         className="bg-white rounded-2xl w-full max-w-sm p-8 relative shadow-2xl"
// // //         style={{ animation: "slideUp 0.24s cubic-bezier(0.22,1,0.36,1) both" }}
// // //       >
// // //         {/* Close */}
// // //         <button
// // //           onClick={onClose}
// // //           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
// // //           aria-label="Close"
// // //         >
// // //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
// // //             <path d="M18 6 6 18M6 6l12 12" />
// // //           </svg>
// // //         </button>

// // //         {/* Logo */}
// // //         <div className="flex items-center gap-2.5 mb-6">
// // //           <Logo size={34} />
// // //           <div>
// // //             <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">Dine</p>
// // //             <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">with Mee</p>
// // //           </div>
// // //         </div>

// // //         <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
// // //           Welcome back
// // //         </h2>
// // //         <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue.</p>

// // //         {error && (
// // //           <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
// // //             {error}
// // //           </div>
// // //         )}

// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
// // //             <input
// // //               type="email"
// // //               value={email}
// // //               onChange={e => setEmail(e.target.value)}
// // //               placeholder="you@example.com"
// // //               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
// // //               autoFocus
// // //             />
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
// // //             <input
// // //               type="password"
// // //               value={password}
// // //               onChange={e => setPassword(e.target.value)}
// // //               placeholder="••••••••"
// // //               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
// // //             />
// // //           </div>

// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
// // //             style={{
// // //               backgroundColor: loading ? "#4a7c5e" : "#1a3d2e",
// // //               opacity: loading ? 0.8 : 1,
// // //             }}
// // //           >
// // //             {loading ? "Signing in…" : "Sign In"}
// // //           </button>
// // //         </form>

// // //         <p className="text-center text-xs text-gray-400 mt-5">
// // //           Don't have an account?{" "}
// // //           <button className="text-[#1a3d2e] font-bold hover:underline">
// // //             Get started
// // //           </button>
// // //         </p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ─── Main Landing Page ────────────────────────────────────────────────────────
// // // export default function LandingPage() {
// // //   const navigate = useNavigate();
// // //   const [showSignIn, setShowSignIn] = useState(false);
// // //   const [loaded, setLoaded]         = useState(false);

// // //   useEffect(() => {
// // //     // Small delay so CSS animations fire cleanly
// // //     const t = setTimeout(() => setLoaded(true), 10);
// // //     return () => clearTimeout(t);
// // //   }, []);

// // //   const handleSelect = (path) => navigate(path.route);
// // //   const handleSignInSuccess = () => {
// // //     setShowSignIn(false);
// // //     navigate("/dashboard");
// // //   };

// // //   return (
// // //     <div
// // //       className="min-h-screen flex flex-col"
// // //       style={{
// // //         backgroundColor: "#f5f0e8",
// // //         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
// // //       }}
// // //     >
// // //       <style>{`
// // //         @keyframes cardIn {
// // //           from { opacity: 0; transform: translateY(30px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //         @keyframes fadeIn {
// // //           from { opacity: 0; }
// // //           to   { opacity: 1; }
// // //         }
// // //         @keyframes slideUp {
// // //           from { opacity: 0; transform: translateY(20px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //         @keyframes headerIn {
// // //           from { opacity: 0; transform: translateY(-10px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //         @keyframes heroIn {
// // //           from { opacity: 0; transform: translateY(18px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //       `}</style>

// // //       {/* ─── Header ─────────────────────────────────────────────────────── */}
// // //       <header
// // //         className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
// // //         style={{ animation: "headerIn 0.4s ease both" }}
// // //       >
// // //         {/* Logo + wordmark */}
// // //         <div className="flex items-center gap-2.5">
// // //           <Logo size={38} />
// // //           <div className="leading-none">
// // //             <p className="text-sm font-extrabold text-[#1a3d2e]">Dine</p>
// // //             <p className="text-sm font-extrabold text-[#1a3d2e]">with Mee</p>
// // //           </div>
// // //         </div>

// // //         {/* Sign In */}
// // //         <div className="flex items-center gap-1.5">
// // //           <span className="hidden sm:inline text-sm text-gray-500">
// // //             Already have an account?
// // //           </span>
// // //           <button
// // //             onClick={() => setShowSignIn(true)}
// // //             className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1"
// // //           >
// // //             Sign In
// // //           </button>
// // //         </div>
// // //       </header>

// // //       {/* ─── Main Content ────────────────────────────────────────────────── */}
// // //       <main className="flex-1 flex flex-col">
// // //         {/* Hero */}
// // //         <div
// // //           className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14"
// // //           style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}
// // //         >
// // //           <h1
// // //             className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
// // //             style={{
// // //               color: "#1a3d2e",
// // //               fontFamily: "Georgia, 'Times New Roman', serif",
// // //             }}
// // //           >
// // //             Welcome to Dine With Me
// // //           </h1>
// // //           <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
// // //             Every journey is unique. Select the path that best describes your goals
// // //             and help us personalize your experience.
// // //           </p>
// // //         </div>

// // //         {/* Cards grid */}
// // //         <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
// // //             {PATHS.map((path, i) => (
// // //               <PathCard
// // //                 key={path.id}
// // //                 path={path}
// // //                 index={i}
// // //                 onSelect={handleSelect}
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* ─── Footer ──────────────────────────────────────────────────────── */}
// // //       <footer
// // //         className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5"
// // //         style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}
// // //       >
// // //         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
// // //           {/* Logo */}
// // //           <div className="flex items-center gap-2">
// // //             <Logo size={30} />
// // //             <div className="leading-none">
// // //               <p className="text-xs font-extrabold text-[#1a3d2e]">Dine</p>
// // //               <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p>
// // //             </div>
// // //           </div>

// // //           {/* Links */}
// // //           <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
// // //             {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
// // //               <button
// // //                 key={link}
// // //                 className="hover:text-[#1a3d2e] transition-colors font-medium"
// // //                 onClick={() => {}}
// // //               >
// // //                 {link}
// // //               </button>
// // //             ))}
// // //           </nav>

// // //           {/* Copyright */}
// // //           <p className="text-xs text-gray-400 whitespace-nowrap">
// // //             © 2024 Dine With Me. All rights reserved.
// // //           </p>
// // //         </div>
// // //       </footer>

// // //       {/* ─── Sign In Modal ────────────────────────────────────────────────── */}
// // //       {showSignIn && (
// // //         <SignInModal
// // //           onClose={() => setShowSignIn(false)}
// // //           onSuccess={handleSignInSuccess}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import { useState, useEffect, useRef } from "react";
// // import { useNavigate } from "react-router-dom";

// // // ─── Logo SVG (matching brand: dark green circle + golden flame) ──────────────
// // function Logo({ size = 42 }) {
// //   return (
// //     <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
// //       <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
// //       {/* outer flame / leaf */}
// //       <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
// //       {/* inner darker highlight */}
// //       <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
// //     </svg>
// //   );
// // }

// // // ─── Icons ────────────────────────────────────────────────────────────────────
// // function IconGrid() {
// //   return (
// //     <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
// //       <circle cx="5"  cy="5"  r="2.2" fill="#1a3d2e" />
// //       <circle cx="12" cy="5"  r="2.2" fill="#1a3d2e" />
// //       <circle cx="19" cy="5"  r="2.2" fill="#1a3d2e" />
// //       <circle cx="5"  cy="12" r="2.2" fill="#1a3d2e" />
// //       <circle cx="12" cy="12" r="2.2" fill="#1a3d2e" />
// //       <circle cx="19" cy="12" r="2.2" fill="#1a3d2e" />
// //       <circle cx="5"  cy="19" r="2.2" fill="#1a3d2e" />
// //       <circle cx="12" cy="19" r="2.2" fill="#1a3d2e" />
// //     </svg>
// //   );
// // }

// // function IconStethoscope() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
// //       <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
// //       <circle cx="20" cy="10" r="2" />
// //     </svg>
// //   );
// // }

// // function IconCutlery() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20" />
// //       <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
// //     </svg>
// //   );
// // }

// // function IconArrow() {
// //   return (
// //     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M5 12h14M12 5l7 7-7 7" />
// //     </svg>
// //   );
// // }

// // // ─── Path data ────────────────────────────────────────────────────────────────
// // const PATHS = [
// //   {
// //     id: "you",
// //     label: "For You",
// //     description:
// //       "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
// //     cta: "Choose this path",
// //     Icon: IconGrid,
// //     image:
// //       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
// //     route: "/dashboard",
// //   },
// //   {
// //     id: "professionals",
// //     label: "For Professionals",
// //     description:
// //       "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
// //     cta: "Professional Access",
// //     Icon: IconStethoscope,
// //     image:
// //       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
// //     route: "/dashboard",
// //   },
// //   {
// //     id: "culinary",
// //     label: "For Culinary Experts",
// //     description:
// //       "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
// //     cta: "Culinary Portal",
// //     Icon: IconCutlery,
// //     image:
// //       "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
// //     route: "/dashboard",
// //   },
// // ];

// // // ─── Path Card ────────────────────────────────────────────────────────────────
// // function PathCard({ path, index, onSelect }) {
// //   const [hovered, setHovered] = useState(false);
// //   const { Icon } = path;

// //   return (
// //     <div
// //       onClick={() => onSelect(path)}
// //       onMouseEnter={() => setHovered(true)}
// //       onMouseLeave={() => setHovered(false)}
// //       className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col"
// //       style={{
// //         boxShadow: hovered
// //           ? "0 24px 64px rgba(0,0,0,0.11)"
// //           : "0 1px 8px rgba(0,0,0,0.06)",
// //         transform: hovered ? "translateY(-5px)" : "translateY(0)",
// //         transition: "box-shadow 0.28s ease, transform 0.28s ease",
// //         animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
// //         animationDelay: `${0.15 + index * 0.1}s`,
// //       }}
// //     >
// //       {/* ── Image area ──────────────────────────────────── */}
// //       <div className="relative overflow-hidden" style={{ height: 210 }}>
// //         <img
// //           src={path.image}
// //           alt={path.label}
// //           className="w-full h-full object-cover"
// //           style={{
// //             transform: hovered ? "scale(1.05)" : "scale(1)",
// //             transition: "transform 0.45s ease",
// //           }}
// //         />
// //         {/* icon badge */}
// //         <div
// //           className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center"
// //           style={{ backdropFilter: "blur(6px)" }}
// //         >
// //           <Icon />
// //         </div>
// //       </div>

// //       {/* ── Content area ────────────────────────────────── */}
// //       <div className="p-6 flex flex-col flex-1">
// //         <h3
// //           className="font-bold text-xl mb-2 leading-snug"
// //           style={{
// //             fontFamily: "Georgia, 'Times New Roman', serif",
// //             color: hovered ? "#1a3d2e" : "#111827",
// //             transition: "color 0.2s",
// //           }}
// //         >
// //           {path.label}
// //         </h3>
// //         <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
// //           {path.description}
// //         </p>
// //         <div
// //           className="flex items-center gap-1.5 text-sm font-bold"
// //           style={{ color: "#111827" }}
// //         >
// //           <span>{path.cta}</span>
// //           <span
// //             style={{
// //               display: "inline-flex",
// //               transform: hovered ? "translateX(5px)" : "translateX(0)",
// //               transition: "transform 0.22s ease",
// //             }}
// //           >
// //             <IconArrow />
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Modal: Sign In ───────────────────────────────────────────────────────────
// // function SignInModal({ onClose, onSuccess, onNavigateSignup }) {
// //   const [email, setEmail]       = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading]   = useState(false);
// //   const [error, setError]       = useState("");
// //   const overlayRef              = useRef(null);

// //   // Close on overlay click
// //   const handleOverlay = (e) => {
// //     if (e.target === overlayRef.current) onClose();
// //   };

// //   // Close on Escape
// //   useEffect(() => {
// //     const handler = (e) => { if (e.key === "Escape") onClose(); };
// //     window.addEventListener("keydown", handler);
// //     return () => window.removeEventListener("keydown", handler);
// //   }, [onClose]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     if (!email || !password) { setError("Please fill in all fields."); return; }
// //     setLoading(true);
// //     try {
// //       const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email, password }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Invalid credentials");
// //       if (data.token) localStorage.setItem("dwm_token", data.token);
// //       onSuccess();
// //     } catch (err) {
// //       console.warn("Auth error:", err.message);
// //       onSuccess();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       ref={overlayRef}
// //       onClick={handleOverlay}
// //       className="fixed inset-0 z-50 flex items-center justify-center px-4"
// //       style={{
// //         backgroundColor: "rgba(0,0,0,0.35)",
// //         backdropFilter: "blur(4px)",
// //         animation: "fadeIn 0.18s ease both",
// //       }}
// //     >
// //       <div
// //         className="bg-white rounded-2xl w-full max-w-sm p-8 relative shadow-2xl"
// //         style={{ animation: "slideUp 0.24s cubic-bezier(0.22,1,0.36,1) both" }}
// //       >
// //         {/* Close */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
// //           aria-label="Close"
// //         >
// //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
// //             <path d="M18 6 6 18M6 6l12 12" />
// //           </svg>
// //         </button>

// //         {/* Logo */}
// //         <div className="flex items-center gap-2.5 mb-6">
// //           <Logo size={34} />
// //           <div>
// //             <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">DineWithMee</p>
// //             {/* <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">with Mee</p> */}
// //           </div>
// //         </div>

// //         <h2 className="text-xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
// //           Welcome back
// //         </h2>
// //         <p className="text-sm text-gray-500 mb-6">Sign in to your account to continue.</p>

// //         {error && (
// //           <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
// //             {error}
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={e => setEmail(e.target.value)}
// //               placeholder="you@example.com"
// //               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
// //               autoFocus
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={e => setPassword(e.target.value)}
// //               placeholder="••••••••"
// //               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all"
// //             style={{
// //               backgroundColor: loading ? "#4a7c5e" : "#1a3d2e",
// //               opacity: loading ? 0.8 : 1,
// //             }}
// //           >
// //             {loading ? "Signing in…" : "Sign In"}
// //           </button>
// //         </form>

// //         <p className="text-center text-xs text-gray-400 mt-5">
// //           Don't have an account?{" "}
// //           <button 
// //             type="button"
// //             onClick={onNavigateSignup} 
// //             className="text-[#1a3d2e] font-bold hover:underline"
// //           >
// //             Get started
// //           </button>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─── Main Landing Page ────────────────────────────────────────────────────────
// // export default function LandingPage() {
// //   const navigate = useNavigate();
// //   const [showSignIn, setShowSignIn] = useState(false);
// //   const [loaded, setLoaded]         = useState(false);

// //   useEffect(() => {
// //     const t = setTimeout(() => setLoaded(true), 10);
// //     return () => clearTimeout(t);
// //   }, []);

// //   const handleSelect = (path) => navigate(path.route);
// //   const handleSignInSuccess = () => {
// //     setShowSignIn(false);
// //     navigate("/dashboard");
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex flex-col"
// //       style={{
// //         backgroundColor: "#f5f0e8",
// //         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes cardIn {
// //           from { opacity: 0; transform: translateY(30px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to   { opacity: 1; }
// //         }
// //         @keyframes slideUp {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes headerIn {
// //           from { opacity: 0; transform: translateY(-10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes heroIn {
// //           from { opacity: 0; transform: translateY(18px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>

// //       {/* ─── Header ─────────────────────────────────────────────────────── */}
// //       <header
// //         className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
// //         style={{ animation: "headerIn 0.4s ease both" }}
// //       >
// //         <div className="flex items-center gap-2.5">
// //           <Logo size={38} />
// //           <div className="leading-none">
// //             <p className="text-sm font-extrabold text-[#1a3d2e]">DineWithMee</p>
// //             {/* <p className="text-sm font-extrabold text-[#1a3d2e]">with Mee</p> */}
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-1.5">
// //           <span className="hidden sm:inline text-sm text-gray-500">
// //             Already have an account?
// //           </span>
// //           <button
// //             onClick={() => setShowSignIn(true)}
// //             className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1"
// //           >
// //             Sign In
// //           </button>
// //         </div>
// //       </header>

// //       {/* ─── Main Content ────────────────────────────────────────────────── */}
// //       <main className="flex-1 flex flex-col">
// //         <div
// //           className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14"
// //           style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}
// //         >
// //           <h1
// //             className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
// //             style={{
// //               color: "#1a3d2e",
// //               fontFamily: "Georgia, 'Times New Roman', serif",
// //             }}
// //           >
// //             Welcome to DineWithMee
// //           </h1>
// //           <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
// //             Every journey is unique. Select the path that best describes your goals
// //             and help us personalize your experience.
// //           </p>
// //         </div>

// //         <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
// //             {PATHS.map((path, i) => (
// //               <PathCard
// //                 key={path.id}
// //                 path={path}
// //                 index={i}
// //                 onSelect={handleSelect}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </main>

// //       {/* ─── Footer ──────────────────────────────────────────────────────── */}
// //       <footer
// //         className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5"
// //         style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}
// //       >
// //         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
// //           <div className="flex items-center gap-2">
// //             <Logo size={30} />
// //             <div className="leading-none">
// //               <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
// //               {/* <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p> */}
// //             </div>
// //           </div>

// //           <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
// //             {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
// //               <button
// //                 key={link}
// //                 className="hover:text-[#1a3d2e] transition-colors font-medium"
// //                 onClick={() => {}}
// //               >
// //                 {link}
// //               </button>
// //             ))}
// //           </nav>

// //           <p className="text-xs text-gray-400 whitespace-nowrap">
// //             © 2024 DineWithMee. All rights reserved.
// //           </p>
// //         </div>
// //       </footer>

// //       {/* ─── Sign In Modal ────────────────────────────────────────────────── */}
// //       {showSignIn && (
// //         <SignInModal
// //           onClose={() => setShowSignIn(false)}
// //           onSuccess={handleSignInSuccess}
// //           onNavigateSignup={() => {
// //             setShowSignIn(false);
// //             navigate("/signup");
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// // ─── Logo SVG ────────────────────────────────────────────────────────────────
// function Logo({ size = 42 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
//       <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
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

// function IconShieldGroup() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//       <path d="M12 8v8M9 12h6" />
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

// // ─── Path Data ────────────────────────────────────────────────────────────────
// const PATHS = [
//   {
//     id: "you",
//     label: "For You",
//     description: "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
//     cta: "Choose this path",
//     Icon: IconGrid,
//     image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard",
//   },
//   {
//     id: "professionals",
//     label: "For Professionals",
//     description: "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
//     cta: "Professional Access",
//     Icon: IconStethoscope,
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard",
//   },
//   {
//     id: "culinary",
//     label: "For Culinary Experts",
//     description: "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
//     cta: "Culinary Portal",
//     Icon: IconCutlery,
//     image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard",
//   },
//   {
//     id: "management",
//     label: "Management & Staff",
//     description: "Central access point for Administrators, Clinical Nutrition Leads, and Pharmacists to access their respective operational screens.",
//     cta: "Open Portal Selection",
//     Icon: IconShieldGroup,
//     image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&auto=format&fit=crop",
//     route: "management-selection",
//   },
// ];

// // ─── Path Card Component ──────────────────────────────────────────────────────
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
//         boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.11)" : "0 1px 8px rgba(0,0,0,0.06)",
//         transform: hovered ? "translateY(-5px)" : "translateY(0)",
//         transition: "box-shadow 0.28s ease, transform 0.28s ease",
//         animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
//         animationDelay: `${0.15 + index * 0.1}s`,
//       }}
//     >
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
//         <div className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center">
//           <Icon />
//         </div>
//       </div>

//       <div className="p-6 flex flex-col flex-1">
//         <h3
//           className="font-bold text-xl mb-2 leading-snug"
//           style={{
//             fontFamily: "Georgia, serif",
//             color: hovered ? "#1a3d2e" : "#111827",
//             transition: "color 0.2s",
//           }}
//         >
//           {path.label}
//         </h3>
//         <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
//           {path.description}
//         </p>
//         <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: "#111827" }}>
//           <span>{path.cta}</span>
//           <span style={{ display: "inline-flex", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.22s ease" }}>
//             <IconArrow />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Management Selection Modal ───────────────────────────────────────────────
// function ManagementSelectionModal({ onClose, onNavigate }) {
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   return (
//     <div
//       ref={overlayRef}
//       onClick={(e) => e.target === overlayRef.current && onClose()}
//       className="fixed inset-0 z-50 flex items-center justify-center px-4"
//       style={{
//         backgroundColor: "rgba(0,0,0,0.4)",
//         backdropFilter: "blur(6px)",
//         animation: "fadeIn 0.2s ease both",
//       }}
//     >
//       <div
//         className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl border border-gray-100"
//         style={{ animation: "slideUp 0.25s cubic-bezier(0.22,1,0.36,1) both" }}
//       >
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <path d="M18 6 6 18M6 6l12 12" />
//           </svg>
//         </button>

//         <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "Georgia, serif", color: "#1a3d2e" }}>
//           Select Management Portal
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">Choose your workspace terminal to sign in and proceed.</p>

//         <div className="space-y-3">
//           <button
//             onClick={() => { onClose(); onNavigate("/AdminAll"); }}
//             className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-[#1a3d2e] hover:bg-gray-50 transition-all flex items-center justify-between group"
//           >
//             <div>
//               <p className="font-bold text-gray-900 group-hover:text-[#1a3d2e]">Administrator Portal</p>
//               <p className="text-xs text-gray-500">Global system settings, logs, and platform configurations.</p>
//             </div>
//             <span className="text-gray-400 group-hover:text-[#1a3d2e] transform group-hover:translateX(3px) transition-all">
//               <IconArrow />
//             </span>
//           </button>

//           <button
//             onClick={() => { onClose(); onNavigate("/ClinicalNutritional"); }}
//             className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-[#1a3d2e] hover:bg-gray-50 transition-all flex items-center justify-between group"
//           >
//             <div>
//               <p className="font-bold text-gray-900 group-hover:text-[#1a3d2e]">Clinical Nutritional Portal</p>
//               <p className="text-xs text-gray-500">Dietary health plans, clinical matrixes, and validation charts.</p>
//             </div>
//             <span className="text-gray-400 group-hover:text-[#1a3d2e] transform group-hover:translateX(3px) transition-all">
//               <IconArrow />
//             </span>
//           </button>

//           <button
//             onClick={() => { onClose(); onNavigate("/Pharmacist"); }}
//             className="w-full p-4 text-left rounded-xl border border-gray-200 hover:border-[#1a3d2e] hover:bg-gray-50 transition-all flex items-center justify-between group"
//           >
//             <div>
//               <p className="font-bold text-gray-900 group-hover:text-[#1a3d2e]">Pharmacist Portal</p>
//               <p className="text-xs text-gray-500">Medication cross-referencing and interactive element tracking.</p>
//             </div>
//             <span className="text-gray-400 group-hover:text-[#1a3d2e] transform group-hover:translateX(3px) transition-all">
//               <IconArrow />
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main Landing Page Component ──────────────────────────────────────────────
// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [showMgmtSelect, setShowMgmtSelect] = useState(false);

//   const handleSelect = (path) => {
//     if (path.route === "management-selection") {
//       setShowMgmtSelect(true);
//     } else {
//       navigate(path.route);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8" }}>
//       <style>{`
//         @keyframes cardIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <header className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40">
//         <div className="flex items-center gap-2.5">
//           <Logo size={38} />
//           <p className="text-sm font-extrabold text-[#1a3d2e] leading-none">DineWithMee</p>
//         </div>
//       </header>

//       <main className="flex-1 flex flex-col">
//         <div className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: "#1a3d2e", fontFamily: "Georgia, serif" }}>
//             Welcome to DineWithMee
//           </h1>
//           <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
//             Select the workspace or portal route that matches your system access credentials.
//           </p>
//         </div>

//         <div className="px-4 sm:px-8 lg:px-16 w-full max-w-6xl mx-auto pb-16">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {PATHS.map((path, i) => (
//               <PathCard key={path.id} path={path} index={i} onSelect={handleSelect} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {showMgmtSelect && (
//         <ManagementSelectionModal onClose={() => setShowMgmtSelect(false)} onNavigate={(route) => navigate(route)} />
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ═══════════════════════════════════════════════════════════
   AUTH CONTEXT  — replaces react-router; handles session +
   role-based access control for the whole single-page app
═══════════════════════════════════════════════════════════ */
const AuthCtx = createContext(null);
const useAuth = () => useContext(AuthCtx);

/* ─── Role → allowed pages map ─────────────────────────── */
const ROLE_ROUTES = {
  user:       ["/dashboard"],
  professional:["/dashboard"],
  culinary:   ["/dashboard"],
  admin:      ["/AdminAll"],
  nutritionist:["/ClinicalNutritional"],
  pharmacist: ["/Pharmacist"],
};

/* ─── Role display names ───────────────────────────────── */
const ROLE_LABELS = {
  user:        "Personal User",
  professional:"Health Professional",
  culinary:    "Culinary Expert",
  admin:       "Administrator",
  nutritionist:"Clinical Nutritionist",
  pharmacist:  "Pharmacist",
};

/* ─── Path id → required role(s) ──────────────────────── */
const PATH_REQUIRED_ROLES = {
  you:          ["user"],
  professionals:["professional"],
  culinary:     ["culinary"],
  admin:        ["admin"],
  nutritionist: ["nutritionist"],
  pharmacist:   ["pharmacist"],
};

/* ═══════════════════════════════════════════════════════════
   ASSETS / ICONS
═══════════════════════════════════════════════════════════ */
function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
      <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
      <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
    </svg>
  );
}

const Ic = ({ d, size = 18, className = "", sw = 2, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const IP = {
  x:     "M18 6 6 18M6 6l12 12",
  eye:   ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  eyeOff:["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24","M1 1l22 22"],
  check: "M20 6L9 17l-5-5",
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  lock:  ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"],
  user:  ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  mail:  ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  arrow: "M5 12h14M12 5l7 7-7 7",
  chev:  "M9 18l6-6-6-6",
  logout:["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
  shield:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M12 8v8M9 12h6"],
  grid:  [],
  steth: ["M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3","M8 15v1a6 6 0 006 6 6 6 0 006-6v-4"],
  fork:  ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20","M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"],
  ban:   ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M4.93 4.93l14.14 14.14"],
  key:   ["M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"],
};

function IconGrid() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      {[5,12,19].map(cx => [5,12,19].map(cy => cx===19&&cy===19 ? null : (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#1a3d2e" />
      )))}
    </svg>
  );
}
function IconStethoscope() { return <Ic d={IP.steth} className="stroke-[#1a3d2e]" sw={2} />; }
function IconCutlery()     { return <Ic d={IP.fork}  className="stroke-[#1a3d2e]" sw={2} />; }
function IconShieldGroup() { return <Ic d={IP.shield} className="stroke-[#1a3d2e]" sw={2} />; }
function IconArrow()       { return <Ic d={IP.arrow} size={15} className="stroke-current" sw={2.5} />; }

/* ═══════════════════════════════════════════════════════════
   PATHS CONFIG
═══════════════════════════════════════════════════════════ */
const PATHS = [
  {
    id: "you", label: "For You",
    description: "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
    cta: "Choose this path", Icon: IconGrid,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
    route: "/dashboard", requiresAuth: true, allowedRoles: ["user"],
    roleHint: "Personal User account required",
    badge: "Personal",
  },
  {
    id: "professionals", label: "For Professionals",
    description: "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
    cta: "Professional Access", Icon: IconStethoscope,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
    route: "/dashboard", requiresAuth: true, allowedRoles: ["professional"],
    roleHint: "Health Professional role required",
    badge: "Professional",
  },
  {
    id: "culinary", label: "For Culinary Experts",
    description: "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
    cta: "Culinary Portal", Icon: IconCutlery,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
    route: "/dashboard", requiresAuth: true, allowedRoles: ["culinary"],
    roleHint: "Culinary Expert role required",
    badge: "Culinary",
  },
  {
    id: "management", label: "Management & Staff",
    description: "Central access point for Administrators, Clinical Nutrition Leads, and Pharmacists to access their respective operational portals.",
    cta: "Open Portal Selection", Icon: IconShieldGroup,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&auto=format&fit=crop",
    route: "management-selection", requiresAuth: true, allowedRoles: ["admin","nutritionist","pharmacist"],
    roleHint: "Admin / Nutritionist / Pharmacist role required",
    badge: "Staff Only",
  },
];

/* ═══════════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════════ */
function cls(...a) { return a.filter(Boolean).join(" "); }

/* ═══════════════════════════════════════════════════════════
   PASSWORD INPUT
═══════════════════════════════════════════════════════════ */
function PwInput({ value, onChange, placeholder, error, label }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>}
      <div className="relative">
        <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder || "••••••••"}
          className={cls(
            "w-full px-4 py-2.5 pr-10 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
            error ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]"
          )} />
        <button type="button" onClick={() => setShow(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
          <Ic d={show ? IP.eyeOff : IP.eye} size={15} />
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACCESS DENIED SCREEN
═══════════════════════════════════════════════════════════ */
function AccessDenied({ path, userRole, onBack, onSwitchRole }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", animation: "fadeIn .2s ease both" }}>
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl text-center"
        style={{ animation: "slideUp .25s cubic-bezier(.22,1,.36,1) both" }}>
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border-4 border-red-100">
          <Ic d={IP.ban} size={38} className="text-red-500" sw={1.5} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
          Access Denied
        </h2>
        <p className="text-sm text-gray-500 mb-2 leading-relaxed">
          Your role <span className="font-bold text-gray-800">"{ROLE_LABELS[userRole] || userRole}"</span> does not have permission to access
        </p>
        <p className="text-base font-bold text-[#1a3d2e] mb-1">"{path?.label}"</p>
        <p className="text-xs text-gray-400 mb-6">{path?.roleHint}</p>

        {/* Required roles */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 text-left">
          <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">Required role(s)</p>
          <div className="flex flex-wrap gap-2">
            {path?.allowedRoles.map(r => (
              <span key={r} className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
                {ROLE_LABELS[r] || r}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button onClick={onSwitchRole}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98]"
            style={{ backgroundColor: "#1a3d2e" }}>
            Sign in with a different role
          </button>
          <button onClick={onBack}
            className="w-full py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:border-gray-400 transition-all active:scale-[.98]">
            Back to landing
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIGN IN / SIGN UP MODAL — with role selector
═══════════════════════════════════════════════════════════ */
function AuthModal({ mode: initMode = "signin", onClose, onSuccess, targetPath }) {
  const overlayRef           = useRef(null);
  const [mode, setMode]      = useState(initMode); // "signin" | "signup"
  const [step, setStep]      = useState(1);         // signup: 1=role, 2=details
  const [role, setRole]      = useState("");
  const [name, setName]      = useState("");
  const [email, setEmail]    = useState("");
  const [password, setPw]    = useState("");
  const [confirm, setConfirm]= useState("");
  const [loading, setLoading]= useState(false);
  const [errors, setErrors]  = useState({});
  const [apiError, setApiError] = useState("");

  // Roles available for sign-up
  const SIGNUP_ROLES = [
    { id: "user",         label: "Personal User",       desc: "Track your personal health & meals",           icon: IP.user   },
    { id: "professional", label: "Health Professional", desc: "Nutritionists & health practitioners",          icon: IP.steth  },
    { id: "culinary",     label: "Culinary Expert",     desc: "Chefs & dietary meal creators",                icon: IP.fork   },
    { id: "admin",        label: "Administrator",       desc: "Platform management & system settings",        icon: IP.shield },
    { id: "nutritionist", label: "Clinical Nutritionist",desc:"Clinical dietary plans & health matrices",     icon: IP.steth  },
    { id: "pharmacist",   label: "Pharmacist",          desc: "Medication cross-reference & tracking",        icon: IP.key    },
  ];

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!email.trim())     e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password)         e.password = "Password is required";
    else if (mode === "signup" && password.length < 6) e.password = "At least 6 characters";
    if (mode === "signup") {
      if (!name.trim())    e.name     = "Full name is required";
      if (!role)           e.role     = "Please select a role";
      if (password !== confirm) e.confirm = "Passwords do not match";
    }
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      if (mode === "signin") {
        /* ── SIGN IN ── */
        const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        let data;
        try { data = await res.json(); } catch { data = {}; }

        if (!res.ok) throw new Error(data?.message || data?.error || `Error ${res.status}`);

        /* ── Extract token & role from response ── */
        const token    = data?.token || data?.data?.token || data?.accessToken || "";
        const userRole = data?.role  || data?.data?.role  || data?.user?.role  || "user";
        if (token)    localStorage.setItem("dwm_token", token);
        localStorage.setItem("dwm_role",  userRole);
        localStorage.setItem("dwm_email", email.trim());
        onSuccess({ role: userRole, email: email.trim(), name: data?.name || email.split("@")[0] });

      } else {
        /* ── SIGN UP ── */
        const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role }),
        });
        let data;
        try { data = await res.json(); } catch { data = {}; }

        if (!res.ok) throw new Error(data?.message || data?.error || `Error ${res.status}`);

        const token    = data?.token || data?.data?.token || data?.accessToken || "";
        const userRole = data?.role  || data?.data?.role  || role;
        if (token)    localStorage.setItem("dwm_token", token);
        localStorage.setItem("dwm_role",  userRole);
        localStorage.setItem("dwm_email", email.trim());
        localStorage.setItem("dwm_name",  name.trim());
        onSuccess({ role: userRole, email: email.trim(), name: name.trim() });
      }
    } catch (err) {
      /* ── If server is sleeping (Render cold start) still allow demo mode ── */
      if (err.message.includes("Failed to fetch") || err.message.includes("504") || err.message.includes("500")) {
        const userRole = mode === "signup" ? role : "user";
        localStorage.setItem("dwm_role",  userRole);
        localStorage.setItem("dwm_email", email.trim());
        localStorage.setItem("dwm_name",  name.trim() || email.split("@")[0]);
        setApiError("⚠️ Server waking up — signed in with demo mode.");
        setTimeout(() => onSuccess({ role: userRole, email: email.trim(), name: name.trim() || email.split("@")[0] }), 1200);
      } else {
        setApiError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isSignIn = mode === "signin";

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", animation: "fadeIn .18s ease both" }}>

      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto"
        style={{ animation: "slideUp .24s cubic-bezier(.22,1,.36,1) both" }}>

        {/* ── Top accent bar ── */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#1a3d2e,#e8c87d,#1a3d2e)" }} />

        <div className="p-7 sm:p-8">
          {/* Close */}
          <button onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors z-10">
            <Ic d={IP.x} size={20} sw={2.5} />
          </button>

          {/* Logo + headline */}
          <div className="flex items-center gap-3 mb-6">
            <Logo size={36} />
            <div className="leading-none">
              <p className="text-xs font-extrabold text-[#1a3d2e]">Dine</p>
              <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
            {isSignIn ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            {isSignIn
              ? "Sign in to access your portal."
              : "Choose your role and get started — it only takes a minute."}
          </p>

          {/* Target path hint */}
          {targetPath && (
            <div className="mb-4 px-3.5 py-2.5 bg-[#f0f7f3] border border-[#1a3d2e]/20 rounded-xl flex items-center gap-2">
              <Ic d={IP.lock} size={13} className="text-[#1a3d2e] flex-shrink-0" />
              <p className="text-xs text-[#1a3d2e] font-semibold">
                Signing in to access: <span className="font-black">{targetPath.label}</span>
              </p>
            </div>
          )}

          {/* API error */}
          {apiError && (
            <div className={cls("mb-4 px-3 py-2.5 rounded-xl text-xs font-medium border",
              apiError.startsWith("⚠️") ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-red-50 border-red-100 text-red-600"
            )}>
              {apiError}
            </div>
          )}

          {/* ── SIGN-UP: Role selection step ── */}
          {!isSignIn && step === 1 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Select your role <span className="text-red-500">*</span>
              </p>
              {errors.role && <p className="text-xs text-red-500 font-medium mb-2">{errors.role}</p>}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {SIGNUP_ROLES.map(r => (
                  <button key={r.id} type="button" onClick={() => { setRole(r.id); setErrors(e => ({ ...e, role: "" })); }}
                    className={cls(
                      "w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all",
                      role === r.id
                        ? "border-[#1a3d2e] bg-[#f0f7f3] shadow-sm"
                        : "border-gray-200 hover:border-[#1a3d2e]/40 hover:bg-gray-50"
                    )}>
                    <div className={cls("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                      role === r.id ? "bg-[#1a3d2e]" : "bg-gray-100")}>
                      <Ic d={r.icon} size={16} className={role === r.id ? "text-white stroke-white" : "text-gray-500"} sw={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cls("text-sm font-bold leading-tight", role === r.id ? "text-[#1a3d2e]" : "text-gray-800")}>{r.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{r.desc}</p>
                    </div>
                    {role === r.id && <Ic d={IP.check} size={15} className="text-[#1a3d2e] flex-shrink-0" sw={2.5} />}
                  </button>
                ))}
              </div>
              <button onClick={() => { if (!role) { setErrors({ role: "Please select a role to continue" }); return; } setStep(2); }}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98]"
                style={{ backgroundColor: "#1a3d2e" }}>
                Continue with {role ? ROLE_LABELS[role] : "selected role"} →
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                Already have an account?{" "}
                <button onClick={() => { setMode("signin"); setStep(1); }} className="text-[#1a3d2e] font-bold hover:underline">
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* ── SIGN-UP: Details step ── */}
          {!isSignIn && step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role badge */}
              <div className="flex items-center gap-2 mb-1">
                <button type="button" onClick={() => setStep(1)} className="text-xs text-[#1a3d2e] hover:underline font-semibold">← Change role</button>
                <span className="flex-1" />
                <span className="text-xs font-bold bg-[#1a3d2e] text-white px-2.5 py-1 rounded-full">{ROLE_LABELS[role]}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: "" })); }}
                  placeholder="Your full name" autoFocus
                  className={cls("w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                    errors.name ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]")} />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email <span className="text-red-500">*</span></label>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
                  placeholder="you@example.com"
                  className={cls("w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                    errors.email ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]")} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <PwInput label="Password *" value={password} error={errors.password}
                onChange={v => { setPw(v); setErrors(e => ({ ...e, password: "" })); }} />

              <PwInput label="Confirm Password *" value={confirm} error={errors.confirm}
                onChange={v => { setConfirm(v); setErrors(e => ({ ...e, confirm: "" })); }} placeholder="Repeat password" />

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98] disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#1a3d2e" }}>
                {loading ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Creating account…</> : "Create Account"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <button type="button" onClick={() => { setMode("signin"); setStep(1); }} className="text-[#1a3d2e] font-bold hover:underline">Sign in</button>
              </p>
            </form>
          )}

          {/* ── SIGN IN form ── */}
          {isSignIn && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
                  placeholder="you@example.com" autoFocus
                  className={cls("w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
                    errors.email ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]")} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <PwInput label="Password" value={password} error={errors.password}
                onChange={v => { setPw(v); setErrors(e => ({ ...e, password: "" })); }} />

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98] disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ backgroundColor: loading ? "#4a7c5e" : "#1a3d2e" }}>
                {loading ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Signing in…</> : "Sign In"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Don't have an account?{" "}
                <button type="button" onClick={() => { setMode("signup"); setStep(1); setErrors({}); }} className="text-[#1a3d2e] font-bold hover:underline">Get started</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MANAGEMENT SELECTION MODAL (staff portals)
═══════════════════════════════════════════════════════════ */
function ManagementSelectionModal({ onClose, onNavigate, userRole }) {
  const overlayRef = useRef(null);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const portals = [
    { id: "admin",        label: "Administrator Portal",      desc: "Global system settings, logs, and platform configurations.", route: "/AdminAll",           roles: ["admin"]        },
    { id: "nutritionist", label: "Clinical Nutritional Portal",desc:"Dietary health plans, clinical matrixes, and validation charts.", route: "/ClinicalNutritional", roles: ["nutritionist"] },
    { id: "pharmacist",   label: "Pharmacist Portal",         desc: "Medication cross-referencing and interactive element tracking.", route: "/Pharmacist",          roles: ["pharmacist"]   },
  ];

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", animation: "fadeIn .2s ease both" }}>

      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl border border-gray-100"
        style={{ animation: "slideUp .25s cubic-bezier(.22,1,.36,1) both" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <Ic d={IP.x} size={20} sw={2.5} />
        </button>

        <h2 className="text-2xl font-black mb-1" style={{ fontFamily: "Georgia, serif", color: "#1a3d2e" }}>
          Select Management Portal
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your role: <span className="font-bold text-[#1a3d2e]">{ROLE_LABELS[userRole] || userRole}</span>
        </p>

        <div className="space-y-3">
          {portals.map(portal => {
            const allowed = portal.roles.includes(userRole);
            return (
              <button key={portal.id}
                onClick={() => allowed ? onNavigate(portal.route) : null}
                disabled={!allowed}
                className={cls(
                  "w-full p-4 text-left rounded-xl border transition-all flex items-center justify-between group",
                  allowed
                    ? "border-gray-200 hover:border-[#1a3d2e] hover:bg-gray-50 cursor-pointer"
                    : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                )}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={cls("font-bold text-sm", allowed ? "text-gray-900 group-hover:text-[#1a3d2e]" : "text-gray-400")}>
                      {portal.label}
                    </p>
                    {!allowed && <span className="text-[10px] font-bold bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">No access</span>}
                    {allowed  && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Allowed</span>}
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{portal.desc}</p>
                  {!allowed && <p className="text-xs text-red-400 mt-1 font-medium">Requires: {portal.roles.map(r => ROLE_LABELS[r]).join(", ")}</p>}
                </div>
                {allowed && (
                  <span className="text-gray-400 group-hover:text-[#1a3d2e] ml-3 flex-shrink-0 transition-all">
                    <IconArrow />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PATH CARD
═══════════════════════════════════════════════════════════ */
function PathCard({ path, index, onSelect, isLoggedIn, userRole }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = path;

  const isLocked    = !isLoggedIn;
  const hasAccess   = isLoggedIn && path.allowedRoles.includes(userRole);
  const wrongRole   = isLoggedIn && !path.allowedRoles.includes(userRole);

  return (
    <div
      onClick={() => onSelect(path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col relative"
      style={{
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.11)" : "0 1px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.28s ease, transform 0.28s ease",
        animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
        animationDelay: `${0.15 + index * 0.1}s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <img src={path.image} alt={path.label} className="w-full h-full object-cover"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.45s ease" }} />

        {/* Dim overlay for wrong-role */}
        {wrongRole && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white/90 rounded-xl px-3 py-2 flex items-center gap-1.5">
              <Ic d={IP.ban} size={14} className="text-red-500" sw={2} />
              <span className="text-xs font-bold text-red-600">Role mismatch</span>
            </div>
          </div>
        )}

        {/* Lock overlay for guests */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
              <Ic d={IP.lock} size={13} className="text-[#1a3d2e]" sw={2} />
              <span className="text-[11px] font-bold text-[#1a3d2e]">Sign in required</span>
            </div>
          </div>
        )}

        {/* Role badge */}
        <div className="absolute top-3 right-3">
          <span className={cls(
            "text-[10px] font-bold px-2.5 py-1 rounded-full",
            hasAccess  ? "bg-emerald-500 text-white" :
            wrongRole  ? "bg-red-500 text-white" :
                         "bg-[#1a3d2e]/80 text-white"
          )}>
            {hasAccess ? "✓ Accessible" : wrongRole ? "✗ No Access" : path.badge}
          </span>
        </div>

        {/* Icon badge */}
        <div className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center"
          style={{ backdropFilter: "blur(6px)" }}>
          <Icon />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl mb-2 leading-snug"
          style={{ fontFamily: "Georgia, serif", color: hovered ? "#1a3d2e" : "#111827", transition: "color 0.2s" }}>
          {path.label}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-3">{path.description}</p>

        {/* Role hint */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <Ic d={IP.user} size={11} className="text-gray-300" sw={1.8} />
          <span>{path.roleHint}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: "#111827" }}>
          <span>{isLocked ? "Sign in to access" : path.cta}</span>
          <span style={{ display: "inline-flex", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.22s ease" }}>
            <IconArrow />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STUB PAGE VIEWS (in-app routing without react-router)
═══════════════════════════════════════════════════════════ */
function StubPage({ title, color = "#1a3d2e", onBack, user }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#f5f0e8", fontFamily: "Georgia, serif" }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: color + "1a", border: `3px solid ${color}` }}>
        <Ic d={IP.check} size={36} className="stroke-current" sw={2} style={{ color }} />
      </div>
      <h1 className="text-3xl font-black mb-3" style={{ color }}>{title}</h1>
      <p className="text-gray-500 mb-2">Welcome, <strong>{user?.name || user?.email}</strong></p>
      <p className="text-sm text-gray-400 mb-8">Role: <span className="font-bold">{ROLE_LABELS[user?.role]}</span></p>
      <button onClick={onBack}
        className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98]"
        style={{ backgroundColor: color }}>
        ← Back to Landing
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN LANDING PAGE
═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  /* ── Session state ── */
  const [user, setUser]           = useState(() => {
    const role  = localStorage.getItem("dwm_role");
    const email = localStorage.getItem("dwm_email");
    const name  = localStorage.getItem("dwm_name");
    if (role && email) return { role, email, name: name || email.split("@")[0] };
    return null;
  });

  /* ── Modal / UI state ── */
  const [authModal,     setAuthModal]     = useState(null); // null | { mode, targetPath }
  const [mgmtModal,     setMgmtModal]     = useState(false);
  const [accessDenied,  setAccessDenied]  = useState(null); // null | { path }
  const [currentPage,   setCurrentPage]   = useState("/");  // client-side route
  const [toast,         setToast]         = useState(null);

  /* ── Toast auto-dismiss ── */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  /* ── Auth handlers ── */
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setAuthModal(null);
    setToast({ msg: `Welcome${userData.name ? ", " + userData.name : ""}! Signed in as ${ROLE_LABELS[userData.role]}.`, type: "success" });
  };

  const handleLogout = () => {
    localStorage.removeItem("dwm_token");
    localStorage.removeItem("dwm_role");
    localStorage.removeItem("dwm_email");
    localStorage.removeItem("dwm_name");
    setUser(null);
    setCurrentPage("/");
    setToast({ msg: "You've been signed out.", type: "warn" });
  };

  /* ── Path card click ── */
  const handleSelect = (path) => {
    /* 1. Not logged in → open auth modal */
    if (!user) {
      setAuthModal({ mode: "signin", targetPath: path });
      return;
    }

    /* 2. Logged in but wrong role → access denied */
    if (!path.allowedRoles.includes(user.role)) {
      setAccessDenied({ path });
      return;
    }

    /* 3. Management selection */
    if (path.route === "management-selection") {
      setMgmtModal(true);
      return;
    }

    /* 4. Navigate */
    setCurrentPage(path.route);
  };

  /* ── Management portal navigate ── */
  const handleMgmtNavigate = (route) => {
    setMgmtModal(false);
    setCurrentPage(route);
  };

  /* ── If navigated to a stub page ── */
  if (currentPage !== "/") {
    const titles = {
      "/dashboard":          "Personal Dashboard",
      "/AdminAll":           "Admin Console",
      "/ClinicalNutritional":"Clinical Nutritional Portal",
      "/Pharmacist":         "Pharmacist Portal",
    };
    return (
      <StubPage
        title={titles[currentPage] || currentPage}
        color={currentPage === "/AdminAll" ? "#c96a4f" : "#1a3d2e"}
        user={user}
        onBack={() => setCurrentPage("/")}
      />
    );
  }

  /* ═══ LANDING RENDER ═══ */
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <style>{`
        @keyframes cardIn  { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes headerIn{ from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes heroIn  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ════ HEADER ════ */}
      <header className="w-full border-b border-gray-200 bg-[#f5f0e8] px-5 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
        style={{ animation: "headerIn .4s ease both" }}>
        <div className="flex items-center gap-2.5">
          <Logo size={36} />
          <div className="leading-none">
            <p className="text-sm font-extrabold text-[#1a3d2e]">Dine</p>
            <p className="text-sm font-extrabold text-[#1a3d2e]">with Mee</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            /* ── Logged-in user chip ── */
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="text-xs font-bold text-[#1a3d2e]">{user.name || user.email}</span>
                <span className="text-[10px] font-semibold text-[#1a3d2e]/60 bg-[#1a3d2e]/10 px-2 py-0.5 rounded-full mt-0.5">
                  {ROLE_LABELS[user.role]}
                </span>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a3d2e] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-extrabold">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </span>
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl">
                <Ic d={IP.logout} size={13} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          ) : (
            /* ── Guest ── */
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-gray-500">Already have an account?</span>
              <button onClick={() => setAuthModal({ mode: "signin" })}
                className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#1a3d2e]/5">
                Sign In
              </button>
              <button onClick={() => setAuthModal({ mode: "signup" })}
                className="text-sm font-bold text-white px-4 py-2 rounded-xl transition-all active:scale-[.97]"
                style={{ backgroundColor: "#1a3d2e" }}>
                Get started
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ════ HERO ════ */}
      <main className="flex-1 flex flex-col">
        <div className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14"
          style={{ animation: "heroIn .55s ease both", animationDelay: "0.06s" }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
            style={{ color: "#1a3d2e", fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Welcome to DineWithMee
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            {user
              ? `Hello, ${user.name || "there"} — select the path that matches your credentials below.`
              : "Every journey is unique. Sign in to unlock your portal and personalize your experience."}
          </p>

          {/* Auth nudge for guests */}
          {!user && (
            <div className="mt-6 inline-flex items-center gap-2 bg-[#1a3d2e]/5 border border-[#1a3d2e]/15 rounded-2xl px-4 py-2.5">
              <Ic d={IP.lock} size={14} className="text-[#1a3d2e]" />
              <span className="text-sm text-[#1a3d2e] font-semibold">
                You must sign in to access any portal
              </span>
            </div>
          )}
        </div>

        {/* ════ CARDS GRID ════ */}
        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {PATHS.map((path, i) => (
              <PathCard key={path.id} path={path} index={i}
                onSelect={handleSelect}
                isLoggedIn={!!user}
                userRole={user?.role}
              />
            ))}
          </div>

          {/* Role guide for logged-in users */}
          {user && (
            <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6"
              style={{ animation: "fadeIn .4s ease both" }}>
              <div className="flex items-center gap-2 mb-3">
                <Ic d={IP.shield} size={16} className="text-[#1a3d2e]" sw={2} />
                <p className="text-sm font-bold text-[#1a3d2e]">Your Access Map</p>
                <span className="ml-auto text-xs font-bold bg-[#1a3d2e] text-white px-2.5 py-1 rounded-full">{ROLE_LABELS[user.role]}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PATHS.map(p => {
                  const ok = p.allowedRoles.includes(user.role);
                  return (
                    <div key={p.id} className={cls("rounded-xl p-3 flex items-center gap-2",
                      ok ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50 border border-gray-100")}>
                      <Ic d={ok ? IP.check : IP.ban} size={14}
                        className={ok ? "text-emerald-600 flex-shrink-0" : "text-gray-300 flex-shrink-0"} sw={2.5} />
                      <span className={cls("text-xs font-semibold", ok ? "text-emerald-700" : "text-gray-400")}>{p.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ════ FOOTER ════ */}
      <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
            {["Privacy Policy","Terms of Service","HIPAA Compliance","Contact Support"].map(l => (
              <button key={l} className="hover:text-[#1a3d2e] transition-colors font-medium">{l}</button>
            ))}
          </nav>
          <p className="text-xs text-gray-400 whitespace-nowrap">© 2024 DineWithMee. All rights reserved.</p>
        </div>
      </footer>

      {/* ════ AUTH MODAL ════ */}
      {authModal && (
        <AuthModal
          mode={authModal.mode}
          targetPath={authModal.targetPath}
          onClose={() => setAuthModal(null)}
          onSuccess={(userData) => {
            handleAuthSuccess(userData);
            /* If they were trying to access a specific path, trigger it */
            if (authModal.targetPath) {
              setTimeout(() => handleSelect(authModal.targetPath), 300);
            }
          }}
        />
      )}

      {/* ════ MANAGEMENT MODAL ════ */}
      {mgmtModal && (
        <ManagementSelectionModal
          onClose={() => setMgmtModal(false)}
          onNavigate={handleMgmtNavigate}
          userRole={user?.role}
        />
      )}

      {/* ════ ACCESS DENIED ════ */}
      {accessDenied && (
        <AccessDenied
          path={accessDenied.path}
          userRole={user?.role}
          onBack={() => setAccessDenied(null)}
          onSwitchRole={() => {
            setAccessDenied(null);
            handleLogout();
            setAuthModal({ mode: "signin", targetPath: accessDenied.path });
          }}
        />
      )}

      {/* ════ TOAST ════ */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white max-w-sm w-[90vw]"
          style={{
            backgroundColor: toast.type === "error" ? "#dc2626" : toast.type === "warn" ? "#d97706" : "#1a3d2e",
            animation: "toastIn .2s ease both",
          }}>
          <Ic d={toast.type === "error" ? IP.ban : toast.type === "warn" ? IP.alert : IP.check}
            size={16} sw={2.5} className={toast.type === "success" ? "text-emerald-400" : "text-white/80"} />
          <p className="text-sm font-semibold flex-1">{toast.msg}</p>
          <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
            <Ic d={IP.x} size={14} sw={2} />
          </button>
        </div>
      )}
    </div>
  );
}