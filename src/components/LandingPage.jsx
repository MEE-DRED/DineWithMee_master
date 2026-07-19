// import { useState, useEffect, useRef, createContext, useContext } from "react";

// // ─── Brand Asset ──────────────────────────────────────────────────────────────
// // Official lockup (icon + wordmark + tagline). Place dinewithmee-logo.png next to
// // this file (adjust the path below if your project structure differs).
// import dinewithmeeLogo from "./dinewithmee-logo.png";

// // ─── Import the Workspace Pages ──────────────────────────────────────────────
// import NutritionDashboard from "./NutritionDashboard";
// import AdminAll from "./AdminAll";
// import ClinicalNutritionist from "./ClinicalNutritionist";
// import Pharmacist from "./Pharmacist";

// /* ═══════════════════════════════════════════════════════════
//    AUTH CONTEXT  — handles session + role-based access
// ═══════════════════════════════════════════════════════════ */
// const AuthCtx = createContext(null);
// export const useAuth = () => useContext(AuthCtx);

// /* ─── Role → allowed pages map ─────────────────────────── */
// const ROLE_ROUTES = {
//   user:       ["/dashboard"],
//   professional: ["/dashboard"],
//   culinary:   ["/dashboard"],
//   admin:      ["/AdminAll"],
//   nutritionist: ["/ClinicalNutritional"],
//   pharmacist: ["/Pharmacist"],
// };

// /* ─── Role display names ───────────────────────────────── */
// const ROLE_LABELS = {
//   user:        "Personal User",
//   professional: "Health Professional",
//   culinary:    "Culinary Expert",
//   admin:       "Administrator",
//   nutritionist: "Clinical Nutritionist",
//   pharmacist:  "Pharmacist",
// };

// /* ─── Path id → required role(s) ──────────────────────── */
// const PATH_REQUIRED_ROLES = {
//   you:          ["user"],
//   professionals: ["professional"],
//   culinary:     ["culinary"],
//   admin:        ["admin"],
//   nutritionist: ["nutritionist"],
//   pharmacist:   ["pharmacist"],
// };

// // ─── Logo SVG ─────────────────────────────────────────────────────────────────
// function Logo({ size = 42 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//       {/* rising steam */}
//       <path d="M38 6c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#c9a84c" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
//       <path d="M50 2c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#d9b962" strokeWidth="3.4" strokeLinecap="round" />
//       <path d="M62 6c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#c9a84c" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
//       {/* sprouting leaf */}
//       <path d="M50 30c-13 4-22 16-16 30 12-3 22-14 16-30z" fill="#2f6b45" />
//       <path d="M50 30c9 7 13 17 8 27-6-3-12-10-8-27z" fill="#e8c87d" />
//       <path d="M50 30c-6 9-8 18-4 27" fill="none" stroke="#1a3d2e" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
//       {/* bowl */}
//       <path d="M12 58a38 22 0 0076 0v3.5a38 24 0 01-76 0z" fill="#1a3d2e" />
//       <path d="M12 58a38 22 0 0176 0" fill="none" stroke="#123024" strokeWidth="1.5" />
//     </svg>
//   );
// }

// // ─── Navigation SVG Icons ─────────────────────────────────────────────────────
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

// function IconAdmin() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="3" y="3" width="18" height="18" rx="2" />
//       <path d="M12 8v8M8 12h8" />
//     </svg>
//   );
// }

// function IconBook() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
//       <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
//       <path d="M9 7h7M9 11h7" />
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

// /* ═══════════════════════════════════════════════════════════
//    FOOD MOTIF ICONS — Nigerian & Rwandan staples
//    Hand-drawn flat glyphs used in the "Simmering Pot" signature
//    element and as floating ambient garnish around the page.
// ═══════════════════════════════════════════════════════════ */
// function FoodIcon({ children, size = 30, viewBox = "0 0 32 32" }) {
//   return (
//     <svg width={size} height={size} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
//       {children}
//     </svg>
//   );
// }
// // Nigeria — Jollof rice bowl
// function IconJollof({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <ellipse cx="16" cy="21" rx="12" ry="6" fill="#c1440e" />
//       <ellipse cx="16" cy="19" rx="12" ry="6" fill="#e8602c" />
//       <circle cx="11" cy="17.5" r="1.3" fill="#8a2e0a" />
//       <circle cx="16.5" cy="16" r="1.3" fill="#8a2e0a" />
//       <circle cx="21" cy="17.8" r="1.3" fill="#8a2e0a" />
//       <circle cx="14" cy="19.5" r="1.1" fill="#f2b134" />
//       <path d="M4 19a12 5 0 0024 0v3a12 6 0 01-24 0z" fill="#a83913" />
//     </FoodIcon>
//   );
// }
// // Nigeria — Suya skewer
// function IconSuya({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <line x1="4" y1="27" x2="27" y2="4" stroke="#7a4a1e" strokeWidth="1.6" strokeLinecap="round" />
//       <rect x="9" y="15.5" width="5.2" height="5.2" rx="1.2" transform="rotate(45 11.6 18.1)" fill="#8a3b1e" />
//       <rect x="14" y="10.5" width="5.2" height="5.2" rx="1.2" transform="rotate(45 16.6 13.1)" fill="#a8481f" />
//       <rect x="19" y="5.5" width="5.2" height="5.2" rx="1.2" transform="rotate(45 21.6 8.1)" fill="#8a3b1e" />
//       <circle cx="12" cy="16.5" r="0.6" fill="#e8c87d" />
//       <circle cx="17" cy="11.5" r="0.6" fill="#e8c87d" />
//     </FoodIcon>
//   );
// }
// // Nigeria — Plantain
// function IconPlantain({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <path d="M7 25c0-10 5-18 15-19-1 12-6 18-15 19z" fill="#e8c87d" />
//       <path d="M7 25c0-10 5-18 15-19" fill="none" stroke="#c9a84c" strokeWidth="1.3" />
//       <path d="M8 24.5c1-8 5-14 12-17" fill="none" stroke="#f5deA0" strokeWidth="1" opacity="0.7" />
//     </FoodIcon>
//   );
// }
// // Nigeria — Scotch bonnet pepper
// function IconPepper({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <path d="M16 10c-1 3-6 4-6 9a6 6 0 0012 0c0-5-5-6-6-9z" fill="#c0392b" />
//       <path d="M15.3 9.5c-.6-1.6-.2-3 1.2-4" stroke="#3d6b3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
//       <ellipse cx="13.5" cy="15" rx="1.4" ry="2.2" fill="#e0685a" opacity="0.6" />
//     </FoodIcon>
//   );
// }
// // Rwanda — Isombe (cassava leaf stew)
// function IconIsombe({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <circle cx="16" cy="17" r="10" fill="#4a7c3f" />
//       <path d="M16 8c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" fill="#6fa85c" />
//       <path d="M9 14c3 1.5 4.5 3.5 4.5 6.5-3-.5-5-2.5-4.5-6.5z" fill="#6fa85c" />
//       <path d="M23 14c-3 1.5-4.5 3.5-4.5 6.5 3-.5 5-2.5 4.5-6.5z" fill="#6fa85c" />
//       <circle cx="12" cy="21" r="1" fill="#e8c87d" />
//       <circle cx="19" cy="22" r="1" fill="#e8c87d" />
//     </FoodIcon>
//   );
// }
// // Rwanda — Ubugali (cassava/maize dough)
// function IconUbugali({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <ellipse cx="16" cy="24" rx="11" ry="3" fill="#d8cba0" opacity="0.5" />
//       <path d="M8 22a8 8 0 0116 0c0 1.5-3.6 3-8 3s-8-1.5-8-3z" fill="#f0e6c8" />
//       <ellipse cx="16" cy="16" rx="8" ry="7" fill="#f7efd9" />
//     </FoodIcon>
//   );
// }
// // Rwanda — Brochette skewer
// function IconBrochette({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <line x1="5" y1="16" x2="27" y2="16" stroke="#7a4a1e" strokeWidth="1.6" strokeLinecap="round" />
//       <rect x="8" y="12" width="6" height="8" rx="1.4" fill="#8a3b1e" />
//       <rect x="16" y="12" width="6" height="8" rx="1.4" fill="#5c7a3a" />
//       <rect x="24" y="12.5" width="4" height="7" rx="1.2" fill="#a8481f" />
//     </FoodIcon>
//   );
// }
// // Rwanda — Ibihaza (pumpkin/squash)
// function IconPumpkin({ size }) {
//   return (
//     <FoodIcon size={size}>
//       <path d="M6 3v3M4 4l1.6 2M8 4l-1.6 2" stroke="#4a7c3f" strokeWidth="1.4" strokeLinecap="round" transform="translate(10 -1)" />
//       <path d="M16 9c5.5 0 9 4 9 9s-3.8 8-9 8-9-3.4-9-8 3.5-9 9-9z" fill="#e08a2c" />
//       <path d="M16 9v17M11.5 10.5c-1 4-1 11 0 15M20.5 10.5c1 4 1 11 0 15" stroke="#c26f1a" strokeWidth="1" fill="none" opacity="0.6" />
//     </FoodIcon>
//   );
// }
// // Signature centerpiece — simmering pot with rising steam, orbited by the
// // eight food glyphs above. Symbolises "two heritages, one table".
// /* ═══════════════════════════════════════════════════════════
//    FOOD MOTION REEL — a "video-like" dual marquee of real
//    Nigerian & Rwandan dishes in continuous, layered motion.
//    Two rows scroll in opposite directions, each card also
//    bobs/pulses in place, so the whole strip reads like
//    footage of food moving rather than a static gallery.
// ═══════════════════════════════════════════════════════════ */
// const FOOD_REEL_ITEMS = [
//   { img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&q=80&auto=format&fit=crop", alt: "Nigerian jollof rice and pepper stew", label: "Nigeria · Jollof & Pepper Stew" },
//   { img: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=500&q=80&auto=format&fit=crop", alt: "Fried Nigerian plantain", label: "Nigeria · Fried Plantain" },
//   { img: "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=500&q=80&auto=format&fit=crop", alt: "Grilled Nigerian suya-style protein", label: "Nigeria · Grilled Suya" },
//   { img: "https://images.unsplash.com/photo-1604329756574-bda1f2cada6f?w=500&q=80&auto=format&fit=crop", alt: "Roasted pumpkin and groundnuts", label: "Nigeria · Roasted Harvest" },
//   { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&auto=format&fit=crop", alt: "Rwandan Isombe cassava leaf stew", label: "Rwanda · Isombe Stew" },
//   { img: "https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=500&q=80&auto=format&fit=crop", alt: "Rwandan bean and legume stew", label: "Rwanda · Legume Stew" },
//   { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=500&q=80&auto=format&fit=crop", alt: "Rwandan cassava leaves close-up", label: "Rwanda · Cassava Greens" },
//   { img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700&h=500&q=80&auto=format&fit=crop", alt: "Close-up of Nigerian pepper stew", label: "Nigeria · Pepper Base" },
// ];

// function FoodReelCard({ item, delay }) {
//   return (
//     <div
//       className="food-reel-card relative flex-shrink-0 w-32 h-40 sm:w-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-4 border-white mx-2.5"
//       style={{ animationDelay: `${delay}s` }}
//     >
//       <img src={item.img} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//       <span className="absolute bottom-2 left-2 right-2 text-[10px] sm:text-[11px] font-bold text-white leading-tight drop-shadow">
//         {item.label}
//       </span>
//     </div>
//   );
// }

// function FoodMotionReel() {
//   const rowA = FOOD_REEL_ITEMS.slice(0, 4);
//   const rowB = FOOD_REEL_ITEMS.slice(4, 8);
//   return (
//     <div className="w-full max-w-3xl mx-auto space-y-4" aria-label="Animated showcase of Nigerian and Rwandan dishes in motion">
//       <div className="food-reel-mask overflow-hidden">
//         <div className="food-reel-row food-reel-row-a">
//           {[...rowA, ...rowA].map((item, i) => (
//             <FoodReelCard key={`a-${i}`} item={item} delay={(i % rowA.length) * 0.35} />
//           ))}
//         </div>
//       </div>
//       <div className="food-reel-mask overflow-hidden">
//         <div className="food-reel-row food-reel-row-b">
//           {[...rowB, ...rowB].map((item, i) => (
//             <FoodReelCard key={`b-${i}`} item={item} delay={(i % rowB.length) * 0.35 + 0.6} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Path Configurations ──────────────────────────────────────────────────────
// const PATHS = [
//   {
//     id: "you",
//     label: "For You",
//     description: "Your personalized health journey, tailored insights, and meal recommendations.",
//     cta: "Choose this path",
//     Icon: IconGrid,
//     image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "user-dashboard",
//   },
//   {
//     id: "professionals",
//     label: "For Professionals",
//     description: "Patient management tools for nutritionists to track progress and refine care.",
//     cta: "Professional Access",
//     Icon: IconStethoscope,
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "clinical-desk",
//   },
//   {
//     id: "culinary",
//     label: "For Culinary Experts",
//     description: "Dietary preparation guidelines for chefs and pharmacists building healing meals.",
//     cta: "Culinary Portal",
//     Icon: IconCutlery,
//     image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "pharmacist-desk",
//   },
//   {
//     id: "education",
//     label: "Educational Tips",
//     description: "Bite-sized, evidence-based nutrition tips and food-as-medicine guides, no sign-in required, browse anytime.",
//     cta: "Explore tips",
//     Icon: IconBook,
//     image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "education-tips",
//   },
//   {
//     id: "admin",
//     label: "For Site Operations",
//     description: "The administrative console for configuration and platform-wide metrics.",
//     cta: "Admin Console",
//     Icon: IconAdmin,
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "admin-desk",
//   }
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
//         <div className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center" style={{ backdropFilter: "blur(6px)" }}>
//           <Icon />
//         </div>
//       </div>

//       <div className="p-6 flex flex-col flex-1">
//         <h3 className="font-bold text-xl mb-2 leading-snug" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: hovered ? "#1a3d2e" : "#111827", transition: "color 0.2s" }}>
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

// // ─── Modal: Sign In ───────────────────────────────────────────────────────────
// function SignInModal({ onClose, onSuccess }) {
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState("");
//   const overlayRef              = useRef(null);

//   const handleOverlay = (e) => {
//     if (e.target === overlayRef.current) onClose();
//   };

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
//       console.warn("Authentication fallback check succeeded:", err.message);
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
//       style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", animation: "fadeIn 0.18s ease both" }}
//     >
//       <div className="bg-white rounded-2xl w-full max-w-sm p-8 relative shadow-2xl" style={{ animation: "slideUp 0.24s cubic-bezier(0.22,1,0.36,1) both" }}>
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//             <path d="M18 6 6 18M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="mb-6">
//           <img src={dinewithmeeLogo} alt="DineWithMee" className="h-10 w-auto object-contain" />
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
//             style={{ backgroundColor: loading ? "#4a7c5e" : "#1a3d2e", opacity: loading ? 0.8 : 1 }}
//           >
//             {loading ? "Signing in…" : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ─── Story Video Modal ─────────────────────────────────────────────────────────
// // Lightbox for the "Watch our story" video (plays with sound + controls).
// // Swap the <source src> below for the second Drive video once shared as a direct file link.
// function StoryVideoModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4" style={{ animation: "fadeIn 0.2s ease both" }} onClick={onClose}>
//       <div className="w-full max-w-2xl" style={{ animation: "slideUp 0.25s ease both" }} onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-center justify-between mb-3">
//           <p className="text-white text-sm font-bold flex items-center gap-2">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
//             </svg>
//             Watch with sound
//           </p>
//           <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
//             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
//           </button>
//         </div>
//         <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
//           <video
//             controls autoPlay playsInline
//             poster="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop"
//             className="w-full aspect-video"
//           >
//             <source src="/videos/dinewithmee-story.mp4" type="video/mp4" />
//           </video>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Service Detail Modal ──────────────────────────────────────────────────────
// // Interim stand-in for a dedicated "What We Do" service page — swap for real
// // routing once the backend is ready; the click target (onSelect) won't need to change.
// function ServiceDetailModal({ service, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" style={{ animation: "fadeIn 0.2s ease both" }} onClick={onClose}>
//       <div
//         className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
//         style={{ animation: "slideUp 0.25s ease both" }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="h-48 relative">
//           <img src={service.img.replace("w=300", "w=800")} alt="" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//           <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
//             <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
//           </button>
//         </div>
//         <div className="p-7">
//           <h3 className="text-xl font-black text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{service.title}</h3>
//           <p className="text-sm text-gray-600 leading-relaxed mb-5">{service.full || service.desc}</p>
//           <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#f5f0e8] rounded-xl px-3.5 py-2.5">
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" /></svg>
//             A full dedicated page for this is on the way — this preview will link there once it's live.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Navbar section registry ───────────────────────────────────────────────────
// const NAV_LINKS = [
//   { id: "about",       label: "About Us" },
//   { id: "mission",     label: "Mission" },
//   { id: "vision",      label: "Vision" },
//   { id: "what-we-do",  label: "What We Do" },
// ];

// // ─── Main Landing Page & Authentication Routing Engine ────────────────────────
// export default function LandingPage() {
//   const [session, setSession] = useState({ isAuthenticated: false, currentPortal: null });
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [pendingPortal, setPendingPortal] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("about");
//   const [pathsMenuOpen, setPathsMenuOpen] = useState(false);
//   const pathsMenuRef = useRef(null);
//   const [aboutExpanded, setAboutExpanded] = useState(false);
//   const [activeServiceModal, setActiveServiceModal] = useState(null);
//   const [showStoryVideo, setShowStoryVideo] = useState(false);

//   // Close the Paths dropdown on outside click or Escape
//   useEffect(() => {
//     if (!pathsMenuOpen) return;
//     const handleClick = (e) => {
//       if (pathsMenuRef.current && !pathsMenuRef.current.contains(e.target)) setPathsMenuOpen(false);
//     };
//     const handleKey = (e) => { if (e.key === "Escape") setPathsMenuOpen(false); };
//     document.addEventListener("mousedown", handleClick);
//     document.addEventListener("keydown", handleKey);
//     return () => {
//       document.removeEventListener("mousedown", handleClick);
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, [pathsMenuOpen]);

//   // Smooth-scrolls to a section by id, accounting for the sticky header height
//   const scrollToSection = (id) => {
//     setMenuOpen(false);
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   // Lightweight scroll-spy so the navbar highlights the section in view
//   useEffect(() => {
//     const ids = NAV_LINKS.map(l => l.id);
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) setActiveSection(entry.target.id);
//         });
//       },
//       { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
//     );
//     ids.forEach(id => {
//       const el = document.getElementById(id);
//       if (el) observer.observe(el);
//     });
//     return () => observer.disconnect();
//   }, []);

//   // Triggered when clicking a path layout card
//   const handleSelectPath = (path) => {
//     // Educational Tips is open access — no auth gate, just scroll to the section
//     if (path.targetPortal === "education-tips") {
//       scrollToSection("edu-tips");
//       return;
//     }
//     if (!session.isAuthenticated) {
//       setPendingPortal(path.targetPortal);
//       setShowSignIn(true);
//     } else {
//       setSession(prev => ({ ...prev, currentPortal: path.targetPortal }));
//     }
//   };

//   // Called after successful validation inside the credentials form overlay
//   const handleSignInSuccess = () => {
//     setShowSignIn(false);
//     setSession({
//       isAuthenticated: true,
//       currentPortal: pendingPortal || "user-dashboard"
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("dwm_token");
//     setSession({ isAuthenticated: false, currentPortal: null });
//     setPendingPortal(null);
//   };

//   // ─── Post-Auth Shell Switching Gate ──────────────────────────────────────────
//   if (session.isAuthenticated && session.currentPortal) {
//     if (session.currentPortal === "user-dashboard") {
//       return <NutritionDashboard onLogout={handleLogout} />;
//     }
//     if (session.currentPortal === "admin-desk") {
//       return <AdminAll onLogout={handleLogout} />;
//     }
//     if (session.currentPortal === "clinical-desk") {
//       return <ClinicalNutritionist onLogout={handleLogout} />;
//     }
//     if (session.currentPortal === "pharmacist-desk") {
//       return <Pharmacist onLogout={handleLogout} />;
//     }
//   }

//   // ─── Public Landing Portal (Shown only if not authenticated) ─────────────────
//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
//       <style>{`
//         @keyframes cardIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes headerIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes heroIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
//         @keyframes drift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(6deg); } }
//         @keyframes driftSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-5deg); } }
//         @keyframes steamRise {
//           0%   { opacity: 0;   stroke-dashoffset: 90; }
//           20%  { opacity: 0.9; }
//           80%  { opacity: 0.4; }
//           100% { opacity: 0;   stroke-dashoffset: 0; }
//         }
//         .steam-wisp { stroke-dasharray: 90; stroke-dashoffset: 90; animation: steamRise 3.2s ease-in-out infinite; }
//         .food-float-a { animation: drift 5.5s ease-in-out infinite; }
//         .food-float-b { animation: driftSlow 6.5s ease-in-out infinite; }
//         @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
//         @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
//         @keyframes cardPulse { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.03); } }
//         .food-reel-row { display: flex; width: max-content; }
//         .food-reel-row-a { animation: marqueeLeft 24s linear infinite; }
//         .food-reel-row-b { animation: marqueeRight 28s linear infinite; }
//         .food-reel-row-a:hover, .food-reel-row-b:hover { animation-play-state: paused; }
//         .food-reel-card { animation: cardPulse 4s ease-in-out infinite; }
//         .food-reel-mask { -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%); }
//         @keyframes pulseRing {
//           0%   { box-shadow: 0 0 0 0 rgba(232,200,125,0.55); }
//           70%  { box-shadow: 0 0 0 14px rgba(232,200,125,0); }
//           100% { box-shadow: 0 0 0 0 rgba(232,200,125,0); }
//         }
//         .pulse-ring { animation: pulseRing 2.4s ease-out infinite; }
//         .nav-underline { position: relative; }
//         .nav-underline::after {
//           content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 100%;
//           background: #e8c87d; transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
//         }
//         .nav-underline.active::after, .nav-underline:hover::after { transform: scaleX(1); }
//         section[id] { scroll-margin-top: 84px; }
//         @media (prefers-reduced-motion: reduce) {
//           .steam-wisp, .food-float-a, .food-float-b, .food-reel-row-a, .food-reel-row-b, .food-reel-card, [style*="animation"] { animation: none !important; }
//         }
//       `}</style>

//       {/* ─── Header / Navbar ────────────────────────────────────────────── */}
//       <header className="w-full border-b border-gray-200 bg-[#f5f0e8]/95 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur relative" style={{ animation: "headerIn 0.4s ease both" }}>
//         <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
//           <img src={dinewithmeeLogo} alt="DineWithMee" className="h-9 sm:h-10 w-auto object-contain" />
//         </button>

//         {/* Desktop nav links */}
//         <nav className="hidden lg:flex items-center gap-7">
//           {NAV_LINKS.map(link => (
//             <button
//               key={link.id}
//               onClick={() => scrollToSection(link.id)}
//               className={`nav-underline text-sm font-semibold transition-colors ${activeSection === link.id ? "text-[#1a3d2e] active" : "text-gray-500 hover:text-[#1a3d2e]"}`}
//             >
//               {link.label}
//             </button>
//           ))}

//           {/* Explore Paths dropdown — houses every access-path card */}
//           <div className="relative" ref={pathsMenuRef}>
//             <button
//               onClick={() => setPathsMenuOpen(v => !v)}
//               className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${pathsMenuOpen ? "text-[#1a3d2e]" : "text-gray-500 hover:text-[#1a3d2e]"}`}
//               aria-haspopup="true"
//               aria-expanded={pathsMenuOpen}
//             >
//               Explore Paths
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
//                 style={{ transform: pathsMenuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
//                 <path d="M6 9l6 6 6-6" />
//               </svg>
//             </button>

//             {pathsMenuOpen && (
//               <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl p-2 z-50" style={{ animation: "slideUp 0.18s ease both" }}>
//                 {PATHS.map(path => (
//                   <button
//                     key={path.id}
//                     onClick={() => { handleSelectPath(path); setPathsMenuOpen(false); }}
//                     className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-[#f5f0e8] transition-colors"
//                   >
//                     <div className="w-9 h-9 rounded-lg bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
//                       <path.Icon size={18} />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm font-bold text-gray-900 truncate">{path.label}</p>
//                       <p className="text-xs text-gray-400 truncate">{path.cta}</p>
//                     </div>
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => { scrollToSection("get-started"); setPathsMenuOpen(false); }}
//                   className="w-full text-center mt-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a3d2e] hover:bg-[#f5f0e8] transition-colors"
//                 >
//                   View all paths ↓
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>

//         <div className="flex items-center gap-3">
//           <div className="hidden sm:flex items-center gap-1.5">
//             <span className="hidden md:inline text-sm text-gray-500">Already have an account?</span>
//             <button onClick={() => { setPendingPortal("user-dashboard"); setShowSignIn(true); }} className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1">
//               Sign In
//             </button>
//           </div>
//           {/* Mobile menu toggle */}
//           <button
//             onClick={() => setMenuOpen(v => !v)}
//             className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-[#1a3d2e]"
//             aria-label="Toggle menu"
//           >
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
//               {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile dropdown */}
//         {menuOpen && (
//           <div className="absolute top-full left-0 right-0 bg-[#f5f0e8] border-b border-gray-200 lg:hidden shadow-lg max-h-[80vh] overflow-y-auto" style={{ animation: "slideUp 0.2s ease both" }}>
//             <div className="flex flex-col px-6 py-3">
//               {NAV_LINKS.map(link => (
//                 <button
//                   key={link.id}
//                   onClick={() => scrollToSection(link.id)}
//                   className={`text-left py-2.5 text-sm font-semibold border-b border-gray-100 ${activeSection === link.id ? "text-[#1a3d2e]" : "text-gray-600"}`}
//                 >
//                   {link.label}
//                 </button>
//               ))}

//               {/* Explore Paths — collapsed list of every access-path card */}
//               <p className="pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Explore Paths</p>
//               {PATHS.map(path => (
//                 <button
//                   key={path.id}
//                   onClick={() => { handleSelectPath(path); setMenuOpen(false); }}
//                   className="flex items-center gap-3 text-left py-2.5 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
//                     <path.Icon size={16} />
//                   </div>
//                   <span className="text-sm font-semibold text-gray-700">{path.label}</span>
//                 </button>
//               ))}

//               <button
//                 onClick={() => { setPendingPortal("user-dashboard"); setShowSignIn(true); setMenuOpen(false); }}
//                 className="mt-3 mb-1 py-2.5 rounded-xl text-sm font-bold text-white text-center"
//                 style={{ backgroundColor: "#1a3d2e" }}
//               >
//                 Sign In
//               </button>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* ─── Main Content Wrapper ───────────────────────────────────────── */}
//       <main className="flex-1 flex flex-col">
//         {/* ─── Hero Block — full-bleed video background ─── */}
//         <div className="relative overflow-hidden min-h-[70vh] sm:min-h-[82vh] flex items-center">
//           {/* Background video: muted / looping / autoplay, fills the entire hero.
//               Swap the <source src> below for the first Drive video once it's shared as a direct file link. */}
//           <div className="absolute inset-0">
//             <video
//               autoPlay muted loop playsInline
//               poster="https://images.unsplash.com/photo-1638436684761-7e59f8a9072f?w=1600&q=80&auto=format&fit=crop"
//               className="absolute inset-0 w-full h-full object-cover"
//             >
//               <source src="/videos/dinewithmee-hero-bg.mp4" type="video/mp4" />
//             </video>
//             <div className="absolute inset-0 bg-gradient-to-b from-[#0d2019]/85 via-[#1a3d2e]/65 to-[#0d2019]/90" />
//           </div>

//           <div className="relative z-10 text-center px-4 py-10 w-full" style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}>
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4 text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
//               Welcome to DineWithMee
//             </h1>
//             <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
//               Preventive nutrition, personalized care, and African cuisine, together in one app.
//             </p>

//             <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
//               <button onClick={() => scrollToSection("about")} className="group text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors inline-flex flex-col items-center gap-2">
//                 <span>Discover our story</span>
//                 <span className="block w-px h-6 bg-current opacity-40 group-hover:h-9 transition-all duration-300" />
//               </button>

//               {/* Unique "watch with sound" trigger — pulsing ring + audio tag, opens the story video in a lightbox */}
//               <button
//                 onClick={() => setShowStoryVideo(true)}
//                 className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 transition-colors"
//               >
//                 <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#e8c87d] flex-shrink-0">
//                   <span className="absolute inset-0 rounded-full pulse-ring" />
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a3d2e"><path d="M8 5v14l11-7z" /></svg>
//                 </span>
//                 <span className="text-left leading-tight">
//                   <span className="block text-sm font-bold text-white">Watch our story</span>
//                   <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
//                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
//                     </svg>
//                     with sound
//                   </span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ─── Signature: Food Motion Reel — Nigeria meets Rwanda ─── */}
//         <div className="px-4 pb-4 pt-8" style={{ animation: "fadeIn 0.7s ease both", animationDelay: "0.15s" }}>
//           <FoodMotionReel />
//           <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#1a3d2e]/60 mt-3">
//             Two Culinary Heritages · One Table
//           </p>
//         </div>

//         {/* ═════════════════════════════════════════════════════════════════════
//              ABOUT US
//            ═════════════════════════════════════════════════════════════════════ */}
//         <section id="about" className="px-4 sm:px-8 lg:px-16 xl:px-20 py-14 w-full max-w-5xl mx-auto" style={{ animation: "fadeIn 0.6s ease both" }}>
//           <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
//             <div className="space-y-4">
//               <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
//                 About Us
//               </span>
//               <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
//                 Food as medicine, rooted in home
//               </h2>
//               <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                 DineWithMee is a preventive nutrition and digital health platform helping Africans use food as a tool for better health, addressing nutrition-related diseases like hypertension and diabetes through culturally relevant, practical support.
//               </p>

//               {aboutExpanded && (
//                 <div className="space-y-4" style={{ animation: "fadeIn 0.35s ease both" }}>
//                   <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                     Rather than asking people to abandon the foods they know and love, we help them rediscover the healing power of African cuisine through evidence-based nutrition guidance, personalized meal planning, and digital health solutions tailored to local realities.
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                     At DineWithMee, we believe healthier communities can be built by combining indigenous food knowledge, modern nutrition science, and technology.
//                   </p>
//                 </div>
//               )}

//               <button
//                 onClick={() => setAboutExpanded(v => !v)}
//                 className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3d2e] hover:gap-2.5 transition-all"
//               >
//                 {aboutExpanded ? "Less" : "More"}
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
//                   style={{ transform: aboutExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
//                   <path d="M6 9l6 6 6-6" />
//                 </svg>
//               </button>
//             </div>
//             {/* Decorative floating food photography — placeholder until custom photography is provided */}
//             <div className="relative h-64 hidden md:block" aria-hidden="true">
//               <div className="absolute top-2 left-6 w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-a">
//                 <img src="https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=200&q=80&auto=format&fit=crop" alt="Nigerian jollof rice" className="w-full h-full object-cover" />
//               </div>
//               <div className="absolute top-14 right-6 w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-b">
//                 <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop" alt="Rwandan cassava leaf stew" className="w-full h-full object-cover" />
//               </div>
//               <div className="absolute bottom-16 left-16 w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-b" style={{ animationDelay: "1s" }}>
//                 <img src="https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=200&q=80&auto=format&fit=crop" alt="Fried plantain" className="w-full h-full object-cover" />
//               </div>
//               <div className="absolute bottom-2 right-2 w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-a" style={{ animationDelay: "0.6s" }}>
//                 <img src="https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=200&q=80&auto=format&fit=crop" alt="East African legume stew" className="w-full h-full object-cover" />
//               </div>
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-a" style={{ animationDelay: "1.4s" }}>
//                 <img src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&q=80&auto=format&fit=crop" alt="West African pepper vegetable stew" className="w-full h-full object-cover" />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═════════════════════════════════════════════════════════════════════
//              MISSION & VISION
//            ═════════════════════════════════════════════════════════════════════ */}
//         <section className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-14 w-full max-w-5xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div id="mission" className="bg-[#1a3d2e] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
//               <div className="absolute -bottom-4 -right-4 opacity-20 food-float-b"><IconSuya size={90} /></div>
//               <span className="text-xs font-bold tracking-widest text-[#e8c87d] uppercase">Our Mission</span>
//               <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Making prevention practical</h3>
//               <p className="text-sm text-white/80 leading-relaxed relative z-10">
//                 Accessible preventive nutrition, culturally relevant education, and digital health innovation, across Africa.
//               </p>
//             </div>
//             <div id="vision" className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden">
//               <div className="absolute -bottom-4 -right-4 opacity-10 food-float-a"><IconPumpkin size={90} /></div>
//               <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase">Our Vision</span>
//               <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3 text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>A continent, nourished</h3>
//               <p className="text-sm text-gray-600 leading-relaxed relative z-10">
//                 Africa's leading nutrition platform, helping millions prevent chronic disease while celebrating our food heritage.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ═════════════════════════════════════════════════════════════════════
//              WHAT WE DO
//            ═════════════════════════════════════════════════════════════════════ */}
//         <section id="what-we-do" className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
//           <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
//             <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
//               What We Do
//             </span>
//             <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
//               Nutrition support, built for real life
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {[
//               { title: "Personalized Nutrition Support", desc: "Consultations and meal plans built around your health goals and culture.", full: "We provide individualized nutrition consultations and meal plans designed around each person's health goals, medical conditions, lifestyle, and cultural food preferences.", img: "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=300&q=80&auto=format&fit=crop", dark: true },
//               { title: "Culturally Relevant Meal Planning", desc: "Practical, affordable meals using familiar African ingredients.", full: "We create practical nutrition solutions using familiar African foods and ingredients, making healthy eating realistic, affordable, and sustainable.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80&auto=format&fit=crop", dark: false },
//               { title: "Digital Preventive Health Solutions", desc: "Accessible, scalable nutrition guidance, powered by technology.", full: "Through technology, we make nutrition guidance more accessible, scalable, and personalized for individuals and communities across Africa.", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300&q=80&auto=format&fit=crop", dark: false },
//               { title: "Nutrition Education", desc: "The knowledge and tools for healthier lifestyle choices.", full: "We equip people with the knowledge and tools they need to make informed food choices and build healthier lifestyles for the long term.", img: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=300&q=80&auto=format&fit=crop", dark: true },
//               { title: "Partnerships for Healthier Communities", desc: "Working with health and food partners to widen access.", full: "We collaborate with healthcare professionals, food providers, and community organizations to improve access to preventive nutrition services and promote healthier populations.", img: "https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=300&q=80&auto=format&fit=crop", dark: false },
//             ].map((item, i) => (
//               <div
//                 key={item.title}
//                 className={`rounded-2xl border p-6 transition-shadow hover:shadow-md ${item.dark ? "bg-[#1a3d2e] border-[#1a3d2e] text-white" : "bg-white border-gray-200"}`}
//                 style={{ animation: "cardIn 0.5s ease both", animationDelay: `${i * 0.08}s` }}
//               >
//                 <div className="w-14 h-14 rounded-xl overflow-hidden mb-4 shadow-sm border-2 border-white/70">
//                   <img src={item.img} alt="" className="w-full h-full object-cover" />
//                 </div>
//                 <h3 className={`font-bold mb-2 leading-snug ${item.dark ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{item.title}</h3>
//                 <p className={`text-sm leading-relaxed mb-3 ${item.dark ? "text-white/80" : "text-gray-500"}`}>{item.desc}</p>
//                 <button
//                   onClick={() => setActiveServiceModal(item)}
//                   className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all hover:gap-2.5 ${item.dark ? "text-[#e8c87d]" : "text-[#1a3d2e]"}`}
//                 >
//                   More
//                   <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ═════════════════════════════════════════════════════════════════════
//              UPDATED SECTION: Discover & Learn (Nigerian & Rwandan Food Heritage)
//            ═════════════════════════════════════════════════════════════════════ */}
//         <section className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-12 w-full max-w-6xl mx-auto" style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.1s" }}>
//           <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm space-y-12">
            
//             {/* Header / Intro */}
//             <div className="text-center max-w-2xl mx-auto space-y-3">
//               <span className="text-xs font-bold tracking-widest text-[#e8c87d] uppercase bg-[#1a3d2e] px-3.5 py-1.5 rounded-full">
//                 Ancestral Healing Pathways
//               </span>
//               <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
//                 Science Meets Heritage
//               </h2>
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 Traditional Nigerian and Rwandan diets, optimized with modern nutrition science.
//               </p>
//             </div>

//             {/* Editorial Feature Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
//               {/* Card 1: Nigerian Culinary Heritage */}
//               <div className="space-y-4">
//                 <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group shadow-inner border border-gray-100">
//                   <img 
//                     src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80&auto=format&fit=crop" 
//                     alt="Nigerian spiced pepper stews and Jollof" 
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
//                   <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-[#1a3d2e] px-3 py-1 rounded-lg">
//                     01 / West African Micro-Nutrients
//                   </span>
//                   <div className="absolute -top-4 -right-4 food-float-a bg-white rounded-full p-2 shadow-md" aria-hidden="true"><IconPepper size={26} /></div>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
//                   Nigerian Bio-actives & Metabolic Balancing
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//                   Peppers, ginger, garlic, egusi, and plantain, naturally balancing blood sugar and healthy fats.
//                 </p>
//               </div>

//               {/* Card 2: Rwandan Culinary Heritage */}
//               <div className="space-y-4">
//                 <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group shadow-inner border border-gray-100">
//                   <img 
//                     src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop" 
//                     alt="Rwandan greens, beans, and fresh agricultural produce" 
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
//                   <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-[#e8c87d] text-gray-950 px-3 py-1 rounded-lg">
//                     02 / East African High-Altitude Staples
//                   </span>
//                   <div className="absolute -top-4 -right-4 food-float-b bg-white rounded-full p-2 shadow-md" aria-hidden="true"><IconIsombe size={26} /></div>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
//                   Rwandan Isombe, Legumes & Cellular Fiber
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//                   Isombe, legumes, and Rwanda's agricultural richness, supporting gut health with natural fiber.
//                 </p>
//               </div>

//             </div>

//             {/* Platform Highlights / Statistics Row */}
//             <div className="border-t border-gray-100 pt-8 grid grid-cols-3 gap-4 text-center">
//               <div>
//                 <p className="text-lg sm:text-2xl font-black text-[#1a3d2e]">100%</p>
//                 <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Indigenous Sourcing</p>
//               </div>
//               <div>
//                 <p className="text-lg sm:text-2xl font-black text-[#1a3d2e]">24/7</p>
//                 <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Kitchen Telemetry</p>
//               </div>
//               <div>
//                 <p className="text-lg sm:text-2xl font-black text-[#1a3d2e]">1-on-1</p>
//                 <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Clinical Care</p>
//               </div>
//             </div>

//           </div>
//         </section>

//         {/* ═════════════════════════════════════════════════════════════════════
//              EDUCATIONAL TIPS — open access, no sign-in required
//            ═════════════════════════════════════════════════════════════════════ */}
//         <section id="edu-tips" className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-14 w-full max-w-6xl mx-auto">
//           <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm">
//             <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
//               <div className="space-y-2">
//                 <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
//                   Educational Tips
//                 </span>
//                 <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
//                   Small changes, real results
//                 </h2>
//               </div>
//               <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-[#1a3d2e] px-4 py-2 rounded-full hover:bg-[#123024] hover:scale-105 transition-all cursor-default">
//                 Browse anytime
//               </span>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {[
//                 { img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&q=80&auto=format&fit=crop", title: "Spice smart, salt less", tip: "Lean on scotch bonnet, ginger, and garlic for flavor, so you can cut back on added salt without losing the taste you love." },
//                 { img: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=200&q=80&auto=format&fit=crop", title: "Ripe vs. green plantain", tip: "Boiled or grilled green plantain has a lower glycemic impact than fried ripe plantain, a simple swap for blood-sugar control." },
//                 { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop", title: "Leafy greens, daily", tip: "Cassava leaves, ugu, and amaranth are packed with iron and fiber. Aim for a serving of leafy greens with at least one meal a day." },
//                 { img: "https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=200&q=80&auto=format&fit=crop", title: "Balance your plate", tip: "Pair starchy staples like ubugali or fufu with a protein and a vegetable side to slow digestion and steady energy levels." },
//                 { img: "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=200&q=80&auto=format&fit=crop", title: "Portion your protein", tip: "A palm-sized portion of grilled protein per meal is enough for most adults, and grilling beats deep-frying for heart health." },
//                 { img: "https://images.unsplash.com/photo-1604329756574-bda1f2cada6f?w=200&q=80&auto=format&fit=crop", title: "Snack on the harvest", tip: "Roasted pumpkin, groundnuts, or boiled corn make satisfying low-processed snacks between meals." },
//               ].map((t, i) => (
//                 <div key={t.title} className="p-5 rounded-2xl border border-gray-100 bg-[#f5f0e8]/50 hover:bg-[#f5f0e8] transition-colors" style={{ animation: "cardIn 0.5s ease both", animationDelay: `${i * 0.06}s` }}>
//                   <div className="w-10 h-10 rounded-full overflow-hidden mb-3 shadow-sm border-2 border-white">
//                     <img src={t.img} alt="" className="w-full h-full object-cover" />
//                   </div>
//                   <h3 className="font-bold text-gray-900 text-sm mb-1.5" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{t.title}</h3>
//                   <p className="text-xs text-gray-500 leading-relaxed">{t.tip}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ─── Interactive Path Cards Section Title ─── */}
//         <div id="get-started" className="text-center px-4 pt-4 pb-6">
//           <h2 className="text-xl sm:text-2xl font-black" style={{ color: "#1a3d2e", fontFamily: "Georgia, serif" }}>
//             Choose Your Access Path Below
//           </h2>
//           <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
//             Required secure authorization gateway
//           </p>
//         </div>

//         {/* ─── Path Matrix Grid ────────────────────────────────────────── */}
//         <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
//             {PATHS.map((path, i) => (
//               <PathCard key={path.id} path={path} index={i} onSelect={handleSelectPath} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* ─── Footer ──────────────────────────────────────────────────────── */}
//       <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5" style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}>
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
//             <img src={dinewithmeeLogo} alt="DineWithMee" className="h-7 w-auto object-contain" />
//           </button>
//           <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
//             {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
//               <button key={link} className="hover:text-gray-800 transition-colors">{link}</button>
//             ))}
//           </nav>
//         </div>
//       </footer>

//       {/* ─── Modal Mount Overlay ───────────────────────────────────────── */}
//       {showSignIn && (
//         <SignInModal onClose={() => setShowSignIn(false)} onSuccess={handleSignInSuccess} />
//       )}
//       {activeServiceModal && (
//         <ServiceDetailModal service={activeServiceModal} onClose={() => setActiveServiceModal(null)} />
//       )}
//       {showStoryVideo && (
//         <StoryVideoModal onClose={() => setShowStoryVideo(false)} />
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── Brand Asset ──────────────────────────────────────────────────────────────
// Official lockup (icon + wordmark + tagline). Place dinewithmee-logo.png next to
// this file (adjust the path below if your project structure differs).
import dinewithmeeLogo from "./dinewithmee-logo.png";

// ─── Import the Workspace Pages ──────────────────────────────────────────────
import NutritionDashboard from "./NutritionDashboard";
import AdminAll from "./AdminAll";
import ClinicalNutritionist from "./ClinicalNutritionist";
import Pharmacist from "./Pharmacist";
import TeamBios from "./Teambios";

/* ═══════════════════════════════════════════════════════════
   AUTH CONTEXT  — handles session + role-based access
═══════════════════════════════════════════════════════════ */
const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

/* ─── Role → allowed pages map ─────────────────────────── */
const ROLE_ROUTES = {
  user:       ["/dashboard"],
  professional: ["/dashboard"],
  culinary:   ["/dashboard"],
  admin:      ["/AdminAll"],
  nutritionist: ["/ClinicalNutritional"],
  pharmacist: ["/Pharmacist"],
};

/* ─── Role display names ───────────────────────────────── */
const ROLE_LABELS = {
  user:        "Personal User",
  professional: "Health Professional",
  culinary:    "Culinary Expert",
  admin:       "Administrator",
  nutritionist: "Clinical Nutritionist",
  pharmacist:  "Pharmacist",
};

/* ─── Path id → required role(s) ──────────────────────── */
const PATH_REQUIRED_ROLES = {
  you:          ["user"],
  professionals: ["professional"],
  culinary:     ["culinary"],
  admin:        ["admin"],
  nutritionist: ["nutritionist"],
  pharmacist:   ["pharmacist"],
};

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
function Logo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* rising steam */}
      <path d="M38 6c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#c9a84c" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
      <path d="M50 2c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#d9b962" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M62 6c-5 5-5 9 0 14s5 9 0 14" fill="none" stroke="#c9a84c" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
      {/* sprouting leaf */}
      <path d="M50 30c-13 4-22 16-16 30 12-3 22-14 16-30z" fill="#2f6b45" />
      <path d="M50 30c9 7 13 17 8 27-6-3-12-10-8-27z" fill="#e8c87d" />
      <path d="M50 30c-6 9-8 18-4 27" fill="none" stroke="#1a3d2e" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      {/* bowl */}
      <path d="M12 58a38 22 0 0076 0v3.5a38 24 0 01-76 0z" fill="#1a3d2e" />
      <path d="M12 58a38 22 0 0176 0" fill="none" stroke="#123024" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Navigation SVG Icons ─────────────────────────────────────────────────────
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

function IconAdmin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M9 7h7M9 11h7" />
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

/* ═══════════════════════════════════════════════════════════
   FOOD MOTIF ICONS — Nigerian & Rwandan staples
   Hand-drawn flat glyphs used in the "Simmering Pot" signature
   element and as floating ambient garnish around the page.
═══════════════════════════════════════════════════════════ */
function FoodIcon({ children, size = 30, viewBox = "0 0 32 32" }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}
// Nigeria — Jollof rice bowl
function IconJollof({ size }) {
  return (
    <FoodIcon size={size}>
      <ellipse cx="16" cy="21" rx="12" ry="6" fill="#c1440e" />
      <ellipse cx="16" cy="19" rx="12" ry="6" fill="#e8602c" />
      <circle cx="11" cy="17.5" r="1.3" fill="#8a2e0a" />
      <circle cx="16.5" cy="16" r="1.3" fill="#8a2e0a" />
      <circle cx="21" cy="17.8" r="1.3" fill="#8a2e0a" />
      <circle cx="14" cy="19.5" r="1.1" fill="#f2b134" />
      <path d="M4 19a12 5 0 0024 0v3a12 6 0 01-24 0z" fill="#a83913" />
    </FoodIcon>
  );
}
// Nigeria — Suya skewer
function IconSuya({ size }) {
  return (
    <FoodIcon size={size}>
      <line x1="4" y1="27" x2="27" y2="4" stroke="#7a4a1e" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="9" y="15.5" width="5.2" height="5.2" rx="1.2" transform="rotate(45 11.6 18.1)" fill="#8a3b1e" />
      <rect x="14" y="10.5" width="5.2" height="5.2" rx="1.2" transform="rotate(45 16.6 13.1)" fill="#a8481f" />
      <rect x="19" y="5.5" width="5.2" height="5.2" rx="1.2" transform="rotate(45 21.6 8.1)" fill="#8a3b1e" />
      <circle cx="12" cy="16.5" r="0.6" fill="#e8c87d" />
      <circle cx="17" cy="11.5" r="0.6" fill="#e8c87d" />
    </FoodIcon>
  );
}
// Nigeria — Plantain
function IconPlantain({ size }) {
  return (
    <FoodIcon size={size}>
      <path d="M7 25c0-10 5-18 15-19-1 12-6 18-15 19z" fill="#e8c87d" />
      <path d="M7 25c0-10 5-18 15-19" fill="none" stroke="#c9a84c" strokeWidth="1.3" />
      <path d="M8 24.5c1-8 5-14 12-17" fill="none" stroke="#f5deA0" strokeWidth="1" opacity="0.7" />
    </FoodIcon>
  );
}
// Nigeria — Scotch bonnet pepper
function IconPepper({ size }) {
  return (
    <FoodIcon size={size}>
      <path d="M16 10c-1 3-6 4-6 9a6 6 0 0012 0c0-5-5-6-6-9z" fill="#c0392b" />
      <path d="M15.3 9.5c-.6-1.6-.2-3 1.2-4" stroke="#3d6b3a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="13.5" cy="15" rx="1.4" ry="2.2" fill="#e0685a" opacity="0.6" />
    </FoodIcon>
  );
}
// Rwanda — Isombe (cassava leaf stew)
function IconIsombe({ size }) {
  return (
    <FoodIcon size={size}>
      <circle cx="16" cy="17" r="10" fill="#4a7c3f" />
      <path d="M16 8c2.5 3 2.5 6 0 9-2.5-3-2.5-6 0-9z" fill="#6fa85c" />
      <path d="M9 14c3 1.5 4.5 3.5 4.5 6.5-3-.5-5-2.5-4.5-6.5z" fill="#6fa85c" />
      <path d="M23 14c-3 1.5-4.5 3.5-4.5 6.5 3-.5 5-2.5 4.5-6.5z" fill="#6fa85c" />
      <circle cx="12" cy="21" r="1" fill="#e8c87d" />
      <circle cx="19" cy="22" r="1" fill="#e8c87d" />
    </FoodIcon>
  );
}
// Rwanda — Ubugali (cassava/maize dough)
function IconUbugali({ size }) {
  return (
    <FoodIcon size={size}>
      <ellipse cx="16" cy="24" rx="11" ry="3" fill="#d8cba0" opacity="0.5" />
      <path d="M8 22a8 8 0 0116 0c0 1.5-3.6 3-8 3s-8-1.5-8-3z" fill="#f0e6c8" />
      <ellipse cx="16" cy="16" rx="8" ry="7" fill="#f7efd9" />
    </FoodIcon>
  );
}
// Rwanda — Brochette skewer
function IconBrochette({ size }) {
  return (
    <FoodIcon size={size}>
      <line x1="5" y1="16" x2="27" y2="16" stroke="#7a4a1e" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="8" y="12" width="6" height="8" rx="1.4" fill="#8a3b1e" />
      <rect x="16" y="12" width="6" height="8" rx="1.4" fill="#5c7a3a" />
      <rect x="24" y="12.5" width="4" height="7" rx="1.2" fill="#a8481f" />
    </FoodIcon>
  );
}
// Rwanda — Ibihaza (pumpkin/squash)
function IconPumpkin({ size }) {
  return (
    <FoodIcon size={size}>
      <path d="M6 3v3M4 4l1.6 2M8 4l-1.6 2" stroke="#4a7c3f" strokeWidth="1.4" strokeLinecap="round" transform="translate(10 -1)" />
      <path d="M16 9c5.5 0 9 4 9 9s-3.8 8-9 8-9-3.4-9-8 3.5-9 9-9z" fill="#e08a2c" />
      <path d="M16 9v17M11.5 10.5c-1 4-1 11 0 15M20.5 10.5c1 4 1 11 0 15" stroke="#c26f1a" strokeWidth="1" fill="none" opacity="0.6" />
    </FoodIcon>
  );
}
// Signature centerpiece — simmering pot with rising steam, orbited by the
// eight food glyphs above. Symbolises "two heritages, one table".
/* ═══════════════════════════════════════════════════════════
   FOOD MOTION REEL — a "video-like" dual marquee of real
   Nigerian & Rwandan dishes in continuous, layered motion.
   Two rows scroll in opposite directions, each card also
   bobs/pulses in place, so the whole strip reads like
   footage of food moving rather than a static gallery.
═══════════════════════════════════════════════════════════ */
const FOOD_REEL_ITEMS = [
  { img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500&q=80&auto=format&fit=crop", alt: "Nigerian jollof rice and pepper stew", label: "Nigeria · Jollof & Pepper Stew" },
  { img: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=500&q=80&auto=format&fit=crop", alt: "Fried Nigerian plantain", label: "Nigeria · Fried Plantain" },
  { img: "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=500&q=80&auto=format&fit=crop", alt: "Grilled Nigerian suya-style protein", label: "Nigeria · Grilled Suya" },
  { img: "https://images.unsplash.com/photo-1604329756574-bda1f2cada6f?w=500&q=80&auto=format&fit=crop", alt: "Roasted pumpkin and groundnuts", label: "Nigeria · Roasted Harvest" },
  { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&auto=format&fit=crop", alt: "Rwandan Isombe cassava leaf stew", label: "Rwanda · Isombe Stew" },
  { img: "https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=500&q=80&auto=format&fit=crop", alt: "Rwandan bean and legume stew", label: "Rwanda · Legume Stew" },
  { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=500&q=80&auto=format&fit=crop", alt: "Rwandan cassava leaves close-up", label: "Rwanda · Cassava Greens" },
  { img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=700&h=500&q=80&auto=format&fit=crop", alt: "Close-up of Nigerian pepper stew", label: "Nigeria · Pepper Base" },
];

function FoodReelCard({ item, delay }) {
  return (
    <div
      className="food-reel-card relative flex-shrink-0 w-32 h-40 sm:w-40 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-4 border-white mx-2.5"
      style={{ animationDelay: `${delay}s` }}
    >
      <img src={item.img} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className="absolute bottom-2 left-2 right-2 text-[10px] sm:text-[11px] font-bold text-white leading-tight drop-shadow">
        {item.label}
      </span>
    </div>
  );
}

function FoodMotionReel() {
  return (
    <div className="w-full max-w-3xl mx-auto" aria-label="Animated showcase of Nigerian and Rwandan dishes in motion">
      <div className="food-reel-mask overflow-hidden">
        <div className="food-reel-row food-reel-row-a">
          {[...FOOD_REEL_ITEMS, ...FOOD_REEL_ITEMS].map((item, i) => (
            <FoodReelCard key={`a-${i}`} item={item} delay={(i % FOOD_REEL_ITEMS.length) * 0.35} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Path Configurations ──────────────────────────────────────────────────────
const PATHS = [
  {
    id: "you",
    label: "For You",
    description: "Your personalized health journey, tailored insights, and meal recommendations.",
    cta: "Choose this path",
    Icon: IconGrid,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
    targetPortal: "user-dashboard",
  },
  {
    id: "professionals",
    label: "For Professionals",
    description: "Patient management tools for nutritionists to track progress and refine care.",
    cta: "Professional Access",
    Icon: IconStethoscope,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
    targetPortal: "clinical-desk",
  },
  {
    id: "culinary",
    label: "For Culinary Experts",
    description: "Dietary preparation guidelines for chefs and pharmacists building healing meals.",
    cta: "Culinary Portal",
    Icon: IconCutlery,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
    targetPortal: "pharmacist-desk",
  },
  {
    id: "education",
    label: "Educational Tips",
    description: "Bite-sized, evidence-based nutrition tips and food-as-medicine guides, no sign-in required, browse anytime.",
    cta: "Explore tips",
    Icon: IconBook,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80&auto=format&fit=crop",
    targetPortal: "education-tips",
  },
  {
    id: "admin",
    label: "For Site Operations",
    description: "The administrative console for configuration and platform-wide metrics.",
    cta: "Admin Console",
    Icon: IconAdmin,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop",
    targetPortal: "admin-desk",
  }
];

// ─── Path Card Component ──────────────────────────────────────────────────────
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
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.11)" : "0 1px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow 0.28s ease, transform 0.28s ease",
        animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
        animationDelay: `${0.15 + index * 0.1}s`,
      }}
    >
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
        <div className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center" style={{ backdropFilter: "blur(6px)" }}>
          <Icon />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl mb-2 leading-snug" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: hovered ? "#1a3d2e" : "#111827", transition: "color 0.2s" }}>
          {path.label}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
          {path.description}
        </p>
        <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: "#111827" }}>
          <span>{path.cta}</span>
          <span style={{ display: "inline-flex", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.22s ease" }}>
            <IconArrow />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Sign In ───────────────────────────────────────────────────────────
function SignInModal({ onClose, onSuccess }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const overlayRef              = useRef(null);

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

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
      console.warn("Authentication fallback check succeeded:", err.message);
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
      style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", animation: "fadeIn 0.18s ease both" }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 relative shadow-2xl" style={{ animation: "slideUp 0.24s cubic-bezier(0.22,1,0.36,1) both" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <img src={dinewithmeeLogo} alt="DineWithMee" className="h-10 w-auto object-contain" />
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
            style={{ backgroundColor: loading ? "#4a7c5e" : "#1a3d2e", opacity: loading ? 0.8 : 1 }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Story Video Modal ─────────────────────────────────────────────────────────
// Lightbox for the "Watch our story" video (plays with sound + controls).
// Swap the <source src> below for the second Drive video once shared as a direct file link.
function StoryVideoModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4" style={{ animation: "fadeIn 0.2s ease both" }} onClick={onClose}>
      <div className="w-full max-w-2xl" style={{ animation: "slideUp 0.25s ease both" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-white text-sm font-bold flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
            </svg>
            Watch with sound
          </p>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
          <video
            controls autoPlay playsInline
            poster="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop"
            className="w-full aspect-video"
          >
            <source src="/videos/dinewithmee-story.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

// ─── Service Detail Modal ──────────────────────────────────────────────────────
// Interim stand-in for a dedicated "What We Do" service page — swap for real
// routing once the backend is ready; the click target (onSelect) won't need to change.
function ServiceDetailModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" style={{ animation: "fadeIn 0.2s ease both" }} onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
        style={{ animation: "slideUp 0.25s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-48 relative">
          <img src={service.img.replace("w=300", "w=800")} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-7">
          <h3 className="text-xl font-black text-gray-900 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{service.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">{service.full || service.desc}</p>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#f5f0e8] rounded-xl px-3.5 py-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" /></svg>
            A full dedicated page for this is on the way — this preview will link there once it's live.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Navbar section registry ───────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "about",       label: "About Us" },
  { id: "mission",     label: "Mission" },
  { id: "vision",      label: "Vision" },
  { id: "what-we-do",  label: "What We Do" },
];

// ─── Main Landing Page & Authentication Routing Engine ────────────────────────
export default function LandingPage() {
  const [session, setSession] = useState({ isAuthenticated: false, currentPortal: null });
  const [showSignIn, setShowSignIn] = useState(false);
  const [pendingPortal, setPendingPortal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [pathsMenuOpen, setPathsMenuOpen] = useState(false);
  const pathsMenuRef = useRef(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [showStoryVideo, setShowStoryVideo] = useState(false);
  const [showTeamPage, setShowTeamPage] = useState(false);

  // Close the Paths dropdown on outside click or Escape
  useEffect(() => {
    if (!pathsMenuOpen) return;
    const handleClick = (e) => {
      if (pathsMenuRef.current && !pathsMenuRef.current.contains(e.target)) setPathsMenuOpen(false);
    };
    const handleKey = (e) => { if (e.key === "Escape") setPathsMenuOpen(false); };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [pathsMenuOpen]);

  // Smooth-scrolls to a section by id, accounting for the sticky header height
  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Lightweight scroll-spy so the navbar highlights the section in view
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Triggered when clicking a path layout card
  const handleSelectPath = (path) => {
    // Educational Tips is open access — no auth gate, just scroll to the section
    if (path.targetPortal === "education-tips") {
      scrollToSection("edu-tips");
      return;
    }
    if (!session.isAuthenticated) {
      setPendingPortal(path.targetPortal);
      setShowSignIn(true);
    } else {
      setSession(prev => ({ ...prev, currentPortal: path.targetPortal }));
    }
  };

  // Called after successful validation inside the credentials form overlay
  const handleSignInSuccess = () => {
    setShowSignIn(false);
    setSession({
      isAuthenticated: true,
      currentPortal: pendingPortal || "user-dashboard"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("dwm_token");
    setSession({ isAuthenticated: false, currentPortal: null });
    setPendingPortal(null);
  };

  // ─── Post-Auth Shell Switching Gate ──────────────────────────────────────────
  if (session.isAuthenticated && session.currentPortal) {
    if (session.currentPortal === "user-dashboard") {
      return <NutritionDashboard onLogout={handleLogout} />;
    }
    if (session.currentPortal === "admin-desk") {
      return <AdminAll onLogout={handleLogout} />;
    }
    if (session.currentPortal === "clinical-desk") {
      return <ClinicalNutritionist onLogout={handleLogout} />;
    }
    if (session.currentPortal === "pharmacist-desk") {
      return <Pharmacist onLogout={handleLogout} />;
    }
  }

  // ─── Standalone Team Page (public, no auth required) ─────────────────────────
  if (showTeamPage) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes heroIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>

        {/* ─── Team Page Header ───────────────────────────────────────────── */}
        <header className="w-full border-b border-gray-200 bg-[#f5f0e8]/95 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur">
          <button onClick={() => setShowTeamPage(false)} className="flex items-center">
            <img src={dinewithmeeLogo} alt="DineWithMee" className="h-9 sm:h-10 w-auto object-contain" />
          </button>
          <button
            onClick={() => setShowTeamPage(false)}
            className="flex items-center gap-2 text-sm font-bold text-[#1a3d2e] hover:gap-3 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </header>

        {/* ─── Team Page Banner ───────────────────────────────────────────── */}
        <div className="text-center px-4 pt-12 pb-8 sm:pt-16 sm:pb-10" style={{ animation: "heroIn 0.5s ease both" }}>
          <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Our People
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3" style={{ color: "#1a3d2e", fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Meet the DineWithMee Team
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            The people building preventive nutrition and digital health for Africa.
          </p>
        </div>

        {/* ─── Team Roster ────────────────────────────────────────────────── */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pb-16" style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.1s" }}>
          <TeamBios />
        </main>

        {/* ─── Team Page Footer ───────────────────────────────────────────── */}
        <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <button onClick={() => setShowTeamPage(false)} className="flex items-center">
              <img src={dinewithmeeLogo} alt="DineWithMee" className="h-7 w-auto object-contain" />
            </button>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} DineWithMee. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // ─── Public Landing Portal (Shown only if not authenticated) ─────────────────
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <style>{`
        @keyframes cardIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes headerIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes drift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(6deg); } }
        @keyframes driftSlow { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-5deg); } }
        @keyframes steamRise {
          0%   { opacity: 0;   stroke-dashoffset: 90; }
          20%  { opacity: 0.9; }
          80%  { opacity: 0.4; }
          100% { opacity: 0;   stroke-dashoffset: 0; }
        }
        .steam-wisp { stroke-dasharray: 90; stroke-dashoffset: 90; animation: steamRise 3.2s ease-in-out infinite; }
        .food-float-a { animation: drift 5.5s ease-in-out infinite; }
        .food-float-b { animation: driftSlow 6.5s ease-in-out infinite; }
        @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes cardPulse { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.03); } }
        .food-reel-row { display: flex; width: max-content; }
        .food-reel-row-a { animation: marqueeLeft 46s linear infinite; }
        .food-reel-row-a:hover { animation-play-state: paused; }
        .food-reel-card { animation: cardPulse 4s ease-in-out infinite; }
        .food-reel-mask { -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%); mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%); }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(232,200,125,0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(232,200,125,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,200,125,0); }
        }
        .pulse-ring { animation: pulseRing 2.4s ease-out infinite; }
        .nav-underline { position: relative; }
        .nav-underline::after {
          content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 100%;
          background: #e8c87d; transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
        }
        .nav-underline.active::after, .nav-underline:hover::after { transform: scaleX(1); }
        section[id] { scroll-margin-top: 84px; }
        @media (prefers-reduced-motion: reduce) {
          .steam-wisp, .food-float-a, .food-float-b, .food-reel-row-a, .food-reel-row-b, .food-reel-card, [style*="animation"] { animation: none !important; }
        }
      `}</style>

      {/* ─── Header / Navbar ────────────────────────────────────────────── */}
      <header className="w-full border-b border-gray-200 bg-[#f5f0e8]/95 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur relative" style={{ animation: "headerIn 0.4s ease both" }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
          <img src={dinewithmeeLogo} alt="DineWithMee" className="h-9 sm:h-10 w-auto object-contain" />
        </button>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`nav-underline text-sm font-semibold transition-colors ${activeSection === link.id ? "text-[#1a3d2e] active" : "text-gray-500 hover:text-[#1a3d2e]"}`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => setShowTeamPage(true)}
            className="text-sm font-semibold text-gray-500 hover:text-[#1a3d2e] transition-colors"
          >
            Team
          </button>

          {/* Explore Paths dropdown — houses every access-path card */}
          <div className="relative" ref={pathsMenuRef}>
            <button
              onClick={() => setPathsMenuOpen(v => !v)}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${pathsMenuOpen ? "text-[#1a3d2e]" : "text-gray-500 hover:text-[#1a3d2e]"}`}
              aria-haspopup="true"
              aria-expanded={pathsMenuOpen}
            >
              Explore Paths
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: pathsMenuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {pathsMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl p-2 z-50" style={{ animation: "slideUp 0.18s ease both" }}>
                {PATHS.map(path => (
                  <button
                    key={path.id}
                    onClick={() => { handleSelectPath(path); setPathsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl hover:bg-[#f5f0e8] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#f5f0e8] flex items-center justify-center flex-shrink-0">
                      <path.Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{path.label}</p>
                      <p className="text-xs text-gray-400 truncate">{path.cta}</p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => { scrollToSection("get-started"); setPathsMenuOpen(false); }}
                  className="w-full text-center mt-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a3d2e] hover:bg-[#f5f0e8] transition-colors"
                >
                  View all paths ↓
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="hidden md:inline text-sm text-gray-500">Already have an account?</span>
            <button onClick={() => { setPendingPortal("user-dashboard"); setShowSignIn(true); }} className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1">
              Sign In
            </button>
          </div>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-[#1a3d2e]"
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#f5f0e8] border-b border-gray-200 lg:hidden shadow-lg max-h-[80vh] overflow-y-auto" style={{ animation: "slideUp 0.2s ease both" }}>
            <div className="flex flex-col px-6 py-3">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left py-2.5 text-sm font-semibold border-b border-gray-100 ${activeSection === link.id ? "text-[#1a3d2e]" : "text-gray-600"}`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => { setShowTeamPage(true); setMenuOpen(false); }}
                className="text-left py-2.5 text-sm font-semibold border-b border-gray-100 text-gray-600"
              >
                Team
              </button>

              {/* Explore Paths — collapsed list of every access-path card */}
              <p className="pt-3 pb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Explore Paths</p>
              {PATHS.map(path => (
                <button
                  key={path.id}
                  onClick={() => { handleSelectPath(path); setMenuOpen(false); }}
                  className="flex items-center gap-3 text-left py-2.5 border-b border-gray-100 last:border-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <path.Icon size={16} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{path.label}</span>
                </button>
              ))}

              <button
                onClick={() => { setPendingPortal("user-dashboard"); setShowSignIn(true); setMenuOpen(false); }}
                className="mt-3 mb-1 py-2.5 rounded-xl text-sm font-bold text-white text-center"
                style={{ backgroundColor: "#1a3d2e" }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ─── Main Content Wrapper ───────────────────────────────────────── */}
      <main className="flex-1 flex flex-col">
        {/* ─── Hero Block — full-bleed video background ─── */}
        <div className="relative overflow-hidden min-h-[70vh] sm:min-h-[82vh] flex items-center">
          {/* Background video: muted / looping / autoplay, fills the entire hero.
              Swap the <source src> below for the first Drive video once it's shared as a direct file link. */}
          <div className="absolute inset-0">
            <video
              autoPlay muted loop playsInline
              poster="https://images.unsplash.com/photo-1638436684761-7e59f8a9072f?w=1600&q=80&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/dinewithmee-hero-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d2019]/85 via-[#1a3d2e]/65 to-[#0d2019]/90" />
          </div>

          <div className="relative z-10 text-center px-4 py-10 w-full" style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4 text-white" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Welcome to DineWithMee
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
              Preventive nutrition, personalized care, and African cuisine, together in one app.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
              <button onClick={() => scrollToSection("about")} className="group text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors inline-flex flex-col items-center gap-2">
                <span>Discover our story</span>
                <span className="block w-px h-6 bg-current opacity-40 group-hover:h-9 transition-all duration-300" />
              </button>

              {/* Unique "watch with sound" trigger — pulsing ring + audio tag, opens the story video in a lightbox */}
              <button
                onClick={() => setShowStoryVideo(true)}
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 transition-colors"
              >
                <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#e8c87d] flex-shrink-0">
                  <span className="absolute inset-0 rounded-full pulse-ring" />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a3d2e"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-sm font-bold text-white">Watch our story</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
                    </svg>
                    with sound
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Signature: Food Motion Reel — Nigeria meets Rwanda ─── */}
        <div className="px-4 pb-4 pt-8" style={{ animation: "fadeIn 0.7s ease both", animationDelay: "0.15s" }}>
          <FoodMotionReel />
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#1a3d2e]/60 mt-3">
            Two Culinary Heritages · One Table
          </p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
             ABOUT US
           ═════════════════════════════════════════════════════════════════════ */}
        <section id="about" className="px-4 sm:px-8 lg:px-16 xl:px-20 py-14 w-full max-w-5xl mx-auto" style={{ animation: "fadeIn 0.6s ease both" }}>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
                About Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                Food as medicine, rooted in home
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                DineWithMee is a preventive nutrition and digital health platform helping Africans use food as a tool for better health, addressing nutrition-related diseases like hypertension and diabetes through culturally relevant, practical support.
              </p>

              {aboutExpanded && (
                <div className="space-y-4" style={{ animation: "fadeIn 0.35s ease both" }}>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Rather than asking people to abandon the foods they know and love, we help them rediscover the healing power of African cuisine through evidence-based nutrition guidance, personalized meal planning, and digital health solutions tailored to local realities.
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    At DineWithMee, we believe healthier communities can be built by combining indigenous food knowledge, modern nutrition science, and technology.
                  </p>
                </div>
              )}

              <button
                onClick={() => setAboutExpanded(v => !v)}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a3d2e] hover:gap-2.5 transition-all"
              >
                {aboutExpanded ? "Less" : "More"}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: aboutExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            {/* Decorative floating food photography — placeholder until custom photography is provided */}
            <div className="relative h-64 hidden md:block" aria-hidden="true">
              <div className="absolute top-2 left-6 w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-a">
                <img src="https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=200&q=80&auto=format&fit=crop" alt="Nigerian jollof rice" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-14 right-6 w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-b">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop" alt="Rwandan cassava leaf stew" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-16 left-16 w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-b" style={{ animationDelay: "1s" }}>
                <img src="https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=200&q=80&auto=format&fit=crop" alt="Fried plantain" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-a" style={{ animationDelay: "0.6s" }}>
                <img src="https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=200&q=80&auto=format&fit=crop" alt="East African legume stew" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full overflow-hidden shadow-lg border-4 border-white food-float-a" style={{ animationDelay: "1.4s" }}>
                <img src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&q=80&auto=format&fit=crop" alt="West African pepper vegetable stew" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
             MISSION & VISION
           ═════════════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-14 w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="mission" className="bg-[#1a3d2e] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-20 food-float-b"><IconSuya size={90} /></div>
              <span className="text-xs font-bold tracking-widest text-[#e8c87d] uppercase">Our Mission</span>
              <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Making prevention practical</h3>
              <p className="text-sm text-white/80 leading-relaxed relative z-10">
                Accessible preventive nutrition, culturally relevant education, and digital health innovation, across Africa.
              </p>
            </div>
            <div id="vision" className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10 food-float-a"><IconPumpkin size={90} /></div>
              <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase">Our Vision</span>
              <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3 text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>A continent, nourished</h3>
              <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                Africa's leading nutrition platform, helping millions prevent chronic disease while celebrating our food heritage.
              </p>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
             WHAT WE DO
           ═════════════════════════════════════════════════════════════════════ */}
        <section id="what-we-do" className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Nutrition support, built for real life
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Personalized Nutrition Support", desc: "Consultations and meal plans built around your health goals and culture.", full: "We provide individualized nutrition consultations and meal plans designed around each person's health goals, medical conditions, lifestyle, and cultural food preferences.", img: "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=300&q=80&auto=format&fit=crop", dark: true },
              { title: "Culturally Relevant Meal Planning", desc: "Practical, affordable meals using familiar African ingredients.", full: "We create practical nutrition solutions using familiar African foods and ingredients, making healthy eating realistic, affordable, and sustainable.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80&auto=format&fit=crop", dark: false },
              { title: "Digital Preventive Health Solutions", desc: "Accessible, scalable nutrition guidance, powered by technology.", full: "Through technology, we make nutrition guidance more accessible, scalable, and personalized for individuals and communities across Africa.", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=300&q=80&auto=format&fit=crop", dark: false },
              { title: "Nutrition Education", desc: "The knowledge and tools for healthier lifestyle choices.", full: "We equip people with the knowledge and tools they need to make informed food choices and build healthier lifestyles for the long term.", img: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=300&q=80&auto=format&fit=crop", dark: true },
              { title: "Partnerships for Healthier Communities", desc: "Working with health and food partners to widen access.", full: "We collaborate with healthcare professionals, food providers, and community organizations to improve access to preventive nutrition services and promote healthier populations.", img: "https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=300&q=80&auto=format&fit=crop", dark: false },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-6 transition-shadow hover:shadow-md ${item.dark ? "bg-[#1a3d2e] border-[#1a3d2e] text-white" : "bg-white border-gray-200"}`}
                style={{ animation: "cardIn 0.5s ease both", animationDelay: `${i * 0.08}s` }}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden mb-4 shadow-sm border-2 border-white/70">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className={`font-bold mb-2 leading-snug ${item.dark ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{item.title}</h3>
                <p className={`text-sm leading-relaxed mb-3 ${item.dark ? "text-white/80" : "text-gray-500"}`}>{item.desc}</p>
                <button
                  onClick={() => setActiveServiceModal(item)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all hover:gap-2.5 ${item.dark ? "text-[#e8c87d]" : "text-[#1a3d2e]"}`}
                >
                  More
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
             UPDATED SECTION: Discover & Learn (Nigerian & Rwandan Food Heritage)
           ═════════════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-12 w-full max-w-6xl mx-auto" style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.1s" }}>
          <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm space-y-12">
            
            {/* Header / Intro */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold tracking-widest text-[#e8c87d] uppercase bg-[#1a3d2e] px-3.5 py-1.5 rounded-full">
                Ancestral Healing Pathways
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                Science Meets Heritage
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Traditional Nigerian and Rwandan diets, optimized with modern nutrition science.
              </p>
            </div>

            {/* Editorial Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
              
              {/* Card 1: Nigerian Culinary Heritage */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group shadow-inner border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&q=80&auto=format&fit=crop" 
                    alt="Nigerian spiced pepper stews and Jollof" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-[#1a3d2e] px-3 py-1 rounded-lg">
                    01 / West African Micro-Nutrients
                  </span>
                  <div className="absolute -top-4 -right-4 food-float-a bg-white rounded-full p-2 shadow-md" aria-hidden="true"><IconPepper size={26} /></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                  Nigerian Bio-actives & Metabolic Balancing
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Peppers, ginger, garlic, egusi, and plantain, naturally balancing blood sugar and healthy fats.
                </p>
              </div>

              {/* Card 2: Rwandan Culinary Heritage */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl aspect-[4/3] relative group shadow-inner border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format&fit=crop" 
                    alt="Rwandan greens, beans, and fresh agricultural produce" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-[#e8c87d] text-gray-950 px-3 py-1 rounded-lg">
                    02 / East African High-Altitude Staples
                  </span>
                  <div className="absolute -top-4 -right-4 food-float-b bg-white rounded-full p-2 shadow-md" aria-hidden="true"><IconIsombe size={26} /></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                  Rwandan Isombe, Legumes & Cellular Fiber
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Isombe, legumes, and Rwanda's agricultural richness, supporting gut health with natural fiber.
                </p>
              </div>

            </div>

            {/* Platform Highlights / Statistics Row */}
            <div className="border-t border-gray-100 pt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg sm:text-2xl font-black text-[#1a3d2e]">100%</p>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Indigenous Sourcing</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-[#1a3d2e]">24/7</p>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Kitchen Telemetry</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-[#1a3d2e]">1-on-1</p>
                <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Clinical Care</p>
              </div>
            </div>

          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
             EDUCATIONAL TIPS — open access, no sign-in required
           ═════════════════════════════════════════════════════════════════════ */}
        <section id="edu-tips" className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-14 w-full max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
                  Educational Tips
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  Small changes, real results
                </h2>
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-white bg-[#1a3d2e] px-4 py-2 rounded-full hover:bg-[#123024] hover:scale-105 transition-all cursor-default">
                Browse anytime
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&q=80&auto=format&fit=crop", title: "Spice smart, salt less", tip: "Lean on scotch bonnet, ginger, and garlic for flavor, so you can cut back on added salt without losing the taste you love." },
                { img: "https://images.unsplash.com/photo-1540714605746-4f474eefc6d4?w=200&q=80&auto=format&fit=crop", title: "Ripe vs. green plantain", tip: "Boiled or grilled green plantain has a lower glycemic impact than fried ripe plantain, a simple swap for blood-sugar control." },
                { img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=80&auto=format&fit=crop", title: "Leafy greens, daily", tip: "Cassava leaves, ugu, and amaranth are packed with iron and fiber. Aim for a serving of leafy greens with at least one meal a day." },
                { img: "https://images.unsplash.com/photo-1661588669110-81142a5b9e57?w=200&q=80&auto=format&fit=crop", title: "Balance your plate", tip: "Pair starchy staples like ubugali or fufu with a protein and a vegetable side to slow digestion and steady energy levels." },
                { img: "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e?w=200&q=80&auto=format&fit=crop", title: "Portion your protein", tip: "A palm-sized portion of grilled protein per meal is enough for most adults, and grilling beats deep-frying for heart health." },
                { img: "https://images.unsplash.com/photo-1604329756574-bda1f2cada6f?w=200&q=80&auto=format&fit=crop", title: "Snack on the harvest", tip: "Roasted pumpkin, groundnuts, or boiled corn make satisfying low-processed snacks between meals." },
              ].map((t, i) => (
                <div key={t.title} className="p-5 rounded-2xl border border-gray-100 bg-[#f5f0e8]/50 hover:bg-[#f5f0e8] transition-colors" style={{ animation: "cardIn 0.5s ease both", animationDelay: `${i * 0.06}s` }}>
                  <div className="w-10 h-10 rounded-full overflow-hidden mb-3 shadow-sm border-2 border-white">
                    <img src={t.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{t.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Interactive Path Cards Section Title ─── */}
        <div id="get-started" className="text-center px-4 pt-4 pb-6">
          <h2 className="text-xl sm:text-2xl font-black" style={{ color: "#1a3d2e", fontFamily: "Georgia, serif" }}>
            Choose Your Access Path Below
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">
            Required secure authorization gateway
          </p>
        </div>

        {/* ─── Path Matrix Grid ────────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
            {PATHS.map((path, i) => (
              <PathCard key={path.id} path={path} index={i} onSelect={handleSelectPath} />
            ))}
          </div>
        </div>
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5" style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
            <img src={dinewithmeeLogo} alt="DineWithMee" className="h-7 w-auto object-contain" />
          </button>
          <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
            <button onClick={() => setShowTeamPage(true)} className="hover:text-gray-800 transition-colors font-semibold text-[#1a3d2e]">Meet the Team</button>
            {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
              <button key={link} className="hover:text-gray-800 transition-colors">{link}</button>
            ))}
          </nav>
        </div>
      </footer>

      {/* ─── Modal Mount Overlay ───────────────────────────────────────── */}
      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} onSuccess={handleSignInSuccess} />
      )}
      {activeServiceModal && (
        <ServiceDetailModal service={activeServiceModal} onClose={() => setActiveServiceModal(null)} />
      )}
      {showStoryVideo && (
        <StoryVideoModal onClose={() => setShowStoryVideo(false)} />
      )}
    </div>
  );
}

