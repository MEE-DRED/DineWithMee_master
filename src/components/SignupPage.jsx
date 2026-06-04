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
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i < step ? "bg-emerald-900" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ onSignIn, onLogo }) {
  return (
    <nav className="w-full bg-[#f5f1eb] border-b border-stone-200 px-6 py-3 flex items-center justify-between">
      <button
        onClick={onLogo}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">DM</span>
        </div>
        <span className="text-sm font-semibold text-emerald-900 leading-tight">
          Dine<br />with Mee
        </span>
      </button>
      {onSignIn && (
        <button
          onClick={onSignIn}
          className="w-8 h-8 rounded-full border-2 border-stone-300 flex items-center justify-center text-stone-500 hover:border-emerald-700 hover:text-emerald-700 transition-all"
          title="Help / Sign In"
        >
          <span className="text-sm font-semibold">?</span>
        </button>
      )}
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full bg-[#f5f1eb] border-t border-stone-200 px-6 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-900 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">DM</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-900 leading-tight">Dine with Mee</p>
            <p className="text-[10px] text-stone-400">© 2026 Dine With Me. Clinical Nutrition & Culinary Excellence.</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs text-stone-500">
          {["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"].map((l) => (
            <button key={l} className="hover:text-emerald-800 transition-colors">{l}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ navigate }) {
  return (
    <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
      <Navbar onSignIn={() => navigate("signin")} onLogo={() => navigate("landing")} />

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-900/10 text-emerald-900 text-xs font-medium px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
            Clinical Nutrition · Culinary Excellence
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 leading-tight mb-6">
            Start your clinical<br />
            <span className="text-emerald-800 italic">culinary journey</span> today.
          </h1>
          <p className="text-stone-500 text-lg mb-10 max-w-lg mx-auto">
            Personalized nutrition meets gourmet preparation. Join our community of health-conscious foodies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("signup")}
              className="bg-emerald-900 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20"
            >
              Create Free Account →
            </button>
            <button
              onClick={() => navigate("signin")}
              className="border-2 border-emerald-900 text-emerald-900 font-semibold px-8 py-3.5 rounded-full hover:bg-emerald-900/5 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Feature chips */}
        <div className="mt-16 flex flex-wrap gap-3 justify-center max-w-xl">
          {[
            "🥑 Personalized Meal Plans",
            "🧪 Clinical Nutrition Tracking",
            "👨‍🍳 Gourmet Recipes",
            "📊 Health Analytics",
            "🌿 Dietary Compliance",
          ].map((f) => (
            <span
              key={f}
              className="bg-white border border-stone-200 text-stone-600 text-sm px-4 py-2 rounded-full shadow-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── SIGN IN PAGE ─────────────────────────────────────────────────────────────
function SignInPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = findUser(email, password);
      if (user) {
        navigate("dashboard", { name: user.name });
      } else if (!emailExists(email)) {
        setError("No account found. Redirecting to sign up…");
        setTimeout(() => navigate("signup", { prefillEmail: email }), 1500);
      } else {
        setError("Incorrect password. Please try again.");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
      <Navbar onLogo={() => navigate("landing")} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left image panel */}
          <div className="relative lg:w-5/12 h-56 lg:h-auto bg-gradient-to-br from-emerald-900 to-emerald-700 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
              alt="Healthy food"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-2">
                Welcome back to your<br />health journey.
              </h2>
              <p className="text-emerald-100 text-sm">
                Personalized nutrition meets gourmet preparation.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-stone-800 mb-1">Sign In</h2>
            <p className="text-stone-400 text-sm mb-8">
              Enter your credentials to continue your journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPw ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {error && (
                <p className={`text-sm px-3 py-2 rounded-lg ${error.includes("Redirecting") ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-900 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In →</>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">or sign in with</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["Google", "Apple"].map((p) => (
                <button
                  key={p}
                  className="border border-stone-200 rounded-xl py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-base">{p === "Google" ? "G" : ""}</span>
                  {p}
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-stone-500">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("signup")}
                className="font-semibold text-emerald-800 hover:underline"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── CREATE ACCOUNT / SIGN UP PAGE ────────────────────────────────────────────
function SignUpPage({ navigate, prefillEmail = "" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hasMin8 = password.length >= 8;
  const hasUpperAndNum = /[A-Z]/.test(password) && /\d/.test(password);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!hasMin8 || !hasUpperAndNum) {
      setError("Password does not meet requirements.");
      return;
    }
    if (emailExists(email)) {
      setError("An account with this email already exists. Please sign in.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      saveUser({ name, email, password });
      navigate("dashboard", { name });
      setLoading(false);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
      <Navbar onLogo={() => navigate("landing")} />
      <StepBar step={1} total={9} label="Account Creation" />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left image panel */}
          <div className="relative lg:w-5/12 h-56 lg:h-auto bg-gradient-to-br from-emerald-900 to-emerald-700 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"
              alt="Healthy bowl"
              className="w-full h-full object-cover mix-blend-overlay opacity-50"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <h2 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-2">
                Start your clinical culinary<br />journey today.
              </h2>
              <p className="text-emerald-100 text-sm">
                Personalized nutrition meets gourmet preparation. Join our community of health-conscious foodies.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-stone-800 mb-1">Create Account</h2>
            <p className="text-stone-400 text-sm mb-7">
              Enter your details to begin your personalized health journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPw ? "🙈" : "👁"}
                  </button>
                </div>

                {/* Requirements */}
                <div className="mt-2 space-y-1">
                  <Requirement met={hasMin8} label="Minimum 8 characters" />
                  <Requirement met={hasUpperAndNum} label="One uppercase letter & one number" />
                </div>
              </div>

              {error && (
                <p className="text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-900 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Continue to Step 2 →</>
                )}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400 uppercase tracking-wider">or sign up with</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {["Google", "Apple"].map((p) => (
                <button
                  key={p}
                  className="border border-stone-200 rounded-xl py-3 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <button
                onClick={() => navigate("signin")}
                className="font-semibold text-emerald-800 hover:underline"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Requirement({ met, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          met ? "border-emerald-600 bg-emerald-600" : "border-stone-300"
        }`}
      >
        {met && <span className="text-white text-[9px] font-bold">✓</span>}
      </span>
      <span className={`text-xs transition-colors ${met ? "text-emerald-700 font-medium" : "text-stone-400"}`}>
        {label}
      </span>
    </div>
  );
}

// ─── DASHBOARD (post-login) ────────────────────────────────────────────────────
function DashboardPage({ navigate, name = "there" }) {
  return (
    <div className="min-h-screen bg-[#f5f1eb] flex flex-col font-serif">
      <Navbar onLogo={() => navigate("landing")} />
      <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-lg">
          <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🥗</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-3">
            Welcome, {name}!
          </h1>
          <p className="text-stone-500 mb-8">
            Your clinical culinary journey has begun. Your personalized meal plan and nutrition dashboard will be set up in the next steps.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-8 text-left">
            <h3 className="font-semibold text-stone-700 mb-4">Your journey continues…</h3>
            {[
              { step: 2, label: "Health Goals", done: false },
              { step: 3, label: "Dietary Preferences", done: false },
              { step: 4, label: "Medical Conditions", done: false },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3 py-2.5 border-b border-stone-100 last:border-0">
                <span className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
                <span className="text-sm text-stone-600">{s.label}</span>
                <span className="ml-auto text-xs text-stone-400">Not started</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("landing")}
            className="text-sm text-stone-500 hover:text-emerald-800 transition-colors"
          >
            ← Back to home
          </button>
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
      return <LandingPage navigate={navigate} />;
  }
}
