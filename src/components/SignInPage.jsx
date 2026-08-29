
import { useState, useEffect } from "react";
import axios from "axios";
import dinewithmeeLogo from "./dinewithmee-logo.png";

// Live backend base URL — all auth routes live directly under /auth
// (no /api/v1 prefix).
const API_BASE = "https://new-dine-with-mee-backend-z7it.onrender.com";

// Shared axios instance for every request in this file. `withCredentials`
// mirrors the old `credentials: "include"` fetch option, so an httpOnly
// refresh-token cookie (if the backend sets one) still gets sent/received.
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Pulls a human-readable message out of an axios error, falling back to a
// caller-supplied default when the backend didn't send one.
function apiErrorMessage(err, fallback) {
  return err?.response?.data?.message || fallback;
}

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
async function fetchAndStoreProfile(token, { allowRefresh = true } = {}) {
  try {
    const res = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true, // handle 401 ourselves below instead of throwing
    });

    // Access token expired — try once to silently refresh, then retry.
    if (res.status === 401 && allowRefresh) {
      const refreshed = await refreshAccessToken();
      if (refreshed) return fetchAndStoreProfile(refreshed, { allowRefresh: false });
      return;
    }

    if (res.status >= 200 && res.status < 300) {
      const data = res.data;
      const user = data.user || data.data || data;
      localStorage.setItem(
        "dwm_user",
        JSON.stringify({
          id: user._id || user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName || user.name || [user.firstName, user.lastName].filter(Boolean).join(" "),
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

// ─── API INTEGRATION: POST /auth/refresh ───────────────────────────────────
// Exchanges the stored refresh token (if the backend issues one as an
// httpOnly cookie, `credentials: "include"` picks it up automatically) for
// a fresh access token, and persists it. Returns the new token or null.
export async function refreshAccessToken() {
  try {
    const res = await api.post("/auth/refresh");
    const token = res.data?.token;
    if (!token) return null;
    localStorage.setItem("dwm_token", token);
    return token;
  } catch {
    return null;
  }
}

// ─── API INTEGRATION: GET /auth/profile (session bootstrap) ────────────────
// Used by LandingPage on mount to confirm a cached token is still valid
// (refreshing it if it's merely expired) before trusting a restored session.
export async function validateSession() {
  const token = localStorage.getItem("dwm_token");
  if (!token) return false;

  try {
    let res = await api.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
      validateStatus: () => true,
    });

    if (res.status === 401) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) return false;
      res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${refreshed}` },
        validateStatus: () => true,
      });
    }

    if (res.status < 200 || res.status >= 300) return false;

    const data = res.data;
    const user = data.user || data.data || data;
    localStorage.setItem(
      "dwm_user",
      JSON.stringify({
        id: user._id || user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName || user.name || [user.firstName, user.lastName].filter(Boolean).join(" "),
        email: user.email,
        role: user.role,
        portalRole: normalizeRole(user.role),
      })
    );
    return true;
  } catch {
    return false;
  }
}

// ─── API INTEGRATION: GET /auth/google/callback ────────────────────────────
// Google redirects the browser back to the backend's callback route after
// the user approves access. Depending on how the backend finishes the
// flow, the browser can land back on this app in one of two shapes:
//   1) Backend already exchanged the code and redirected here with a
//      ready-to-use token: e.g. "?token=<jwt>".
//   2) Backend forwards the raw authorization code and lets the frontend
//      complete the exchange: e.g. "?code=<code>&state=<state>", which we
//      forward to GET /auth/google/callback ourselves.
// Returns { status: "success" | "error" | "none", message? }.
export async function completeGoogleOAuthRedirect() {
  const params = new URLSearchParams(window.location.search);
  const error = params.get("error");
  const token = params.get("token");
  const code = params.get("code");

  if (!error && !token && !code) return { status: "none" };

  // Strip OAuth params from the URL so a refresh doesn't replay them.
  const cleanUrl = () => {
    const url = new URL(window.location.href);
    ["token", "code", "state", "error"].forEach((key) => url.searchParams.delete(key));
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  };

  if (error) {
    cleanUrl();
    return { status: "error", message: "Google sign-in was cancelled or denied." };
  }

  try {
    let finalToken = token;

    if (!finalToken && code) {
      const res = await api.get(`/auth/google/callback${window.location.search}`, {
        validateStatus: () => true,
      });
      if (res.status < 200 || res.status >= 300 || !res.data?.token) {
        cleanUrl();
        return { status: "error", message: res.data?.message || "Google sign-in failed. Please try again." };
      }
      finalToken = res.data.token;
    }

    if (!finalToken) {
      cleanUrl();
      return { status: "error", message: "Google sign-in failed. Please try again." };
    }

    localStorage.setItem("dwm_token", finalToken);
    await fetchAndStoreProfile(finalToken);
    cleanUrl();
    return { status: "success" };
  } catch {
    cleanUrl();
    return { status: "error", message: "Google sign-in failed. Please try again." };
  }
}

// ─── API INTEGRATION: POST /auth/logout ────────────────────────────────────
// Invalidates the session on the backend, then clears local session state.
// Exported so LandingPage's logout button can call the real endpoint.
export async function logoutRequest() {
  const token = localStorage.getItem("dwm_token");
  try {
    if (token) {
      await api.post("/auth/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch {
    // Non-fatal: proceed with local logout regardless of backend response.
  } finally {
    localStorage.removeItem("dwm_token");
    localStorage.removeItem("dwm_user");
  }
}

export default function SignInPage({ navigate, initialError }) {
  // "signin" | "forgot" | "reset"
  const [mode, setMode] = useState("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initialError || "");
  const [isLoading, setIsLoading] = useState(false);

  // Forgot / reset password flow state
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  // Surface an OAuth failure (e.g. Google sign-in denied) that LandingPage
  // discovers after this component has already mounted.
  useEffect(() => {
    if (initialError) setErrorMsg(initialError);
  }, [initialError]);

  // ─── API INTEGRATION: POST /auth/login ──────────────────────────────
  async function handleSignIn(e) {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });

      if (data.token) {
        localStorage.setItem("dwm_token", data.token);
        await fetchAndStoreProfile(data.token);
      }

      navigate("dashboard");
    } catch (err) {
      setErrorMsg(apiErrorMessage(err, "Invalid credentials. Please try again."));
    } finally {
      setIsLoading(false);
    }
  }

  // ─── API INTEGRATION: POST /auth/forgot-password ───────────────────
  async function handleForgotPassword(e) {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email: resetEmail });

      setInfoMsg("If that email is registered, a reset code has been sent. Enter it below.");
      setMode("reset");
    } catch (err) {
      setErrorMsg(apiErrorMessage(err, "Couldn't send reset instructions. Please try again."));
    } finally {
      setIsLoading(false);
    }
  }

  // ─── API INTEGRATION: POST /auth/reset-password ────────────────────
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
      await api.post("/auth/reset-password", {
        email: resetEmail,
        token: resetToken,
        password: newPassword,
      });

      setInfoMsg("Password reset successfully. Please sign in with your new password.");
      setEmail(resetEmail);
      setPassword("");
      setResetEmail("");
      setResetToken("");
      setNewPassword("");
      setConfirmNewPassword("");
      setMode("signin");
    } catch (err) {
      setErrorMsg(apiErrorMessage(err, "Couldn't reset password. Check the code and try again."));
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

              <div className="flex items-center gap-3 mt-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">or</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              {/* ─── API INTEGRATION: GET /auth/google ─────────────────────── */}
              <button
                type="button"
                onClick={() => { window.location.href = `${API_BASE}/auth/google`; }}
                className="w-full h-12 mt-4 flex items-center justify-center gap-2.5 border border-stone-200 rounded-2xl text-sm font-bold text-stone-700 hover:bg-stone-50 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.87c2.27-2.09 3.58-5.17 3.58-8.84z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.28a12 12 0 0 0 0 10.76z" />
                  <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l3.99 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
                </svg>
                Continue with Google
              </button>

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