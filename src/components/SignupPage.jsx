// import { useState, useEffect } from "react";

// // ─── Shared helpers ───────────────────────────────────────────────────────────
// const STORAGE_KEY = "dwm_users";

// function getUsers() {
//   try {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//   } catch {
//     return [];
//   }
// }

// function saveUser(user) {
//   const users = getUsers();
//   users.push(user);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
// }

// function findUser(email, password) {
//   return getUsers().find((u) => u.email === email && u.password === password);
// }

// function emailExists(email) {
//   return getUsers().some((u) => u.email === email);
// }

// // ─── Progress Bar ─────────────────────────────────────────────────────────────
// function StepBar({ step = 1, total = 9, label = "Account Creation" }) {
//   return (
//     <div className="w-full px-6 py-4 border-b border-stone-200 bg-white">
//       <div className="max-w-5xl mx-auto flex items-center justify-between mb-2">
//         <span className="text-sm font-semibold text-stone-800">
//           Step {step} of {total}
//         </span>
//         <span className="text-sm text-stone-500">{label}</span>
//       </div>
//       <div className="max-w-5xl mx-auto flex gap-1.5">
//         {Array.from({ length: total }).map((_, i) => (
//           <div
//             key={i}
//             className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
//               i < step ? "bg-emerald-900" : "bg-stone-200"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Navbar ───────────────────────────────────────────────────────────────────
// function Navbar({ onSignIn, onLogo }) {
//   return (
//     <nav className="w-full bg-[#f5f1eb] border-b border-stone-200 px-6 py-3 flex items-center justify-between">
//       <button
//         onClick={onLogo}
//         className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//       >
//         <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center">
//           <span className="text-white text-xs font-bold">DM</span>
//         </div>
//         <span className="text-sm font-semibold text-emerald-900 leading-tight">
//           Dine<br />with Mee
//         </span>
//       </button>
//       {onSignIn && (
//         <button
//           onClick={onSignIn}
//           className="w-8 h-8 rounded-full border-2 border-stone-300 flex items-center justify-center text-stone-500 hover:border-emerald-700 hover:text-emerald-700 transition-all"
//           title="Help / Sign In"
//         >
//           <span className="text-sm font-semibold">?</span>
//         </button>
//       )}
//     </nav>
//   );
// }

// // ─── Footer ───────────────────────────────────────────────────────────────────
// function Footer() {
//   return (
//     <footer className="w-full bg-[#f5f1eb] border-t border-stone-200 px-6 py-5">
//       <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center">
//             <span className="text-white text-[10px] font-bold">DM</span>
//           </div>
//           <div>
//             <p className="text-xs font-semibold text-emerald-900 leading-tight">Dine with Mee</p>
//             <p className="text-[10px] text-stone-400">© 2026 Dine With Me. Clinical Nutrition & Culinary Excellence.</p>
//           </div>
//         </div>
//         <div className="flex gap-4 text-xs text-stone-500">
//           {["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"].map((l) => (
//             <button key={l} className="hover:text-emerald-800 transition-colors">{l}</button>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ─── LANDING PAGE ─────────────────────────────────────────────────────────────
// function LandingPage({ navigate }) {
//   return (
//     <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
//       <Navbar onSignIn={() => navigate("signin")} onLogo={() => navigate("landing")} />

//       {/* Hero */}
//       <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
//         <div className="max-w-2xl">
//           <div className="inline-flex items-center gap-2 bg-emerald-900/10 text-emerald-900 text-xs font-medium px-3 py-1 rounded-full mb-6">
//             <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
//             Clinical Nutrition · Culinary Excellence
//           </div>
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 leading-tight mb-6">
//             Start your clinical<br />
//             <span className="text-emerald-800 italic">culinary journey</span> today.
//           </h1>
//           <p className="text-stone-500 text-lg mb-10 max-w-lg mx-auto">
//             Personalized nutrition meets gourmet preparation. Join our community of health-conscious foodies.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => navigate("signup")}
//               className="bg-emerald-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20"
//             >
//               Create Free Account →
//             </button>
//             <button
//               onClick={() => navigate("signin")}
//               className="border-2 border-emerald-900 text-emerald-900 font-semibold px-8 py-3.5 rounded-full hover:bg-emerald-900/5 transition-colors"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>

//         {/* Feature chips */}
//         <div className="mt-16 flex flex-wrap gap-3 justify-center max-w-xl">
//           {[
//             "🥑 Personalized Meal Plans",
//             "🧪 Clinical Nutrition Tracking",
//             "👨‍🍳 Gourmet Recipes",
//             "📊 Health Analytics",
//             "🌿 Dietary Compliance",
//           ].map((f) => (
//             <span
//               key={f}
//               className="bg-white border border-stone-200 text-stone-600 text-sm px-4 py-2 rounded-full shadow-sm"
//             >
//               {f}
//             </span>
//           ))}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// // ─── SIGN IN PAGE ─────────────────────────────────────────────────────────────
// function SignInPage({ navigate }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       const user = findUser(email, password);
//       if (user) {
//         navigate("dashboard", { name: user.name });
//       } else if (!emailExists(email)) {
//         setError("No account found. Redirecting to sign up…");
//         setTimeout(() => navigate("signup", { prefillEmail: email }), 1500);
//       } else {
//         setError("Incorrect password. Please try again.");
//       }
//       setLoading(false);
//     }, 600);
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
//       <Navbar onLogo={() => navigate("landing")} />

//       <main className="flex-1 flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
//           {/* Left image panel */}
//           <div className="relative lg:w-5/12 h-56 lg:h-auto bg-gradient-to-br from-emerald-900 to-emerald-700 flex-shrink-0">
//             <img
//               src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
//               alt="Healthy food"
//               className="w-full h-full object-cover mix-blend-overlay opacity-60"
//             />
//             <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
//               <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-2">
//                 Welcome back to your<br />health journey.
//               </h2>
//               <p className="text-emerald-100 text-sm">
//                 Personalized nutrition meets gourmet preparation.
//               </p>
//             </div>
//           </div>

//           {/* Right form panel */}
//           <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
//             <h2 className="text-2xl font-bold text-stone-800 mb-1">Sign In</h2>
//             <p className="text-stone-400 text-sm mb-8">
//               Enter your credentials to continue your journey.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-stone-700 mb-1.5">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="john@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-semibold text-stone-700 mb-1.5">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPw ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPw(!showPw)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
//                   >
//                     {showPw ? "🙈" : "👁"}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <p className={`text-sm px-3 py-2 rounded-lg ${error.includes("Redirecting") ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>
//                   {error}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-emerald-900 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
//               >
//                 {loading ? (
//                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>Sign In →</>
//                 )}
//               </button>
//             </form>

//             <div className="my-6 flex items-center gap-3">
//               <div className="flex-1 h-px bg-stone-200" />
//               <span className="text-xs text-stone-400 uppercase tracking-wider">or sign in with</span>
//               <div className="flex-1 h-px bg-stone-200" />
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {["Google", "Apple"].map((p) => (
//                 <button
//                   key={p}
//                   className="border border-stone-200 rounded-xl py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <span className="text-base">{p === "Google" ? "G" : ""}</span>
//                   {p}
//                 </button>
//               ))}
//             </div>

//             <p className="mt-6 text-center text-sm text-stone-500">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => navigate("signup")}
//                 className="font-semibold text-emerald-800 hover:underline"
//               >
//                 Create one
//               </button>
//             </p>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// // ─── CREATE ACCOUNT / SIGN UP PAGE ────────────────────────────────────────────
// function SignUpPage({ navigate, prefillEmail = "" }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState(prefillEmail);
//   const [password, setPassword] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const hasMin8 = password.length >= 8;
//   const hasUpperAndNum = /[A-Z]/.test(password) && /\d/.test(password);

//   function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     if (!name || !email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     if (!hasMin8 || !hasUpperAndNum) {
//       setError("Password does not meet requirements.");
//       return;
//     }
//     if (emailExists(email)) {
//       setError("An account with this email already exists. Please sign in.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       saveUser({ name, email, password });
//       navigate("dashboard", { name });
//       setLoading(false);
//     }, 700);
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
//       <Navbar onLogo={() => navigate("landing")} />
//       <StepBar step={1} total={9} label="Account Creation" />

//       <main className="flex-1 flex items-center justify-center px-4 py-10">
//         <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
//           {/* Left image panel */}
//           <div className="relative lg:w-5/12 h-56 lg:h-auto bg-gradient-to-br from-emerald-900 to-emerald-700 flex-shrink-0">
//             <img
//               src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
//               alt="Healthy bowl"
//               className="w-full h-full object-cover mix-blend-overlay opacity-50"
//             />
//             <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
//               <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-2">
//                 Start your clinical culinary<br />journey today.
//               </h2>
//               <p className="text-emerald-100 text-sm">
//                 Personalized nutrition meets gourmet preparation. Join our community of health-conscious foodies.
//               </p>
//             </div>
//           </div>

//           {/* Right form panel */}
//           <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
//             <h2 className="text-2xl font-bold text-stone-800 mb-1">Create Account</h2>
//             <p className="text-stone-400 text-sm mb-7">
//               Enter your details to begin your personalized health journey.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-stone-700 mb-1.5">Full Name</label>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
//                 <input
//                   type="email"
//                   placeholder="john@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPw ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPw(!showPw)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
//                   >
//                     {showPw ? "🙈" : "👁"}
//                   </button>
//                 </div>

//                 {/* Requirements */}
//                 <div className="mt-2 space-y-1">
//                   <Requirement met={hasMin8} label="Minimum 8 characters" />
//                   <Requirement met={hasUpperAndNum} label="One uppercase letter & one number" />
//                 </div>
//               </div>

//               {error && (
//                 <p className="text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-emerald-900 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
//               >
//                 {loading ? (
//                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <>Continue to Step 2 →</>
//                 )}
//               </button>
//             </form>

//             <div className="my-5 flex items-center gap-3">
//               <div className="flex-1 h-px bg-stone-200" />
//               <span className="text-xs text-stone-400 uppercase tracking-wider">or sign up with</span>
//               <div className="flex-1 h-px bg-stone-200" />
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               {["Google", "Apple"].map((p) => (
//                 <button
//                   key={p}
//                   className="border border-stone-200 rounded-xl py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
//                 >
//                   {p}
//                 </button>
//               ))}
//             </div>

//             <p className="mt-5 text-center text-sm text-stone-500">
//               Already have an account?{" "}
//               <button
//                 onClick={() => navigate("signin")}
//                 className="font-semibold text-emerald-800 hover:underline"
//               >
//                 Log In
//               </button>
//             </p>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// function Requirement({ met, label }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span
//         className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
//           met ? "border-emerald-600 bg-emerald-600" : "border-stone-300"
//         }`}
//       >
//         {met && <span className="text-white text-[9px] font-bold">✓</span>}
//       </span>
//       <span className={`text-xs transition-colors ${met ? "text-emerald-700 font-medium" : "text-stone-400"}`}>
//         {label}
//       </span>
//     </div>
//   );
// }

// // ─── DASHBOARD (post-login) ────────────────────────────────────────────────────
// function DashboardPage({ navigate, name = "there" }) {
//   return (
//     <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
//       <Navbar onLogo={() => navigate("landing")} />
//       <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
//         <div className="max-w-lg">
//           <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-2xl">🥗</span>
//           </div>
//           <h1 className="text-3xl font-bold text-stone-800 mb-3">
//             Welcome, {name}!
//           </h1>
//           <p className="text-stone-500 mb-8">
//             Your clinical culinary journey has begun. Your personalized meal plan and nutrition dashboard will be set up in the next steps.
//           </p>
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-8 text-left">
//             <h3 className="font-semibold text-stone-700 mb-4">Your journey continues…</h3>
//             {[
//               { step: 2, label: "Health Goals", done: false },
//               { step: 3, label: "Dietary Preferences", done: false },
//               { step: 4, label: "Medical Conditions", done: false },
//             ].map((s) => (
//               <div key={s.step} className="flex items-center gap-3 py-2.5 border-b border-stone-100 last:border-0">
//                 <span className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 text-xs font-bold flex items-center justify-center">
//                   {s.step}
//                 </span>
//                 <span className="text-sm text-stone-600">{s.label}</span>
//                 <span className="ml-auto text-xs text-stone-400">Not started</span>
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={() => navigate("landing")}
//             className="text-sm text-stone-500 hover:text-emerald-800 transition-colors"
//           >
//             ← Back to home
//           </button>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// // ─── ROUTER / APP ROOT ────────────────────────────────────────────────────────
// export default function App() {
//   const [page, setPage] = useState("landing");
//   const [pageProps, setPageProps] = useState({});

//   function navigate(target, props = {}) {
//     setPageProps(props);
//     setPage(target);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   // Keyboard shortcut: ESC → landing
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === "Escape" && page !== "landing") navigate("landing");
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [page]);

//   switch (page) {
//     case "signin":
//       return <SignInPage navigate={navigate} {...pageProps} />;
//     case "signup":
//       return <SignUpPage navigate={navigate} {...pageProps} />;
//     case "dashboard":
//       return <DashboardPage navigate={navigate} {...pageProps} />;
//     default:
//       return <LandingPage navigate={navigate} />;
//   }
// }


import { useState, useEffect } from "react";

// ─── Shared helpers ───────────────────────────────────────────────────────────
const STORAGE_KEY = "dwm_users";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function findUser(email, password) {
  return getUsers().find((u) => u.email === email && u.password === password);
}

function emailExists(email) {
  return getUsers().some((u) => u.email === email);
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function StepBar({ step = 1, total = 9, label = "Account Creation" }) {
  return (
    <div className="w-full px-6 py-4 border-b border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-stone-800">
          Step {step} of {total}
        </span>
        <span className="text-sm text-stone-500">{label}</span>
      </div>
      <div className="max-w-5xl mx-auto flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i + 1 <= step ? "bg-emerald-700" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Header & Footer Components ──────────────────────────────────────────────
function Header({ navigate }) {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 sm:px-10 h-16 flex items-center justify-between">
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => navigate("landing")}
      >
        <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
          <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
          <path
            d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z"
            fill="#e8c87d"
          />
          <path
            d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z"
            fill="#c9a84c"
            opacity="0.5"
          />
        </svg>
        <div>
          <p className="text-sm font-black text-[#1a3d2e] tracking-tight">
            Dine with Mee
          </p>
          <p className="text-[9px] text-stone-400 font-medium">
            Clinical Nutrition Platform
          </p>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100 px-6 sm:px-10 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 42 42" fill="none">
            <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
            <path
              d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z"
              fill="#e8c87d"
            />
          </svg>
          <div className="leading-none">
            <p className="text-[10px] font-extrabold text-[#1a3d2e]">
              Dine with Mee
            </p>
            <p className="text-[10px] text-stone-400">
              © 2026 Dine With Me. Clinical Nutrition & Culinary Excellence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN SIGN UP MULTI-STEP PAGE ────────────────────────────────────────────
export function SignUpPage({ navigate }) {
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient", 
    allergies: [],
    dietaryGoals: [],
    medicalConditions: [],
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggleArray = (field, item) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const nextStep = () => {
    setErrorMsg("");
    setStep((prev) => Math.min(prev + 1, 9));
  };

  const prevStep = () => {
    setErrorMsg("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Step 1 Validation: Base credentials
  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (emailExists(formData.email)) {
      setErrorMsg("This email is already registered.");
      return;
    }
    nextStep();
  };

  // Step 8 Trigger: Final submit handler linking to live API request
  const handleFinalSubmit = async () => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          medicalMetadata: {
            allergies: formData.allergies,
            dietaryGoals: formData.dietaryGoals,
            medicalConditions: formData.medicalConditions
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration service encountered an error.");
      }

      if (data.token) {
        localStorage.setItem("dwm_token", data.token);
      }
      
      setApiSuccess(true);
    } catch (err) {
      console.warn("API Error caught: Local fallback generated.", err.message);
      setApiSuccess(false);
    } finally {
      // Save data locally to keep the app working for mock/offline situations
      saveUser(formData);
      setIsSubmitting(false);
      nextStep();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans select-none">
      <Header navigate={navigate} />
      <StepBar
        step={step}
        total={9}
        label={
          step === 1
            ? "Account Credentials"
            : step === 2
            ? "Choose Platform Role"
            : step === 3
            ? "Allergies & Intolerances"
            : step === 4
            ? "Primary Dietary Goals"
            : step === 5
            ? "Clinical & Medical Background"
            : step === 6
            ? "Terms & Regulatory Declarations"
            : step === 7
            ? "Verify Inputs"
            : step === 8
            ? "Submission Protocol"
            : "Registration Complete"
        }
      />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white border border-stone-200/60 rounded-3xl shadow-xl/5 p-8 relative">
          {errorMsg && (
            <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: CREDENTIALS */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold shadow-lg hover:bg-emerald-900 transition-all mt-4"
              >
                Continue Setup
              </button>
            </form>
          )}

          {/* STEP 2: ROLE SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-500 mb-4">
                Select your functional primary access level inside the Dine With Mee ecosystems.
              </p>
              {["Patient", "Nutritionist/Professional", "Culinary Expert/Chef"].map((role) => (
                <label
                  key={role}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.role === role
                      ? "border-emerald-700 bg-emerald-50/40 font-bold"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="accent-emerald-800 h-4 w-4"
                  />
                  <span className="text-sm text-stone-700">{role}</span>
                </label>
              ))}
              <div className="flex justify-between gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="h-12 px-6 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all"
                >
                  Confirm Profile Type
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ALLERGIES */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-500 mb-2">
                Identify ingredients or reactive items to dynamically flag therapeutic configurations.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Peanuts", "Tree Nuts", "Dairy", "Gluten", "Soy", "Shellfish", "Eggs", "Fish"].map((item) => {
                  const active = formData.allergies.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => handleToggleArray("allergies", item)}
                      className={`h-12 border text-left px-4 rounded-xl text-sm transition-all ${
                        active
                          ? "border-emerald-700 bg-emerald-50 text-emerald-800 font-bold"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {item} {active && "✓"}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="h-12 px-6 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all"
                >
                  Save Allergen Profile
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: DIETARY GOALS */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-500 mb-2">
                What targets are you working toward via customized culinary programming?
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {["Weight Management", "Glycemic Optimization", "Cardiovascular Defense", "Inflammatory Mitigation", "Hypertrophy & Muscle Synthesis"].map((goal) => {
                  const active = formData.dietaryGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      onClick={() => handleToggleArray("dietaryGoals", goal)}
                      className={`h-12 border text-left px-4 rounded-xl text-sm transition-all flex items-center justify-between ${
                        active
                          ? "border-emerald-700 bg-emerald-50 text-emerald-800 font-bold"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <span>{goal}</span>
                      {active && <span className="text-emerald-700 text-xs">Selected</span>}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="h-12 px-6 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: MEDICAL BACKGROUND */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-500 mb-2">
                Disclose baseline diagnoses for responsive dynamic safety ranges.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Diabetes Type I/II", "Hypertension", "Celiac Disease", "IBS/IBD", "Chronic Kidney Disease", "None / Preventative Only"].map((cond) => {
                  const active = formData.medicalConditions.includes(cond);
                  return (
                    <button
                      key={cond}
                      onClick={() => handleToggleArray("medicalConditions", cond)}
                      className={`p-3 border text-left rounded-xl text-xs transition-all h-14 flex items-center ${
                        active
                          ? "border-emerald-700 bg-emerald-50 text-emerald-800 font-bold"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {cond}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="h-12 px-6 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all"
                >
                  Confirm Medical Metadata
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: TERMS & COMPLIANCE */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500 max-h-48 overflow-y-auto space-y-3 leading-relaxed">
                <p className="font-bold text-stone-800">1. Scope of Clinical Information Framework</p>
                <p>
                  Dine With Mee offers data architecture to support personal, clinical, and expert culinary goal optimization. This software interface system does not dispense binding prescription protocols.
                </p>
                <p className="font-bold text-stone-800">2. Privacy & HIPAA Compliance Safeguards</p>
                <p>
                  By finalizing account setup, you acknowledge transmission of user metrics across protected localized structural databases.
                </p>
              </div>
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 accent-emerald-800 rounded"
                />
                <span className="text-xs text-stone-600 leading-tight">
                  I explicitly certify acceptance of the data tracking provisions and terms of service.
                </span>
              </label>
              <div className="flex justify-between gap-4 pt-4">
                <button
                  onClick={prevStep}
                  className="h-12 px-6 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.termsAccepted}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Accept & Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW VERIFICATION */}
          {step === 7 && (
            <div className="space-y-5">
              <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">
                Verification Manifest
              </p>
              <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50/50 text-sm space-y-2.5">
                <p><span className="text-stone-400">Identifier:</span> {formData.fullName} ({formData.email})</p>
                <p><span className="text-stone-400">System Access Tier:</span> {formData.role}</p>
                <p>
                  <span className="text-stone-400">Allergies Recorded:</span>{" "}
                  {formData.allergies.length ? formData.allergies.join(", ") : "None Inputted"}
                </p>
                <p>
                  <span className="text-stone-400">Primary Health Aims:</span>{" "}
                  {formData.dietaryGoals.length ? formData.dietaryGoals.join(", ") : "None Inputted"}
                </p>
                <p>
                  <span className="text-stone-400">Diagnoses Tracked:</span>{" "}
                  {formData.medicalConditions.length ? formData.medicalConditions.join(", ") : "None"}
                </p>
              </div>
              <div className="flex justify-between gap-4 pt-2">
                <button
                  onClick={prevStep}
                  className="h-12 px-6 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Amend Details
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all"
                >
                  Looks Good, Finalize
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: DISPATCH PROTOCOL */}
          {step === 8 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 border-4 border-stone-200 border-t-emerald-800 rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="text-base font-bold text-stone-800">Deploying Credentials</h3>
                <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                  Syncing core biological definitions with encryption tokens into distributed network architecture...
                </p>
              </div>
            </div>
          )}

          {/* STEP 9: SUCCESS ROUTE */}
          {step === 9 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800 font-bold text-xl">
                ✓
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                  Account Formulated Successfully
                </h2>
                <p className="text-xs text-stone-400 mt-1.5 max-w-xs mx-auto">
                  Your client metrics structure has been initialized. You can now use these credentials to interact with your dashboard.
                </p>
              </div>
              <button
                onClick={() => navigate("landing")}
                className="w-full h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold shadow-md hover:bg-emerald-900 transition-all"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── ROUTER / APP ROOT ────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [pageProps, setPageProps] = useState({});

  function navigate(target, props = {}) {
    setPageProps(props);
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Keyboard shortcut: ESC → landing
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && page !== "landing") navigate("landing");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [page]);

  switch (page) {
    case "signin":
      return <SignInPage navigate={navigate} {...pageProps} />;
    case "signup":
      return <SignUpPage navigate={navigate} {...pageProps} />;
    case "dashboard":
      return <DashboardPage navigate={navigate} {...pageProps} />;
    default:
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 gap-4">
          <h1 className="font-black text-2xl text-stone-800">Dine with Mee Mock Root</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("signin")}
              className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold"
            >
              Sign In Screen
            </button>
            <button
              onClick={() => navigate("signup")}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
            >
              Sign Up Wizard
            </button>
          </div>
        </div>
      );
  }
}

// Global Dummy placeholders to prevent import breaks inside standalone environments
function SignInPage() { return null; }
function DashboardPage() { return null; }