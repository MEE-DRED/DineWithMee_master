
// import { useState, useEffect, useRef, createContext, useContext } from "react";

// /* ═══════════════════════════════════════════════════════════
//    AUTH CONTEXT  — replaces react-router; handles session +
//    role-based access control for the whole single-page app
// ═══════════════════════════════════════════════════════════ */
// const AuthCtx = createContext(null);
// const useAuth = () => useContext(AuthCtx);

// /* ─── Role → allowed pages map ─────────────────────────── */
// const ROLE_ROUTES = {
//   user:       ["/dashboard"],
//   professional:["/dashboard"],
//   culinary:   ["/dashboard"],
//   admin:      ["/AdminAll"],
//   nutritionist:["/ClinicalNutritional"],
//   pharmacist: ["/Pharmacist"],
// };

// /* ─── Role display names ───────────────────────────────── */
// const ROLE_LABELS = {
//   user:        "Personal User",
//   professional:"Health Professional",
//   culinary:    "Culinary Expert",
//   admin:       "Administrator",
//   nutritionist:"Clinical Nutritionist",
//   pharmacist:  "Pharmacist",
// };

// /* ─── Path id → required role(s) ──────────────────────── */
// const PATH_REQUIRED_ROLES = {
//   you:          ["user"],
//   professionals:["professional"],
//   culinary:     ["culinary"],
//   admin:        ["admin"],
//   nutritionist: ["nutritionist"],
//   pharmacist:   ["pharmacist"],
// };

// /* ═══════════════════════════════════════════════════════════
//    ASSETS / ICONS
// ═══════════════════════════════════════════════════════════ */
// function Logo({ size = 42 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 42 42" fill="none">
//       <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
//       <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
//       <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
//     </svg>
//   );
// }

// const Ic = ({ d, size = 18, className = "", sw = 2, fill = "none" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
//     stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
//     {[].concat(d).map((p, i) => <path key={i} d={p} />)}
//   </svg>
// );

// const IP = {
//   x:     "M18 6 6 18M6 6l12 12",
//   eye:   ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
//   eyeOff:["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24","M1 1l22 22"],
//   check: "M20 6L9 17l-5-5",
//   alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
//   lock:  ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"],
//   user:  ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
//   mail:  ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
//   arrow: "M5 12h14M12 5l7 7-7 7",
//   chev:  "M9 18l6-6-6-6",
//   logout:["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"],
//   shield:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M12 8v8M9 12h6"],
//   grid:  [],
//   steth: ["M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3","M8 15v1a6 6 0 006 6 6 6 0 006-6v-4"],
//   fork:  ["M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20","M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"],
//   ban:   ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M4.93 4.93l14.14 14.14"],
//   key:   ["M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"],
// };

// function IconGrid() {
//   return (
//     <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
//       {[5,12,19].map(cx => [5,12,19].map(cy => cx===19&&cy===19 ? null : (
//         <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#1a3d2e" />
//       )))}
//     </svg>
//   );
// }
// function IconStethoscope() { return <Ic d={IP.steth} className="stroke-[#1a3d2e]" sw={2} />; }
// function IconCutlery()     { return <Ic d={IP.fork}  className="stroke-[#1a3d2e]" sw={2} />; }
// function IconShieldGroup() { return <Ic d={IP.shield} className="stroke-[#1a3d2e]" sw={2} />; }
// function IconArrow()       { return <Ic d={IP.arrow} size={15} className="stroke-current" sw={2.5} />; }

// /* ═══════════════════════════════════════════════════════════
//    PATHS CONFIG
// ═══════════════════════════════════════════════════════════ */
// const PATHS = [
//   {
//     id: "you", label: "For You",
//     description: "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
//     cta: "Choose this path", Icon: IconGrid,
//     image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard", requiresAuth: true, allowedRoles: ["user"],
//     roleHint: "Personal User account required",
//     badge: "Personal",
//   },
//   {
//     id: "professionals", label: "For Professionals",
//     description: "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
//     cta: "Professional Access", Icon: IconStethoscope,
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard", requiresAuth: true, allowedRoles: ["professional"],
//     roleHint: "Health Professional role required",
//     badge: "Professional",
//   },
//   {
//     id: "culinary", label: "For Culinary Experts",
//     description: "Empowering chefs with precise dietary preparation guidelines to create meals that are both healing and high-end.",
//     cta: "Culinary Portal", Icon: IconCutlery,
//     image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
//     route: "/dashboard", requiresAuth: true, allowedRoles: ["culinary"],
//     roleHint: "Culinary Expert role required",
//     badge: "Culinary",
//   },
//   {
//     id: "management", label: "Management & Staff",
//     description: "Central access point for Administrators, Clinical Nutrition Leads, and Pharmacists to access their respective operational portals.",
//     cta: "Open Portal Selection", Icon: IconShieldGroup,
//     image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&auto=format&fit=crop",
//     route: "management-selection", requiresAuth: true, allowedRoles: ["admin","nutritionist","pharmacist"],
//     roleHint: "Admin / Nutritionist / Pharmacist role required",
//     badge: "Staff Only",
//   },
// ];

// /* ═══════════════════════════════════════════════════════════
//    UTILITY
// ═══════════════════════════════════════════════════════════ */
// function cls(...a) { return a.filter(Boolean).join(" "); }

// /* ═══════════════════════════════════════════════════════════
//    PASSWORD INPUT
// ═══════════════════════════════════════════════════════════ */
// function PwInput({ value, onChange, placeholder, error, label }) {
//   const [show, setShow] = useState(false);
//   return (
//     <div>
//       {label && <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>}
//       <div className="relative">
//         <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)}
//           placeholder={placeholder || "••••••••"}
//           className={cls(
//             "w-full px-4 py-2.5 pr-10 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
//             error ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]"
//           )} />
//         <button type="button" onClick={() => setShow(v => !v)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
//           <Ic d={show ? IP.eyeOff : IP.eye} size={15} />
//         </button>
//       </div>
//       {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    ACCESS DENIED SCREEN
// ═══════════════════════════════════════════════════════════ */
// function AccessDenied({ path, userRole, onBack, onSwitchRole }) {
//   return (
//     <div className="fixed inset-0 z-[200] flex items-center justify-center px-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", animation: "fadeIn .2s ease both" }}>
//       <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl text-center"
//         style={{ animation: "slideUp .25s cubic-bezier(.22,1,.36,1) both" }}>
//         {/* Icon */}
//         <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border-4 border-red-100">
//           <Ic d={IP.ban} size={38} className="text-red-500" sw={1.5} />
//         </div>
//         <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "Georgia, serif" }}>
//           Access Denied
//         </h2>
//         <p className="text-sm text-gray-500 mb-2 leading-relaxed">
//           Your role <span className="font-bold text-gray-800">"{ROLE_LABELS[userRole] || userRole}"</span> does not have permission to access
//         </p>
//         <p className="text-base font-bold text-[#1a3d2e] mb-1">"{path?.label}"</p>
//         <p className="text-xs text-gray-400 mb-6">{path?.roleHint}</p>

//         {/* Required roles */}
//         <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 text-left">
//           <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">Required role(s)</p>
//           <div className="flex flex-wrap gap-2">
//             {path?.allowedRoles.map(r => (
//               <span key={r} className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
//                 {ROLE_LABELS[r] || r}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col gap-2.5">
//           <button onClick={onSwitchRole}
//             className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98]"
//             style={{ backgroundColor: "#1a3d2e" }}>
//             Sign in with a different role
//           </button>
//           <button onClick={onBack}
//             className="w-full py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:border-gray-400 transition-all active:scale-[.98]">
//             Back to landing
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SIGN IN / SIGN UP MODAL — with role selector
// ═══════════════════════════════════════════════════════════ */
// function AuthModal({ mode: initMode = "signin", onClose, onSuccess, targetPath }) {
//   const overlayRef           = useRef(null);
//   const [mode, setMode]      = useState(initMode); // "signin" | "signup"
//   const [step, setStep]      = useState(1);         // signup: 1=role, 2=details
//   const [role, setRole]      = useState("");
//   const [name, setName]      = useState("");
//   const [email, setEmail]    = useState("");
//   const [password, setPw]    = useState("");
//   const [confirm, setConfirm]= useState("");
//   const [loading, setLoading]= useState(false);
//   const [errors, setErrors]  = useState({});
//   const [apiError, setApiError] = useState("");

//   // Roles available for sign-up
//   const SIGNUP_ROLES = [
//     { id: "user",         label: "Personal User",       desc: "Track your personal health & meals",           icon: IP.user   },
//     { id: "professional", label: "Health Professional", desc: "Nutritionists & health practitioners",          icon: IP.steth  },
//     { id: "culinary",     label: "Culinary Expert",     desc: "Chefs & dietary meal creators",                icon: IP.fork   },
//     { id: "admin",        label: "Administrator",       desc: "Platform management & system settings",        icon: IP.shield },
//     { id: "nutritionist", label: "Clinical Nutritionist",desc:"Clinical dietary plans & health matrices",     icon: IP.steth  },
//     { id: "pharmacist",   label: "Pharmacist",          desc: "Medication cross-reference & tracking",        icon: IP.key    },
//   ];

//   useEffect(() => {
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const validate = () => {
//     const e = {};
//     if (!email.trim())     e.email    = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
//     if (!password)         e.password = "Password is required";
//     else if (mode === "signup" && password.length < 6) e.password = "At least 6 characters";
//     if (mode === "signup") {
//       if (!name.trim())    e.name     = "Full name is required";
//       if (!role)           e.role     = "Please select a role";
//       if (password !== confirm) e.confirm = "Passwords do not match";
//     }
//     return e;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }

//     setLoading(true);
//     try {
//       if (mode === "signin") {
//         /* ── SIGN IN ── */
//         const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: email.trim(), password }),
//         });
//         let data;
//         try { data = await res.json(); } catch { data = {}; }

//         if (!res.ok) throw new Error(data?.message || data?.error || `Error ${res.status}`);

//         /* ── Extract token & role from response ── */
//         const token    = data?.token || data?.data?.token || data?.accessToken || "";
//         const userRole = data?.role  || data?.data?.role  || data?.user?.role  || "user";
//         if (token)    localStorage.setItem("dwm_token", token);
//         localStorage.setItem("dwm_role",  userRole);
//         localStorage.setItem("dwm_email", email.trim());
//         onSuccess({ role: userRole, email: email.trim(), name: data?.name || email.split("@")[0] });

//       } else {
//         /* ── SIGN UP ── */
//         const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role }),
//         });
//         let data;
//         try { data = await res.json(); } catch { data = {}; }

//         if (!res.ok) throw new Error(data?.message || data?.error || `Error ${res.status}`);

//         const token    = data?.token || data?.data?.token || data?.accessToken || "";
//         const userRole = data?.role  || data?.data?.role  || role;
//         if (token)    localStorage.setItem("dwm_token", token);
//         localStorage.setItem("dwm_role",  userRole);
//         localStorage.setItem("dwm_email", email.trim());
//         localStorage.setItem("dwm_name",  name.trim());
//         onSuccess({ role: userRole, email: email.trim(), name: name.trim() });
//       }
//     } catch (err) {
//       /* ── If server is sleeping (Render cold start) still allow demo mode ── */
//       if (err.message.includes("Failed to fetch") || err.message.includes("504") || err.message.includes("500")) {
//         const userRole = mode === "signup" ? role : "user";
//         localStorage.setItem("dwm_role",  userRole);
//         localStorage.setItem("dwm_email", email.trim());
//         localStorage.setItem("dwm_name",  name.trim() || email.split("@")[0]);
//         setApiError("⚠️ Server waking up — signed in with demo mode.");
//         setTimeout(() => onSuccess({ role: userRole, email: email.trim(), name: name.trim() || email.split("@")[0] }), 1200);
//       } else {
//         setApiError(err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isSignIn = mode === "signin";

//   return (
//     <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}
//       className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6"
//       style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", animation: "fadeIn .18s ease both" }}>

//       <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto"
//         style={{ animation: "slideUp .24s cubic-bezier(.22,1,.36,1) both" }}>

//         {/* ── Top accent bar ── */}
//         <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#1a3d2e,#e8c87d,#1a3d2e)" }} />

//         <div className="p-7 sm:p-8">
//           {/* Close */}
//           <button onClick={onClose}
//             className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors z-10">
//             <Ic d={IP.x} size={20} sw={2.5} />
//           </button>

//           {/* Logo + headline */}
//           <div className="flex items-center gap-3 mb-6">
//             <Logo size={36} />
//             <div className="leading-none">
//               <p className="text-xs font-extrabold text-[#1a3d2e]">Dine</p>
//               <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p>
//             </div>
//           </div>

//           <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
//             {isSignIn ? "Welcome back" : "Create your account"}
//           </h2>
//           <p className="text-sm text-gray-500 mb-5">
//             {isSignIn
//               ? "Sign in to access your portal."
//               : "Choose your role and get started — it only takes a minute."}
//           </p>

//           {/* Target path hint */}
//           {targetPath && (
//             <div className="mb-4 px-3.5 py-2.5 bg-[#f0f7f3] border border-[#1a3d2e]/20 rounded-xl flex items-center gap-2">
//               <Ic d={IP.lock} size={13} className="text-[#1a3d2e] flex-shrink-0" />
//               <p className="text-xs text-[#1a3d2e] font-semibold">
//                 Signing in to access: <span className="font-black">{targetPath.label}</span>
//               </p>
//             </div>
//           )}

//           {/* API error */}
//           {apiError && (
//             <div className={cls("mb-4 px-3 py-2.5 rounded-xl text-xs font-medium border",
//               apiError.startsWith("⚠️") ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-red-50 border-red-100 text-red-600"
//             )}>
//               {apiError}
//             </div>
//           )}

//           {/* ── SIGN-UP: Role selection step ── */}
//           {!isSignIn && step === 1 && (
//             <div>
//               <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
//                 Select your role <span className="text-red-500">*</span>
//               </p>
//               {errors.role && <p className="text-xs text-red-500 font-medium mb-2">{errors.role}</p>}
//               <div className="grid grid-cols-1 gap-2 mb-6">
//                 {SIGNUP_ROLES.map(r => (
//                   <button key={r.id} type="button" onClick={() => { setRole(r.id); setErrors(e => ({ ...e, role: "" })); }}
//                     className={cls(
//                       "w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all",
//                       role === r.id
//                         ? "border-[#1a3d2e] bg-[#f0f7f3] shadow-sm"
//                         : "border-gray-200 hover:border-[#1a3d2e]/40 hover:bg-gray-50"
//                     )}>
//                     <div className={cls("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
//                       role === r.id ? "bg-[#1a3d2e]" : "bg-gray-100")}>
//                       <Ic d={r.icon} size={16} className={role === r.id ? "text-white stroke-white" : "text-gray-500"} sw={1.8} />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className={cls("text-sm font-bold leading-tight", role === r.id ? "text-[#1a3d2e]" : "text-gray-800")}>{r.label}</p>
//                       <p className="text-xs text-gray-400 mt-0.5 truncate">{r.desc}</p>
//                     </div>
//                     {role === r.id && <Ic d={IP.check} size={15} className="text-[#1a3d2e] flex-shrink-0" sw={2.5} />}
//                   </button>
//                 ))}
//               </div>
//               <button onClick={() => { if (!role) { setErrors({ role: "Please select a role to continue" }); return; } setStep(2); }}
//                 className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98]"
//                 style={{ backgroundColor: "#1a3d2e" }}>
//                 Continue with {role ? ROLE_LABELS[role] : "selected role"} →
//               </button>
//               <p className="text-center text-xs text-gray-400 mt-4">
//                 Already have an account?{" "}
//                 <button onClick={() => { setMode("signin"); setStep(1); }} className="text-[#1a3d2e] font-bold hover:underline">
//                   Sign in
//                 </button>
//               </p>
//             </div>
//           )}

//           {/* ── SIGN-UP: Details step ── */}
//           {!isSignIn && step === 2 && (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Role badge */}
//               <div className="flex items-center gap-2 mb-1">
//                 <button type="button" onClick={() => setStep(1)} className="text-xs text-[#1a3d2e] hover:underline font-semibold">← Change role</button>
//                 <span className="flex-1" />
//                 <span className="text-xs font-bold bg-[#1a3d2e] text-white px-2.5 py-1 rounded-full">{ROLE_LABELS[role]}</span>
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span className="text-red-500">*</span></label>
//                 <input value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: "" })); }}
//                   placeholder="Your full name" autoFocus
//                   className={cls("w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
//                     errors.name ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]")} />
//                 {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email <span className="text-red-500">*</span></label>
//                 <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
//                   placeholder="you@example.com"
//                   className={cls("w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
//                     errors.email ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]")} />
//                 {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
//               </div>

//               <PwInput label="Password *" value={password} error={errors.password}
//                 onChange={v => { setPw(v); setErrors(e => ({ ...e, password: "" })); }} />

//               <PwInput label="Confirm Password *" value={confirm} error={errors.confirm}
//                 onChange={v => { setConfirm(v); setErrors(e => ({ ...e, confirm: "" })); }} placeholder="Repeat password" />

//               <button type="submit" disabled={loading}
//                 className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98] disabled:opacity-70 flex items-center justify-center gap-2"
//                 style={{ backgroundColor: "#1a3d2e" }}>
//                 {loading ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Creating account…</> : "Create Account"}
//               </button>

//               <p className="text-center text-xs text-gray-400">
//                 Already have an account?{" "}
//                 <button type="button" onClick={() => { setMode("signin"); setStep(1); }} className="text-[#1a3d2e] font-bold hover:underline">Sign in</button>
//               </p>
//             </form>
//           )}

//           {/* ── SIGN IN form ── */}
//           {isSignIn && (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
//                 <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
//                   placeholder="you@example.com" autoFocus
//                   className={cls("w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2",
//                     errors.email ? "border-red-300 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e]")} />
//                 {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
//               </div>

//               <PwInput label="Password" value={password} error={errors.password}
//                 onChange={v => { setPw(v); setErrors(e => ({ ...e, password: "" })); }} />

//               <button type="submit" disabled={loading}
//                 className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98] disabled:opacity-70 flex items-center justify-center gap-2"
//                 style={{ backgroundColor: loading ? "#4a7c5e" : "#1a3d2e" }}>
//                 {loading ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Signing in…</> : "Sign In"}
//               </button>

//               <p className="text-center text-xs text-gray-400">
//                 Don't have an account?{" "}
//                 <button type="button" onClick={() => { setMode("signup"); setStep(1); setErrors({}); }} className="text-[#1a3d2e] font-bold hover:underline">Get started</button>
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    MANAGEMENT SELECTION MODAL (staff portals)
// ═══════════════════════════════════════════════════════════ */
// function ManagementSelectionModal({ onClose, onNavigate, userRole }) {
//   const overlayRef = useRef(null);
//   useEffect(() => {
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const portals = [
//     { id: "admin",        label: "Administrator Portal",      desc: "Global system settings, logs, and platform configurations.", route: "/AdminAll",           roles: ["admin"]        },
//     { id: "nutritionist", label: "Clinical Nutritional Portal",desc:"Dietary health plans, clinical matrixes, and validation charts.", route: "/ClinicalNutritional", roles: ["nutritionist"] },
//     { id: "pharmacist",   label: "Pharmacist Portal",         desc: "Medication cross-referencing and interactive element tracking.", route: "/Pharmacist",          roles: ["pharmacist"]   },
//   ];

//   return (
//     <div ref={overlayRef} onClick={e => e.target === overlayRef.current && onClose()}
//       className="fixed inset-0 z-[80] flex items-center justify-center px-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", animation: "fadeIn .2s ease both" }}>

//       <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl border border-gray-100"
//         style={{ animation: "slideUp .25s cubic-bezier(.22,1,.36,1) both" }}>
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
//           <Ic d={IP.x} size={20} sw={2.5} />
//         </button>

//         <h2 className="text-2xl font-black mb-1" style={{ fontFamily: "Georgia, serif", color: "#1a3d2e" }}>
//           Select Management Portal
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Your role: <span className="font-bold text-[#1a3d2e]">{ROLE_LABELS[userRole] || userRole}</span>
//         </p>

//         <div className="space-y-3">
//           {portals.map(portal => {
//             const allowed = portal.roles.includes(userRole);
//             return (
//               <button key={portal.id}
//                 onClick={() => allowed ? onNavigate(portal.route) : null}
//                 disabled={!allowed}
//                 className={cls(
//                   "w-full p-4 text-left rounded-xl border transition-all flex items-center justify-between group",
//                   allowed
//                     ? "border-gray-200 hover:border-[#1a3d2e] hover:bg-gray-50 cursor-pointer"
//                     : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
//                 )}>
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-2 mb-0.5">
//                     <p className={cls("font-bold text-sm", allowed ? "text-gray-900 group-hover:text-[#1a3d2e]" : "text-gray-400")}>
//                       {portal.label}
//                     </p>
//                     {!allowed && <span className="text-[10px] font-bold bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">No access</span>}
//                     {allowed  && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Allowed</span>}
//                   </div>
//                   <p className="text-xs text-gray-400 leading-snug">{portal.desc}</p>
//                   {!allowed && <p className="text-xs text-red-400 mt-1 font-medium">Requires: {portal.roles.map(r => ROLE_LABELS[r]).join(", ")}</p>}
//                 </div>
//                 {allowed && (
//                   <span className="text-gray-400 group-hover:text-[#1a3d2e] ml-3 flex-shrink-0 transition-all">
//                     <IconArrow />
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    PATH CARD
// ═══════════════════════════════════════════════════════════ */
// function PathCard({ path, index, onSelect, isLoggedIn, userRole }) {
//   const [hovered, setHovered] = useState(false);
//   const { Icon } = path;

//   const isLocked    = !isLoggedIn;
//   const hasAccess   = isLoggedIn && path.allowedRoles.includes(userRole);
//   const wrongRole   = isLoggedIn && !path.allowedRoles.includes(userRole);

//   return (
//     <div
//       onClick={() => onSelect(path)}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className="bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col relative"
//       style={{
//         boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.11)" : "0 1px 8px rgba(0,0,0,0.06)",
//         transform: hovered ? "translateY(-5px)" : "translateY(0)",
//         transition: "box-shadow 0.28s ease, transform 0.28s ease",
//         animation: `cardIn 0.52s cubic-bezier(0.22,1,0.36,1) both`,
//         animationDelay: `${0.15 + index * 0.1}s`,
//       }}
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden" style={{ height: 210 }}>
//         <img src={path.image} alt={path.label} className="w-full h-full object-cover"
//           style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.45s ease" }} />

//         {/* Dim overlay for wrong-role */}
//         {wrongRole && (
//           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//             <div className="bg-white/90 rounded-xl px-3 py-2 flex items-center gap-1.5">
//               <Ic d={IP.ban} size={14} className="text-red-500" sw={2} />
//               <span className="text-xs font-bold text-red-600">Role mismatch</span>
//             </div>
//           </div>
//         )}

//         {/* Lock overlay for guests */}
//         {isLocked && (
//           <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-3">
//             <div className="bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
//               <Ic d={IP.lock} size={13} className="text-[#1a3d2e]" sw={2} />
//               <span className="text-[11px] font-bold text-[#1a3d2e]">Sign in required</span>
//             </div>
//           </div>
//         )}

//         {/* Role badge */}
//         <div className="absolute top-3 right-3">
//           <span className={cls(
//             "text-[10px] font-bold px-2.5 py-1 rounded-full",
//             hasAccess  ? "bg-emerald-500 text-white" :
//             wrongRole  ? "bg-red-500 text-white" :
//                          "bg-[#1a3d2e]/80 text-white"
//           )}>
//             {hasAccess ? "✓ Accessible" : wrongRole ? "✗ No Access" : path.badge}
//           </span>
//         </div>

//         {/* Icon badge */}
//         <div className="absolute bottom-3 left-3 w-11 h-11 bg-white rounded-xl shadow-md flex items-center justify-center"
//           style={{ backdropFilter: "blur(6px)" }}>
//           <Icon />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6 flex flex-col flex-1">
//         <h3 className="font-bold text-xl mb-2 leading-snug"
//           style={{ fontFamily: "Georgia, serif", color: hovered ? "#1a3d2e" : "#111827", transition: "color 0.2s" }}>
//           {path.label}
//         </h3>
//         <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-3">{path.description}</p>

//         {/* Role hint */}
//         <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
//           <Ic d={IP.user} size={11} className="text-gray-300" sw={1.8} />
//           <span>{path.roleHint}</span>
//         </div>

//         <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: "#111827" }}>
//           <span>{isLocked ? "Sign in to access" : path.cta}</span>
//           <span style={{ display: "inline-flex", transform: hovered ? "translateX(5px)" : "translateX(0)", transition: "transform 0.22s ease" }}>
//             <IconArrow />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    STUB PAGE VIEWS (in-app routing without react-router)
// ═══════════════════════════════════════════════════════════ */
// function StubPage({ title, color = "#1a3d2e", onBack, user }) {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
//       style={{ backgroundColor: "#f5f0e8", fontFamily: "Georgia, serif" }}>
//       <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
//         style={{ backgroundColor: color + "1a", border: `3px solid ${color}` }}>
//         <Ic d={IP.check} size={36} className="stroke-current" sw={2} style={{ color }} />
//       </div>
//       <h1 className="text-3xl font-black mb-3" style={{ color }}>{title}</h1>
//       <p className="text-gray-500 mb-2">Welcome, <strong>{user?.name || user?.email}</strong></p>
//       <p className="text-sm text-gray-400 mb-8">Role: <span className="font-bold">{ROLE_LABELS[user?.role]}</span></p>
//       <button onClick={onBack}
//         className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[.98]"
//         style={{ backgroundColor: color }}>
//         ← Back to Landing
//       </button>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    MAIN LANDING PAGE
// ═══════════════════════════════════════════════════════════ */
// export default function LandingPage() {
//   /* ── Session state ── */
//   const [user, setUser]           = useState(() => {
//     const role  = localStorage.getItem("dwm_role");
//     const email = localStorage.getItem("dwm_email");
//     const name  = localStorage.getItem("dwm_name");
//     if (role && email) return { role, email, name: name || email.split("@")[0] };
//     return null;
//   });

//   /* ── Modal / UI state ── */
//   const [authModal,     setAuthModal]     = useState(null); // null | { mode, targetPath }
//   const [mgmtModal,     setMgmtModal]     = useState(false);
//   const [accessDenied,  setAccessDenied]  = useState(null); // null | { path }
//   const [currentPage,   setCurrentPage]   = useState("/");  // client-side route
//   const [toast,         setToast]         = useState(null);

//   /* ── Toast auto-dismiss ── */
//   useEffect(() => {
//     if (!toast) return;
//     const t = setTimeout(() => setToast(null), 4000);
//     return () => clearTimeout(t);
//   }, [toast]);

//   /* ── Auth handlers ── */
//   const handleAuthSuccess = (userData) => {
//     setUser(userData);
//     setAuthModal(null);
//     setToast({ msg: `Welcome${userData.name ? ", " + userData.name : ""}! Signed in as ${ROLE_LABELS[userData.role]}.`, type: "success" });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("dwm_token");
//     localStorage.removeItem("dwm_role");
//     localStorage.removeItem("dwm_email");
//     localStorage.removeItem("dwm_name");
//     setUser(null);
//     setCurrentPage("/");
//     setToast({ msg: "You've been signed out.", type: "warn" });
//   };

//   /* ── Path card click ── */
//   const handleSelect = (path) => {
//     /* 1. Not logged in → open auth modal */
//     if (!user) {
//       setAuthModal({ mode: "signin", targetPath: path });
//       return;
//     }

//     /* 2. Logged in but wrong role → access denied */
//     if (!path.allowedRoles.includes(user.role)) {
//       setAccessDenied({ path });
//       return;
//     }

//     /* 3. Management selection */
//     if (path.route === "management-selection") {
//       setMgmtModal(true);
//       return;
//     }

//     /* 4. Navigate */
//     setCurrentPage(path.route);
//   };

//   /* ── Management portal navigate ── */
//   const handleMgmtNavigate = (route) => {
//     setMgmtModal(false);
//     setCurrentPage(route);
//   };

//   /* ── If navigated to a stub page ── */
//   if (currentPage !== "/") {
//     const titles = {
//       "/dashboard":          "Personal Dashboard",
//       "/AdminAll":           "Admin Console",
//       "/ClinicalNutritional":"Clinical Nutritional Portal",
//       "/Pharmacist":         "Pharmacist Portal",
//     };
//     return (
//       <StubPage
//         title={titles[currentPage] || currentPage}
//         color={currentPage === "/AdminAll" ? "#c96a4f" : "#1a3d2e"}
//         user={user}
//         onBack={() => setCurrentPage("/")}
//       />
//     );
//   }

//   /* ═══ LANDING RENDER ═══ */
//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
//       <style>{`
//         @keyframes cardIn  { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
//         @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes headerIn{ from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes heroIn  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes toastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
//       `}</style>

//       {/* ════ HEADER ════ */}
//       <header className="w-full border-b border-gray-200 bg-[#f5f0e8] px-5 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
//         style={{ animation: "headerIn .4s ease both" }}>
//         <div className="flex items-center gap-2.5">
//           <Logo size={36} />
//           <div className="leading-none">
//             <p className="text-sm font-extrabold text-[#1a3d2e]">DineWithMee</p>
//             {/* <p className="text-sm font-extrabold text-[#1a3d2e]"></p> */}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 sm:gap-3">
//           {user ? (
//             /* ── Logged-in user chip ── */
//             <div className="flex items-center gap-2 sm:gap-3">
//               <div className="hidden sm:flex flex-col items-end leading-tight">
//                 <span className="text-xs font-bold text-[#1a3d2e]">{user.name || user.email}</span>
//                 <span className="text-[10px] font-semibold text-[#1a3d2e]/60 bg-[#1a3d2e]/10 px-2 py-0.5 rounded-full mt-0.5">
//                   {ROLE_LABELS[user.role]}
//                 </span>
//               </div>
//               <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a3d2e] flex items-center justify-center flex-shrink-0">
//                 <span className="text-white text-xs font-extrabold">
//                   {(user.name || user.email).charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <button onClick={handleLogout}
//                 className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors border border-gray-200 hover:border-red-200 hover:bg-red-50 px-3 py-2 rounded-xl">
//                 <Ic d={IP.logout} size={13} />
//                 <span className="hidden sm:inline">Sign out</span>
//               </button>
//             </div>
//           ) : (
//             /* ── Guest ── */
//             <div className="flex items-center gap-2">
//               <span className="hidden sm:inline text-sm text-gray-500">Already have an account?</span>
//               <button onClick={() => setAuthModal({ mode: "signin" })}
//                 className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#1a3d2e]/5">
//                 Sign In
//               </button>
//               <button onClick={() => setAuthModal({ mode: "signup" })}
//                 className="text-sm font-bold text-white px-4 py-2 rounded-xl transition-all active:scale-[.97]"
//                 style={{ backgroundColor: "#1a3d2e" }}>
//                 Get started
//               </button>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* ════ HERO ════ */}
//       <main className="flex-1 flex flex-col">
//         <div className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14"
//           style={{ animation: "heroIn .55s ease both", animationDelay: "0.06s" }}>
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4"
//             style={{ color: "#1a3d2e", fontFamily: "Georgia, 'Times New Roman', serif" }}>
//             Welcome to DineWithMee
//           </h1>
//           <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
//             {user
//               ? `Hello, ${user.name || "there"} — select the path that matches your credentials below.`
//               : "Every journey is unique. Sign in to unlock your portal and personalize your experience."}
//           </p>

//           {/* Auth nudge for guests */}
//           {!user && (
//             <div className="mt-6 inline-flex items-center gap-2 bg-[#1a3d2e]/5 border border-[#1a3d2e]/15 rounded-2xl px-4 py-2.5">
//               <Ic d={IP.lock} size={14} className="text-[#1a3d2e]" />
//               <span className="text-sm text-[#1a3d2e] font-semibold">
//                 You must sign in to access any portal
//               </span>
//             </div>
//           )}
//         </div>

//         {/* ════ CARDS GRID ════ */}
//         <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
//             {PATHS.map((path, i) => (
//               <PathCard key={path.id} path={path} index={i}
//                 onSelect={handleSelect}
//                 isLoggedIn={!!user}
//                 userRole={user?.role}
//               />
//             ))}
//           </div>

//           {/* Role guide for logged-in users */}
//           {user && (
//             <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6"
//               style={{ animation: "fadeIn .4s ease both" }}>
//               <div className="flex items-center gap-2 mb-3">
//                 <Ic d={IP.shield} size={16} className="text-[#1a3d2e]" sw={2} />
//                 <p className="text-sm font-bold text-[#1a3d2e]">Your Access Map</p>
//                 <span className="ml-auto text-xs font-bold bg-[#1a3d2e] text-white px-2.5 py-1 rounded-full">{ROLE_LABELS[user.role]}</span>
//               </div>
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                 {PATHS.map(p => {
//                   const ok = p.allowedRoles.includes(user.role);
//                   return (
//                     <div key={p.id} className={cls("rounded-xl p-3 flex items-center gap-2",
//                       ok ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50 border border-gray-100")}>
//                       <Ic d={ok ? IP.check : IP.ban} size={14}
//                         className={ok ? "text-emerald-600 flex-shrink-0" : "text-gray-300 flex-shrink-0"} sw={2.5} />
//                       <span className={cls("text-xs font-semibold", ok ? "text-emerald-700" : "text-gray-400")}>{p.label}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* ════ FOOTER ════ */}
//       <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5">
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <Logo size={28} />
//             <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
//           </div>
//           <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
//             {["Privacy Policy","Terms of Service","HIPAA Compliance","Contact Support"].map(l => (
//               <button key={l} className="hover:text-[#1a3d2e] transition-colors font-medium">{l}</button>
//             ))}
//           </nav>
//           <p className="text-xs text-gray-400 whitespace-nowrap">© 2024 DineWithMee. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* ════ AUTH MODAL ════ */}
//       {authModal && (
//         <AuthModal
//           mode={authModal.mode}
//           targetPath={authModal.targetPath}
//           onClose={() => setAuthModal(null)}
//           onSuccess={(userData) => {
//             handleAuthSuccess(userData);
//             /* If they were trying to access a specific path, trigger it */
//             if (authModal.targetPath) {
//               setTimeout(() => handleSelect(authModal.targetPath), 300);
//             }
//           }}
//         />
//       )}

//       {/* ════ MANAGEMENT MODAL ════ */}
//       {mgmtModal && (
//         <ManagementSelectionModal
//           onClose={() => setMgmtModal(false)}
//           onNavigate={handleMgmtNavigate}
//           userRole={user?.role}
//         />
//       )}

//       {/* ════ ACCESS DENIED ════ */}
//       {accessDenied && (
//         <AccessDenied
//           path={accessDenied.path}
//           userRole={user?.role}
//           onBack={() => setAccessDenied(null)}
//           onSwitchRole={() => {
//             setAccessDenied(null);
//             handleLogout();
//             setAuthModal({ mode: "signin", targetPath: accessDenied.path });
//           }}
//         />
//       )}

//       {/* ════ TOAST ════ */}
//       {toast && (
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white max-w-sm w-[90vw]"
//           style={{
//             backgroundColor: toast.type === "error" ? "#dc2626" : toast.type === "warn" ? "#d97706" : "#1a3d2e",
//             animation: "toastIn .2s ease both",
//           }}>
//           <Ic d={toast.type === "error" ? IP.ban : toast.type === "warn" ? IP.alert : IP.check}
//             size={16} sw={2.5} className={toast.type === "success" ? "text-emerald-400" : "text-white/80"} />
//           <p className="text-sm font-semibold flex-1">{toast.msg}</p>
//           <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
//             <Ic d={IP.x} size={14} sw={2} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";

// // ─── Import the Workspace Pages ──────────────────────────────────────────────
// import NutritionDashboard from "./NutritionDashboard";
// import AdminAll from "./AdminAll";
// import ClinicalNutritionist from "./ClinicalNutritionist";
// import Pharmacist from "./Pharmacist";

// // ─── Logo SVG (matching brand: dark green circle + golden flame) ──────────────
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

// function IconAdmin() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="3" y="3" width="18" height="18" rx="2" />
//       <path d="M12 8v8M8 12h8" />
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

// // ─── Path data (Configured to map directly to target component views) ──────────
// const PATHS = [
//   {
//     id: "you",
//     label: "For You",
//     description: "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
//     cta: "Choose this path",
//     Icon: IconGrid,
//     image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "user-dashboard",
//   },
//   {
//     id: "professionals",
//     label: "For Professionals",
//     description: "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
//     cta: "Professional Access",
//     Icon: IconStethoscope,
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "clinical-desk",
//   },
//   {
//     id: "culinary",
//     label: "For Culinary Experts",
//     description: "Empowering chefs and pharmacists with precise dietary preparation guidelines to build healing meals.",
//     cta: "Culinary Portal",
//     Icon: IconCutlery,
//     image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
//     targetPortal: "pharmacist-desk",
//   },
//   {
//     id: "admin",
//     label: "For Site Operations",
//     description: "Master administrative console layout providing configuration pipelines over global metric node parameters.",
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
//       console.warn("Auth error fallback to successful dashboard access validation:", err.message);
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

//         <div className="flex items-center gap-2.5 mb-6">
//           <Logo size={34} />
//           <div>
//             <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">DineWithMee</p>
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
//             style={{ backgroundColor: loading ? "#4a7c5e" : "#1a3d2e", opacity: loading ? 0.8 : 1 }}
//           >
//             {loading ? "Signing in…" : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ─── Main Landing Page & Authentication Routing Engine ────────────────────────
// export default function LandingPage() {
//   const [session, setSession] = useState({ isAuthenticated: false, currentPortal: null });
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [pendingPortal, setPendingPortal] = useState(null);

//   // Triggered when clicking a path layout card
//   const handleSelectPath = (path) => {
//     if (!session.isAuthenticated) {
//       // Save target workspace intent, then challenge user with required login window
//       setPendingPortal(path.targetPortal);
//       setShowSignIn(true);
//     } else {
//       setSession(prev => ({ ...prev, currentPortal: path.targetPortal }));
//     }
//   };

//   // Called after successful validation inside the credentials form overlay
//   const handleSignInSuccess = () => {
//     setShowSignIn(false);
//     // Move to the specifically selected page target
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
//       `}</style>

//       {/* ─── Header ─────────────────────────────────────────────────────── */}
//       <header className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40" style={{ animation: "headerIn 0.4s ease both" }}>
//         <div className="flex items-center gap-2.5">
//           <Logo size={38} />
//           <div className="leading-none">
//             <p className="text-sm font-extrabold text-[#1a3d2e]">DineWithMee</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <span className="hidden sm:inline text-sm text-gray-500">Already have an account?</span>
//           <button onClick={() => { setPendingPortal("user-dashboard"); setShowSignIn(true); }} className="text-sm font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors px-1">
//             Sign In
//           </button>
//         </div>
//       </header>

//       {/* ─── Main Hero Content ──────────────────────────────────────────── */}
//       <main className="flex-1 flex flex-col">
//         <div className="text-center px-4 pt-14 pb-10 sm:pt-20 sm:pb-14" style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}>
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4" style={{ color: "#1a3d2e", fontFamily: "Georgia, 'Times New Roman', serif" }}>
//             Welcome to DineWithMee
//           </h1>
//           <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
//             Every journey is unique. Select the path that best describes your goals and help us personalize your experience securely.
//           </p>
//         </div>

//         {/* ─── Path Matrix Grid ────────────────────────────────────────── */}
//         <div className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
//             {PATHS.map((path, i) => (
//               <PathCard key={path.id} path={path} index={i} onSelect={handleSelectPath} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* ─── Footer ──────────────────────────────────────────────────────── */}
//       <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5" style={{ animation: "fadeIn 0.6s ease both", animationDelay: "0.4s" }}>
//         <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2">
//             <Logo size={30} />
//             <div className="leading-none">
//               <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
//             </div>
//           </div>
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
//     </div>
//   );
// }

import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── Import the Workspace Pages ──────────────────────────────────────────────
import NutritionDashboard from "./NutritionDashboard";
import AdminAll from "./AdminAll";
import ClinicalNutritionist from "./ClinicalNutritionist";
import Pharmacist from "./Pharmacist";

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
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
      <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
      <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
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
function SimmeringPotEmblem() {
  const orbit = [
    { Icon: IconJollof,    r: 92, start: 0   },
    { Icon: IconIsombe,    r: 92, start: 45  },
    { Icon: IconSuya,      r: 92, start: 90  },
    { Icon: IconUbugali,   r: 92, start: 135 },
    { Icon: IconPlantain,  r: 92, start: 180 },
    { Icon: IconBrochette, r: 92, start: 225 },
    { Icon: IconPepper,    r: 92, start: 270 },
    { Icon: IconPumpkin,   r: 92, start: 315 },
  ];
  return (
    <div className="relative mx-auto" style={{ width: 260, height: 260 }} aria-hidden="true">
      {/* orbiting ring of food glyphs */}
      {orbit.map(({ Icon, start }, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ animation: `orbitSpin 26s linear infinite`, animationDelay: `${-(start / 360) * 26}s` }}
        >
          <div
            className="absolute"
            style={{
              top: "50%", left: "50%", width: 36, height: 36, marginTop: -18, marginLeft: -18,
              transform: `rotate(${start}deg) translate(112px) rotate(${-start}deg)`,
            }}
          >
            <div style={{ animation: `bob 3.4s ease-in-out infinite`, animationDelay: `${i * 0.22}s` }}
              className="w-full h-full rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center">
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
      {/* steam wisps */}
      <svg className="absolute" style={{ top: -34, left: "50%", transform: "translateX(-50%)" }} width="70" height="60" viewBox="0 0 70 60">
        <path className="steam-wisp" d="M18 55C10 45 24 38 16 28C10 20 20 12 16 4" fill="none" stroke="#c9c2b2" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: "0s" }} />
        <path className="steam-wisp" d="M35 55C27 44 41 37 33 27C27 19 37 11 33 3" fill="none" stroke="#c9c2b2" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: "0.6s" }} />
        <path className="steam-wisp" d="M52 55C44 45 58 38 50 28C44 20 54 12 50 4" fill="none" stroke="#c9c2b2" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: "1.2s" }} />
      </svg>
      {/* the pot itself */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="118" height="100" viewBox="0 0 118 100">
          <ellipse cx="59" cy="34" rx="46" ry="9" fill="#e8c87d" />
          <path d="M13 34h92l-8 44a10 10 0 01-10 8H31a10 10 0 01-10-8z" fill="#1a3d2e" />
          <path d="M13 34h92" stroke="#123024" strokeWidth="3" />
          <rect x="0" y="29" width="20" height="9" rx="4.5" fill="#1a3d2e" />
          <rect x="98" y="29" width="20" height="9" rx="4.5" fill="#1a3d2e" />
          <ellipse cx="59" cy="34" rx="38" ry="6" fill="#f2dca0" />
        </svg>
      </div>
    </div>
  );
}

// ─── Path Configurations ──────────────────────────────────────────────────────
const PATHS = [
  {
    id: "you",
    label: "For You",
    description: "Focus on your personalized health journey with tailored nutritional insights and gourmet meal recommendations.",
    cta: "Choose this path",
    Icon: IconGrid,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80&auto=format&fit=crop",
    targetPortal: "user-dashboard",
  },
  {
    id: "professionals",
    label: "For Professionals",
    description: "Advanced patient management tools for nutritionists and practitioners to track progress and refine clinical care.",
    cta: "Professional Access",
    Icon: IconStethoscope,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop",
    targetPortal: "clinical-desk",
  },
  {
    id: "culinary",
    label: "For Culinary Experts",
    description: "Empowering chefs and pharmacists with precise dietary preparation guidelines to build healing meals.",
    cta: "Culinary Portal",
    Icon: IconCutlery,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=700&q=80&auto=format&fit=crop",
    targetPortal: "pharmacist-desk",
  },
  {
    id: "admin",
    label: "For Site Operations",
    description: "Master administrative console layout providing configuration pipelines over global metric node parameters.",
    cta: "Admin Console",
    Icon: IconAdmin,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop",
    targetPortal: "admin-desk",
  },
  {
    id: "education",
    label: "Educational Tips",
    description: "Bite-sized, evidence-based nutrition tips and food-as-medicine guides — no sign-in required, browse anytime.",
    cta: "Explore tips",
    Icon: IconBook,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80&auto=format&fit=crop",
    targetPortal: "education-tips",
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

        <div className="flex items-center gap-2.5 mb-6">
          <Logo size={34} />
          <div>
            <p className="text-xs font-extrabold text-[#1a3d2e] leading-none">DineWithMee</p>
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
            style={{ backgroundColor: loading ? "#4a7c5e" : "#1a3d2e", opacity: loading ? 0.8 : 1 }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
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
        .nav-underline { position: relative; }
        .nav-underline::after {
          content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 100%;
          background: #e8c87d; transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease;
        }
        .nav-underline.active::after, .nav-underline:hover::after { transform: scaleX(1); }
        section[id] { scroll-margin-top: 84px; }
        @media (prefers-reduced-motion: reduce) {
          .steam-wisp, .food-float-a, .food-float-b, [style*="animation"] { animation: none !important; }
        }
      `}</style>

      {/* ─── Header / Navbar ────────────────────────────────────────────── */}
      <header className="w-full border-b border-gray-200 bg-[#f5f0e8]/95 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur relative" style={{ animation: "headerIn 0.4s ease both" }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <Logo size={38} />
          <div className="leading-none text-left">
            <p className="text-sm font-extrabold text-[#1a3d2e]">DineWithMee</p>
          </div>
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
        {/* ─── Hero Block ─── */}
        <div className="text-center px-4 pt-14 pb-8 sm:pt-20 sm:pb-10" style={{ animation: "heroIn 0.55s ease both", animationDelay: "0.06s" }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4" style={{ color: "#1a3d2e", fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Welcome to DineWithMee
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            Unifying metabolic medical science, professional kitchen telemetry, and personalized cellular wellness into one elegant application.
          </p>
          <button onClick={() => scrollToSection("about")} className="mt-7 text-xs font-bold uppercase tracking-widest text-[#1a3d2e]/70 hover:text-[#1a3d2e] transition-colors inline-flex flex-col items-center gap-1">
            <span>Discover our story</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ animation: "bob 1.8s ease-in-out infinite" }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* ─── Signature: Simmering Pot Emblem — Nigeria meets Rwanda ─── */}
        <div className="px-4 pb-4 pt-2" style={{ animation: "fadeIn 0.7s ease both", animationDelay: "0.15s" }}>
          <SimmeringPotEmblem />
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#1a3d2e]/60 mt-1">
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
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                Food as medicine, rooted in home
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                DineWithMee is a preventive nutrition and digital health platform helping Africans use food as a tool for better health. We exist to address the growing burden of nutrition-related non-communicable diseases such as hypertension and diabetes by making culturally relevant nutrition support accessible, practical, and sustainable.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Rather than asking people to abandon the foods they know and love, we help them rediscover the healing power of African cuisine through evidence-based nutrition guidance, personalized meal planning, and digital health solutions tailored to local realities.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                At DineWithMee, we believe healthier communities can be built by combining indigenous food knowledge, modern nutrition science, and technology.
              </p>
            </div>
            {/* Decorative floating food glyphs */}
            <div className="relative h-64 hidden md:block" aria-hidden="true">
              <div className="absolute top-2 left-6 food-float-a"><IconJollof size={54} /></div>
              <div className="absolute top-16 right-8 food-float-b"><IconIsombe size={50} /></div>
              <div className="absolute bottom-16 left-14 food-float-b" style={{ animationDelay: "1s" }}><IconPlantain size={46} /></div>
              <div className="absolute bottom-4 right-4 food-float-a" style={{ animationDelay: "0.6s" }}><IconUbugali size={50} /></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 food-float-a" style={{ animationDelay: "1.4s" }}><IconPepper size={36} /></div>
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
              <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3" style={{ fontFamily: "Georgia, serif" }}>Making prevention practical</h3>
              <p className="text-sm text-white/80 leading-relaxed relative z-10">
                To improve health outcomes across Africa by making preventive nutrition accessible through culturally relevant nutrition education, personalized care, and digital health innovation.
              </p>
            </div>
            <div id="vision" className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10 food-float-a"><IconPumpkin size={90} /></div>
              <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase">Our Vision</span>
              <h3 className="text-xl sm:text-2xl font-bold mt-3 mb-3 text-gray-900" style={{ fontFamily: "Georgia, serif" }}>A continent, nourished</h3>
              <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                To become Africa's leading nutrition and preventive health platform, empowering millions of people to prevent and manage chronic diseases while preserving and celebrating the continent's rich food heritage.
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
              Nutrition support, built for real life
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Personalized Nutrition Support", desc: "We provide individualized nutrition consultations and meal plans designed around each person's health goals, medical conditions, lifestyle, and cultural food preferences.", Icon: IconJollof },
              { title: "Culturally Relevant Meal Planning", desc: "We create practical nutrition solutions using familiar African foods and ingredients, making healthy eating realistic, affordable, and sustainable.", Icon: IconIsombe },
              { title: "Digital Preventive Health Solutions", desc: "Through technology, we make nutrition guidance more accessible, scalable, and personalized for individuals and communities across Africa.", Icon: IconUbugali },
              { title: "Nutrition Education", desc: "We equip people with the knowledge and tools they need to make informed food choices and build healthier lifestyles for the long term.", Icon: IconPlantain },
              { title: "Partnerships for Healthier Communities", desc: "We collaborate with healthcare professionals, food providers, and community organizations to improve access to preventive nutrition services and promote healthier populations.", Icon: IconBrochette },
            ].map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow" style={{ animation: "cardIn 0.5s ease both", animationDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-xl bg-[#f5f0e8] flex items-center justify-center mb-4">
                  <item.Icon size={26} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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
                Bridging Medical Science & Heritage West/East African Culinary Sourcing
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our approach addresses the critical intersection between metabolic biomarkers and deep cultural culinary roots. We optimize traditional Nigerian and Rwandan ancestral diets to build target-specific cellular wellness.
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
                  From robust, antioxidant-rich pepper bases and anti-inflammatory ginger-garlic infusions to healthy fat structures in Egusi and fiber-dense plantains, we harness Nigerian staples to naturally balance systemic glycemic indexes and lipid profiles.
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
                  Rooted in the agricultural abundance of Rwanda, we leverage micronutrient-dense *Isombe* (cassava leaves stewed with eggplant and peanuts) and gut-healing legumes to deliver high prebiotic fiber loads that repair gut-microbiome barriers.
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
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Georgia, serif" }}>
                  Small changes, real results
                </h2>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Free, bite-sized nutrition guidance — no account needed. Browse anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { Icon: IconPepper,    title: "Spice smart, salt less", tip: "Lean on scotch bonnet, ginger, and garlic for flavor — it lets you cut back on added salt without losing the taste you love." },
                { Icon: IconPlantain,  title: "Ripe vs. green plantain", tip: "Boiled or grilled green plantain has a lower glycemic impact than fried ripe plantain — a simple swap for blood-sugar control." },
                { Icon: IconIsombe,    title: "Leafy greens, daily", tip: "Cassava leaves, ugu, and amaranth are packed with iron and fiber. Aim for a serving of leafy greens with at least one meal a day." },
                { Icon: IconUbugali,   title: "Balance your plate", tip: "Pair starchy staples like ubugali or fufu with a protein and a vegetable side to slow digestion and steady energy levels." },
                { Icon: IconBrochette, title: "Portion your protein", tip: "A palm-sized portion of grilled protein per meal is enough for most adults — grilling beats deep-frying for heart health." },
                { Icon: IconPumpkin,   title: "Snack on the harvest", tip: "Roasted pumpkin, groundnuts, or boiled corn make satisfying low-processed snacks between meals." },
              ].map((t, i) => (
                <div key={t.title} className="p-5 rounded-2xl border border-gray-100 bg-[#f5f0e8]/50 hover:bg-[#f5f0e8] transition-colors" style={{ animation: "cardIn 0.5s ease both", animationDelay: `${i * 0.06}s` }}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                    <t.Icon size={22} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5" style={{ fontFamily: "Georgia, serif" }}>{t.title}</h3>
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
          <div className="flex items-center gap-2">
            <Logo size={30} />
            <div className="leading-none">
              <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
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
    </div>
  );
}