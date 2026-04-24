// src/main.js
// ─────────────────────────────────────────────────────────────
// GLOBAL entry point for Dine With Mee frontend integration.
//
// This script runs on EVERY page and handles:
//   - Navbar auth state
//   - Cart badge count
//   - Global logout listener
//   - Auto-route detection (runs the correct page script)
//
// DROP-IN USAGE — add ONE script tag to every HTML page:
//   <script type="module" src="src/main.js"></script>
//
// You do NOT need separate page scripts — this auto-detects the page.
// ─────────────────────────────────────────────────────────────

import { initNavbar } from "./components/Navbar.js";
import { isLoggedIn } from "./utils/auth.js";
import toast from "./utils/toast.js";

// ── 1. Always run navbar (every page) ───────────────────────
initNavbar();

// ── 2. Auto-detect page & load the right module ─────────────
const path = window.location.pathname.toLowerCase();
const filename = path.split("/").pop().replace(".html", "");

const PAGE_MAP = {
  "":                    () => import("./pages/home.js"),
  "index":               () => import("./pages/home.js"),
  "index-new":           () => import("./pages/home.js"),
  "home":                () => import("./pages/home.js"),
  "meals":               () => import("./pages/meals.js"),
  "marketplace":         () => import("./pages/meals.js"),
  "menu":                () => import("./pages/meals.js"),
  "food":                () => import("./pages/meals.js"),
  "cart":                () => import("./pages/cart.js"),
  "basket":              () => import("./pages/cart.js"),
  "login":               () => import("./pages/login.js"),
  "signin":              () => import("./pages/login.js"),
  "register":            () => import("./pages/register.js"),
  "signup":              () => import("./pages/register.js"),
  "profile":             () => import("./pages/profile.js"),
  "account":             () => import("./pages/profile.js"),
  "dashboard":           () => import("./pages/profile.js"),
  "order-confirmation":  () => import("./pages/order-confirmation.js"),
  "order_confirmation":  () => import("./pages/order-confirmation.js"),
  "confirmation":        () => import("./pages/order-confirmation.js"),
};

if (PAGE_MAP[filename]) {
  PAGE_MAP[filename]().catch((err) => {
    console.warn(`[DWM] Page module failed to load for "${filename}":`, err);
  });
} else {
  // Unknown page — just run navbar (already done above)
  console.debug(`[DWM] No page module for "${filename}" — navbar only.`);
}

// ── 3. Global logout event listener ─────────────────────────
window.addEventListener("dwm:logout", () => {
  // Redirect to home on logout from any page
  const protectedPages = ["profile", "account", "cart", "order-confirmation", "dashboard"];
  if (protectedPages.includes(filename)) {
    window.location.href = "/index.html";
  }
});

// ── 4. Global error handler for uncaught promise rejections ──
window.addEventListener("unhandledrejection", (event) => {
  const err = event.reason;
  if (err?.type === "NETWORK_ERROR") {
    toast.error("Network error. Please check your connection.", { duration: 6000 });
  }
  // Don't swallow — let console still show it
  console.error("[DWM] Unhandled rejection:", err);
});

// ── 5. Handle URL-based category filter from home page ──────
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category");
if (categoryParam && (filename === "meals" || filename === "menu" || filename === "marketplace")) {
  // meals.js will read this on init via URLSearchParams internally
  document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("dwm-category");
    if (categorySelect) {
      categorySelect.value = categoryParam;
      categorySelect.dispatchEvent(new Event("change"));
    }
  });
}
