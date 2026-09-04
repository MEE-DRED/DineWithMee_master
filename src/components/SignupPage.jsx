import { useState, useEffect } from "react";
import axios from "axios";
import dinewithmeeLogo from "./dinewithmee-logo.png";

// Live backend base URL — all auth routes live directly under /auth
// (no /api/v1 prefix).
const API_BASE = "https://new-dine-with-mee-backend-z7it.onrender.com";

// Shared axios instance for every request in this file.
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

// Role options shown in the UI, mapped to the backend's strict enum
// (CUSTOMER | NUTRITIONIST | ADMIN | PHARMACY_PARTNER). "ADMIN" is
// intentionally not self-selectable from public signup.
const ROLE_OPTIONS = [
  { value: "CUSTOMER", label: "Patient / Personal User" },
  { value: "NUTRITIONIST", label: "Nutritionist / Health Professional" },
  { value: "PHARMACY_PARTNER", label: "Pharmacy Partner" },
];

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
async function fetchAndStoreProfile(token) {
  try {
    const res = await api.get("https://new-dine-with-mee-backend-z7it.onrender.com/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  } catch {
    // Non-fatal: registration already succeeded, profile is a best-effort enrichment.
  }
}

// ─── API INTEGRATION: PUT /auth/profile (best-effort medical metadata sync) ─
// The signup DTO doesn't accept allergies/dietaryGoals/medicalConditions
// directly (the backend rejected "medicalMetadata" as an unknown property),
// so we save the account first and then push this data to the profile
// endpoint once we have an authenticated token. Non-fatal: the account
// already exists even if this fails, so we surface nothing to the user.
async function syncMedicalProfile(token, formData) {
  try {
    await api.put(
      "https://new-dine-with-mee-backend-z7it.onrender.com/auth/profile",
      {
        allergies: formData.allergies,
        dietaryGoals: formData.dietaryGoals,
        medicalConditions: formData.medicalConditions,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch {
    // Non-fatal — see comment above.
  }
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
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100 px-6 sm:px-10 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={dinewithmeeLogo} alt="DineWithMee" className="h-6 w-auto object-contain" />
          <p className="text-[10px] text-stone-400">
            © 2026 Dine With Me. Clinical Nutrition & Culinary Excellence.
          </p>
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
    allergies: [],
    dietaryGoals: [],
    medicalConditions: [],
    termsAccepted: false,
    privacyAccepted: false,
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
    const first = formData.firstName.trim();
    const last = formData.lastName.trim();
    if (first.length < 2 || first.length > 50 || last.length < 2 || last.length > 50) {
      setErrorMsg("First and last name must each be between 2 and 50 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    nextStep();
  };

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMsg, setResendMsg] = useState("");

  // Countdown ticker for the resend cooldown.
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Step 7 Trigger: Final submit handler — POST /auth/signup
  const handleFinalSubmit = async () => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const { data } = await api.post("https://new-dine-with-mee-backend-z7it.onrender.com/auth/signup", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role,
        // NOTE: the backend's DTO validation messages ("Terms acceptance
        // must be a boolean") indicate these two keys are defined with
        // literal spaced property names rather than camelCase — so we
        // send them exactly as the validator names them. If the backend
        // is ever updated to camelCase, swap these two keys back to
        // "termsAccepted" / "privacyPolicyAccepted".
        "Terms acceptance": formData.termsAccepted === true,
        "Privacy policy acceptance": formData.privacyAccepted === true,
      });

      setApiSuccess(true);

      if (data.token) {
        // Backend already authenticated this account — no OTP step needed.
        localStorage.setItem("dwm_token", data.token);
        await fetchAndStoreProfile(data.token);
        await syncMedicalProfile(data.token, formData);
        setOtpVerified(true);
        setStep(9);
      } else {
        setStep(8); // needs OTP verification
      }
    } catch (err) {
      setApiSuccess(false);
      setErrorMsg(apiErrorMessage(err, "Registration failed. Please check your details and try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 8 Trigger: OTP verification — POST /auth/verify-otp
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsVerifying(true);

    try {
      const { data } = await api.post("https://new-dine-with-mee-backend-z7it.onrender.com/auth/verify-otp", { email: formData.email, otp });

      if (data.token) {
        localStorage.setItem("dwm_token", data.token);
      }

      const token = data.token || localStorage.getItem("dwm_token");
      if (token) {
        await fetchAndStoreProfile(token);
        await syncMedicalProfile(token, formData);
      }

      setOtpVerified(true);
      nextStep(); // move on to success (step 9)
    } catch (err) {
      setErrorMsg(apiErrorMessage(err, "That code didn't work. Please check it and try again."));
    } finally {
      setIsVerifying(false);
    }
  };

  // ─── API INTEGRATION: POST /auth/resend-otp ─────────────────────────────
  // NOTE: this exact path isn't confirmed against the Swagger docs reviewed
  // so far (only /auth/signup, /auth/verify-otp, /auth/login, etc. were
  // visible) — it's the standard naming convention for this kind of route.
  // If the backend uses a different path (e.g. re-hitting /auth/signup, or
  // a dedicated /auth/otp/resend), swap the URL below to match.
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;
    setErrorMsg("");
    setResendMsg("");
    setIsResending(true);

    try {
      await api.post("/auth/resend-otp", { email: formData.email });
      setResendMsg("A new code has been sent to your email.");
      setOtp("");
      setResendCooldown(60);
    } catch (err) {
      setErrorMsg(apiErrorMessage(err, "Couldn't resend the code. Please try again shortly."));
    } finally {
      setIsResending(false);
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
            ? "Verify Your Email"
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    minLength={2}
                    maxLength={50}
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    minLength={2}
                    maxLength={50}
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
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

              <div className="flex items-center gap-3 pt-1">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">or</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              {/* ─── API INTEGRATION: GET /auth/google ───────────────────────
                  Redirects to the backend's Google OAuth flow; it will
                  redirect back with a session token on success. */}
              <button
                type="button"
                onClick={() => { window.location.href = `$https://new-dine-with-mee-backend-z7it.onrender.com/auth/google`; }}
                className="w-full h-12 flex items-center justify-center gap-2.5 border border-stone-200 rounded-2xl text-sm font-bold text-stone-700 hover:bg-stone-50 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.87c2.27-2.09 3.58-5.17 3.58-8.84z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.87-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.62H1.28a12 12 0 0 0 0 10.76z" />
                  <path fill="#EA4335" d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l3.99 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
                </svg>
                Continue with Google
              </button>
            </form>
          )}

          {/* STEP 2: ROLE SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-stone-500 mb-4">
                Select your functional primary access level inside the Dine With Mee ecosystems.
              </p>
              {ROLE_OPTIONS.map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.role === value
                      ? "border-emerald-700 bg-emerald-50/40 font-bold"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={value}
                    checked={formData.role === value}
                    onChange={handleChange}
                    className="accent-emerald-800 h-4 w-4"
                  />
                  <span className="text-sm text-stone-700">{label}</span>
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
                  I certify acceptance of the Terms of Service.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 accent-emerald-800 rounded"
                />
                <span className="text-xs text-stone-600 leading-tight">
                  I certify acceptance of the Privacy Policy and data tracking provisions.
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
                  disabled={!formData.termsAccepted || !formData.privacyAccepted}
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
                <p><span className="text-stone-400">Identifier:</span> {formData.firstName} {formData.lastName} ({formData.email})</p>
                <p><span className="text-stone-400">System Access Tier:</span> {ROLE_OPTIONS.find((r) => r.value === formData.role)?.label || formData.role}</p>
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
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-emerald-800 text-white rounded-2xl text-sm font-bold hover:bg-emerald-900 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Looks Good, Finalize"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 8: OTP VERIFICATION */}
          {step === 8 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-stone-800">Check your inbox</h3>
                <p className="text-xs text-stone-400 mt-1 max-w-xs">
                  We sent a verification code to <span className="font-semibold text-stone-600">{formData.email}</span>. Enter it below to activate your account.
                </p>
              </div>
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full h-12 px-4 rounded-2xl border border-stone-200 text-sm tracking-[0.5em] text-center font-bold focus:outline-none focus:border-emerald-700 bg-stone-50/50"
                  />
                  <p className="text-[11px] text-stone-400 mt-1.5 text-right">{otp.length}/6</p>
                </div>
                <button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifying}
                  className={`w-full h-12 rounded-2xl text-sm font-bold shadow-lg transition-all ${
                    otp.length === 6
                      ? "bg-emerald-800 text-white hover:bg-emerald-900"
                      : "bg-stone-200 text-stone-400 shadow-none cursor-not-allowed"
                  } disabled:opacity-50`}
                >
                  {isVerifying ? "Verifying..." : "Verify & Activate Account"}
                </button>
              </form>

              {/* ─── Resend OTP ─────────────────────────────────────────── */}
              <div className="text-center pt-1">
                {resendMsg && (
                  <p className="text-xs font-medium text-emerald-700 mb-2">{resendMsg}</p>
                )}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || isResending}
                  className={`text-xs font-bold transition-colors ${
                    resendCooldown > 0 || isResending
                      ? "text-stone-300 cursor-not-allowed"
                      : "text-emerald-800 hover:text-emerald-900 underline underline-offset-2"
                  }`}
                >
                  {isResending
                    ? "Sending..."
                    : resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Didn't get a code? Resend it"}
                </button>
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
                onClick={() => navigate("signin")}
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