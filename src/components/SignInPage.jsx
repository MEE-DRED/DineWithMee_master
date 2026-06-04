import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="21" fill="#1a3d2e" />
      <path d="M21 7c0 0-9.5 7.5-9.5 14.5a9.5 9.5 0 0019 0C30.5 14.5 21 7 21 7z" fill="#e8c87d" />
      <path d="M21 13c0 0-5 5-5 8.5a5 5 0 0010 0C26 17 21 13 21 13z" fill="#c9a84c" opacity="0.5" />
    </svg>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ─── Main Sign In Page ────────────────────────────────────────────────────────
export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // If already logged in, skip to dashboard
  useEffect(() => {
    const token = localStorage.getItem("dwm_token");
    if (token) navigate("/dashboard", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim())    { setError("Please enter your email address."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }

    setLoading(true);
    try {
      const res = await fetch("https://new-dine-with-mee-backend.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials. Please try again.");
      if (data.token) localStorage.setItem("dwm_token", data.token);
      if (data.user)  localStorage.setItem("dwm_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      // Show error but if backend is down, allow demo navigation
      if (err.message.includes("fetch")) {
        navigate("/dashboard");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <style>{`
        @keyframes imgReveal {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes formReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        className="w-full border-b border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40"
        style={{ animation: "headerIn 0.35s ease both" }}
      >
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Logo size={36} />
          <div className="leading-none">
            <p className="text-xs font-extrabold text-[#1a3d2e]">Dine</p>
            <p className="text-xs font-extrabold text-[#1a3d2e]">with Mee</p>
          </div>
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden sm:inline text-gray-500">Don't have an account?</span>
          <button
            onClick={() => navigate("/signup")}
            className="font-bold text-gray-900 hover:text-[#1a3d2e] transition-colors"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* ── Progress bar — step indicator ──────────────────────────────── */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pt-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-semibold text-[#1a3d2e]">Sign In</span>
            <span className="text-sm text-gray-500 font-medium">Account Access</span>
          </div>
          <div className="h-1 rounded-full bg-[#1a3d2e] w-full" />
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-start justify-center py-6 lg:py-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">

          {/* ── Left: hero image ── */}
          <div
            className="relative rounded-2xl overflow-hidden hidden lg:block"
            style={{ minHeight: 520, animation: "imgReveal 0.7s ease both" }}
          >
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=85&auto=format&fit=crop"
              alt="Nutritious meal preparation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-white text-2xl font-black leading-tight mb-3" style={{ fontFamily: "Georgia, serif" }}>
                Your personalized<br />nutrition awaits.
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Sign in to continue your health journey with<br />tailored meal plans and expert guidance.
              </p>
            </div>
          </div>

          {/* ── Right: sign in form ── */}
          <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-9 flex flex-col"
            style={{ animation: "formReveal 0.5s ease both", animationDelay: "0.1s" }}
          >
            <h1 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "Georgia, serif" }}>
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mb-7">
              Sign in to access your personalized health journey.
            </p>

            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  autoFocus
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-800">Password</label>
                  <button
                    type="button"
                    className="text-xs text-[#1a3d2e] font-semibold hover:underline"
                    onClick={() => {/* forgot password flow */}}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2.5 mt-1 transition-all"
                style={{
                  backgroundColor: loading ? "#2d5a3d" : "#1a3d2e",
                  opacity: loading ? 0.85 : 1,
                  boxShadow: "0 4px 16px rgba(26,61,46,0.25)",
                }}
              >
                {loading ? "Signing in…" : <><span>Sign In</span><ArrowRight /></>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <AppleIcon />
                <span>Apple</span>
              </button>
            </div>

            {/* Sign Up link */}
            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-gray-900 font-bold hover:text-[#1a3d2e] transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Logo size={26} />
            <div className="leading-none">
              <p className="text-[10px] font-extrabold text-[#1a3d2e]">Dine with Mee</p>
              <p className="text-[10px] text-gray-400">© 2026 Dine With Me. Clinical Nutrition &amp; Culinary Excellence.</p>
            </div>
          </div>
          <nav className="flex items-center gap-5 text-xs text-gray-400">
            {["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"].map(link => (
              <button key={link} className="hover:text-[#1a3d2e] transition-colors font-medium">{link}</button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
