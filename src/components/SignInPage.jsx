import { useState, useEffect } from "react";
import dinewithmeeLogo from "./dinewithmee-logo.png";

const API_BASE = "https://new-dine-with-mee-backend.onrender.com/api/v1";

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const CheckCircle = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Best-effort role → portal normalization so the landing page can route a
// freshly authenticated user to the right workspace without guessing.
function normalizeRole(rawRole) {
  const r = String(rawRole || "").trim().toLowerCase();
  if (!r) return "user";
  if (r.includes("admin")) return "admin";
  if (r.includes("nutrition")) return "nutritionist";
  if (r.includes("pharmac")) return "pharmacist";
  if (r.includes("culinary") || r.includes("chef")) return "culinary";
  if (r.includes("professional")) return "professional";
  return "user";
}

// ─── API INTEGRATION: GET /auth/profile ────────────────────────────────────
// Pulls the authenticated user's profile right after login so the app has
// role + basic identity info available immediately (used by the landing
// page for role-based dashboard routing, and by other screens for display).
async function fetchAndStoreProfile(token) {
  try {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      const user = data.user || data.data || data;
      localStorage.setItem(
        "dwm_user",
        JSON.stringify({
          id: user._id || user.id,
          fullName: user.fullName || user.name,
          email: user.email,
          role: user.role,
          portalRole: normalizeRole(user.role),
        })
      );
    }
  } catch {
    // Non-fatal: sign-in already succeeded, profile is a best-effort enrichment.
  }
}

export default function SignInPage({ navigate }) {
  // "signin" | "forgot" | "reset"
  const [mode, setMode] = useState("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Forgot / reset password flow state
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  // ─── API INTEGRATION: POST /api/v1/auth/login ──────────────────────────────
  async function handleSignIn(e) {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials. Please try again.");
      }

      if (data.token) {
        localStorage.setItem("dwm_token", data.token);
        await fetchAndStoreProfile(data.token);
      }

      navigate("dashboard");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // ─── API INTEGRATION: POST /api/v1/auth/forgot-password ───────────────────
  async function handleForgotPassword(e) {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Couldn't send reset instructions. Please try again.");
      }

      setInfoMsg("If that email is registered, a reset code has been sent. Enter it below.");
      setMode("reset");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // ─── API INTEGRATION: POST /api/v1/auth/reset-password ────────────────────
  async function handleResetPassword(e) {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (newPassword !== confirmNewPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail,
          token: resetToken,
          password: newPassword,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Couldn't reset password. Check the code and try again.");
      }

      setInfoMsg("Password reset successfully. Please sign in with your new password.");
      setEmail(resetEmail);
      setPassword("");
      setResetEmail("");
      setResetToken("");
      setNewPassword("");
      setConfirmNewPassword("");
      setMode("signin");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fbf9f4] font-sans text-stone-800 selection:bg-[#e8c87d]/30">
      <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("landing")}>
          <img src={dinewithmeeLogo} alt="DineWithMee" className="h-8 sm:h-9 w-auto object-contain" />
        </div>
        <button
          onClick={() => navigate("landing")}
          className="flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-[#1a3d2e] transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5 12 3l9 6.5" />
            <path d="M5 10v10h14V10" />
          </svg>
          Home
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 my-4">
        <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl/5 p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#1a3d2e] via-[#e8c87d] to-[#1a3d2e]" />

          {/* ── SIGN IN ─────────────────────────────────────────────────── */}
          {mode === "signin" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-[#1a3d2e] tracking-tight">Welcome Back</h2>
                <p className="text-sm text-gray-400 mt-1">Sign in to resume tracking your therapeutic goals.</p>
              </div>

              {errorMsg && (
                <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600 animate-shake">
                  {errorMsg}
                </div>
              )}
              {infoMsg && (
                <div className="mb-5 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs font-semibold text-emerald-700">
                  {infoMsg}
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@dinewithmee.com"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 bg-[#fbf9f4]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg("");
                        setInfoMsg("");
                        setResetEmail(email);
                        setMode("forgot");
                      }}
                      className="text-xs font-bold text-stone-400 hover:text-[#1a3d2e]"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 pl-4 pr-12 rounded-2xl border border-stone-200 bg-[#fbf9f4]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#1a3d2e] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#1a3d2e]/10 hover:bg-[#11291f] transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <button onClick={() => navigate("signup")} className="text-gray-900 font-bold hover:text-[#1a3d2e] transition-colors">
                  Create one
                </button>
              </p>
            </>
          )}

          {/* ── FORGOT PASSWORD ─────────────────────────────────────────── */}
          {mode === "forgot" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-[#1a3d2e] tracking-tight">Reset Your Password</h2>
                <p className="text-sm text-gray-400 mt-1">We'll email you a code to reset your password.</p>
              </div>

              {errorMsg && (
                <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="doctor@dinewithmee.com"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 bg-[#fbf9f4]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#1a3d2e] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#1a3d2e]/10 hover:bg-[#11291f] transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setMode("signin");
                  }}
                  className="w-full h-12 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back to Sign In
                </button>
              </form>
            </>
          )}

          {/* ── RESET PASSWORD ──────────────────────────────────────────── */}
          {mode === "reset" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-[#1a3d2e] tracking-tight">Enter New Password</h2>
                <p className="text-sm text-gray-400 mt-1">Use the code we sent to {resetEmail || "your email"}.</p>
              </div>

              {errorMsg && (
                <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600">
                  {errorMsg}
                </div>
              )}
              {infoMsg && (
                <div className="mb-5 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs font-semibold text-emerald-700">
                  {infoMsg}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Reset Code</label>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Enter the code from your email"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 bg-[#fbf9f4]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 bg-[#fbf9f4]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 bg-[#fbf9f4]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3d2e]/20 focus:border-[#1a3d2e] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#1a3d2e] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#1a3d2e]/10 hover:bg-[#11291f] transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setMode("signin");
                  }}
                  className="w-full h-12 border border-stone-200 rounded-2xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Back to Sign In
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={dinewithmeeLogo} alt="DineWithMee" className="h-6 w-auto object-contain" />
            <p className="text-[10px] text-gray-400">© 2026 Dine With Me. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}