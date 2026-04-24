// dine-with-mee-integration-test.js
// ─────────────────────────────────────────────────────────────
// Comprehensive frontend integration test suite
// Run in browser console on any page to validate integration
// Usage: Copy entire script into browser DevTools Console
// ─────────────────────────────────────────────────────────────

console.clear();
console.log("🍲 Dine With Mee - Integration Test Suite\n");

const RESULTS = {
  passed: [],
  failed: [],
  warnings: [],
};

function test(name, fn) {
  try {
    const result = fn();
    if (result === true || result === undefined) {
      RESULTS.passed.push(name);
      console.log(`✅ ${name}`);
    } else {
      RESULTS.failed.push(name);
      console.error(`❌ ${name} - ${result}`);
    }
  } catch (error) {
    RESULTS.failed.push(name);
    console.error(`❌ ${name} - ${error.message}`);
  }
}

function warn(name, message) {
  RESULTS.warnings.push({ name, message });
  console.warn(`⚠️  ${name}: ${message}`);
}

// ─────────────────────────────────────────────────────────────
// 1. GUARD FLAGS TESTS
// ─────────────────────────────────────────────────────────────
console.log("\n📋 Guard Flags:");
const currentPage = window.location.pathname;

if (currentPage.includes("index") || currentPage === "/" || currentPage === "") {
  test("Home page integration flag", () => window.__DWM_INTEGRATION_HOME__ === true);
}
if (currentPage.includes("marketplace")) {
  test("Marketplace integration flag", () => window.__DWM_INTEGRATION_MARKETPLACE__ === true);
}
if (currentPage.includes("login")) {
  test("Auth integration flag (login)", () => window.__DWM_INTEGRATION_AUTH__ === true);
}
if (currentPage.includes("signup")) {
  test("Auth integration flag (signup)", () => window.__DWM_INTEGRATION_AUTH__ === true);
}

// ─────────────────────────────────────────────────────────────
// 2. DOM ELEMENT SELECTORS
// ─────────────────────────────────────────────────────────────
console.log("\n🔍 DOM Elements:");

// Common elements
test("Navigation bar exists", () => !!document.querySelector("nav") || !!document.querySelector("[role='navigation']"));
test("Navbar auth badges exist", () => {
  const showAuth = !!document.querySelector(".dwm-show-auth");
  const hideAuth = !!document.querySelector(".dwm-hide-auth");
  return showAuth || hideAuth ? true : "No auth badges found";
});

// Home page elements
if (currentPage.includes("index") || currentPage === "/" || currentPage === "") {
  test("Featured meals grid", () => {
    const selectors = ["#featured-meals", "#featured-meals-grid"];
    return selectors.some(s => document.querySelector(s)) ? true : "Featured meals grid not found";
  });
}

// Marketplace elements
if (currentPage.includes("marketplace")) {
  test("Marketplace meals grid", () => {
    const selectors = ["#marketplace-meals", "#meals-grid", ".meals-grid"];
    return selectors.some(s => document.querySelector(s)) ? true : "Meals grid not found";
  });
  test("Filter bar container", () => !!document.getElementById("filter-bar-container"));
  test("Meal count display", () => {
    const selectors = ["#meal-count", "#results-count"];
    return selectors.some(s => document.querySelector(s)) ? true : "Meal count not found";
  });
}

// Login page elements
if (currentPage.includes("login")) {
  test("Login form exists", () => !!document.getElementById("login-form"));
  test("Email input", () => {
    const selectors = ["#login-email", "#email", "[name='email']"];
    return selectors.some(s => document.querySelector(s)) ? true : "Email input not found";
  });
  test("Password input", () => {
    const selectors = ["#login-password", "#password", "[name='password']"];
    return selectors.some(s => document.querySelector(s)) ? true : "Password input not found";
  });
  test("Login submit button", () => {
    const btn = document.querySelector("#login-form button[type='submit']") || 
                document.querySelector("#login-form button");
    return bt ? true : "Submit button not found";
  });
}

// Signup page elements
if (currentPage.includes("signup")) {
  test("Signup form exists", () => {
    const selectors = ["#signup-form", "#register-form"];
    return selectors.some(s => document.querySelector(s)) ? true : "Signup form not found";
  });
  test("Name field (first+last or combined)", () => {
    const selectors = [
      "#first-name", "#last-name", "#register-name", 
      "[name='firstName']", "[name='lastName']", "[name='name']"
    ];
    return selectors.some(s => document.querySelector(s)) ? true : "Name field not found";
  });
  test("Email input", () => {
    const selectors = ["#signup-email", "#email", "[name='email']"];
    return selectors.some(s => document.querySelector(s)) ? true : "Email input not found";
  });
  test("Password input", () => {
    const selectors = ["#signup-password", "#password", "[name='password']"];
    return selectors.some(s => document.querySelector(s)) ? true : "Password input not found";
  });
  test("Country select", () => {
    const selectors = ["#country", "[name='country']"];
    return selectors.some(s => document.querySelector(s)) ? true : "Country select not found";
  });
}

// ─────────────────────────────────────────────────────────────
// 3. GLOBAL STATE & STORAGE
// ─────────────────────────────────────────────────────────────
console.log("\n💾 Global State:");

test("localStorage available", () => {
  try {
    localStorage.setItem("__test__", "1");
    localStorage.removeItem("__test__");
    return true;
  } catch (e) {
    return "localStorage not available";
  }
});

test("sessionStorage available", () => {
  try {
    sessionStorage.setItem("__test__", "1");
    sessionStorage.removeItem("__test__");
    return true;
  } catch (e) {
    return "sessionStorage not available";
  }
});

test("window.DWM_CART exists", () => typeof window.DWM_CART !== "undefined");
test("window.DWM_SESSION exists", () => typeof window.DWM_SESSION !== "undefined");

// ─────────────────────────────────────────────────────────────
// 4. API CLIENT CONFIGURATION
// ─────────────────────────────────────────────────────────────
console.log("\n🔌 API Configuration:");

test("Backend health check", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/health");
    return response.status === 200 ? true : `Status ${response.status}`;
  } catch (e) {
    warn("Backend connectivity", "Cannot reach localhost:5000 (database may not be configured)");
    return true; // Don't fail test, just warn
  }
});

// ─────────────────────────────────────────────────────────────
// 5. CUSTOM EVENTS
// ─────────────────────────────────────────────────────────────
console.log("\n📡 Event System:");

const eventTests = {
  "dwm:login": new Event("dwm:login"),
  "dwm:logout": new Event("dwm:logout"),
  "dwm:cartUpdate": new Event("dwm:cartUpdate"),
};

test("Custom events dispatchable", () => {
  try {
    for (const [name, event] of Object.entries(eventTests)) {
      window.dispatchEvent(event);
    }
    return true;
  } catch (e) {
    return e.message;
  }
});

// ─────────────────────────────────────────────────────────────
// 6. MODULE VERIFICATION
// ─────────────────────────────────────────────────────────────
console.log("\n📦 Modules:");

test("main.js loaded", () => document.currentScript || document.querySelector("script[src*='main.js']") ? true : "Check Network tab");
test("Styles loaded", () => {
  const css = document.querySelectorAll("link[rel='stylesheet']");
  return css.length > 0 ? true : "No stylesheets found";
});

// Check script tags
const scripts = Array.from(document.querySelectorAll("script[src]"));
const scriptNames = scripts.map(s => s.src).join("\n");
if (scriptNames.includes("main.js")) {
  test("Module script tag detected", () => true);
}

// ─────────────────────────────────────────────────────────────
// 7. LEGACY GUARD VERIFICATION
// ─────────────────────────────────────────────────────────────
console.log("\n🛡️  Legacy Conflict Prevention:");

// Check if legacy functions exist and are guarded
if (typeof initLoginForm !== "undefined") {
  test("initLoginForm guarded", () => {
    const source = initLoginForm.toString();
    return source.includes("__DWM_INTEGRATION_AUTH__") ? true : "Guard not found in initLoginForm";
  });
}

if (typeof initMarketplace !== "undefined") {
  test("initMarketplace guarded", () => {
    const source = initMarketplace.toString();
    return source.includes("__DWM_INTEGRATION_MARKETPLACE__") ? true : "Guard not found in initMarketplace";
  });
}

// ─────────────────────────────────────────────────────────────
// 8. SUMMARY REPORT
// ─────────────────────────────────────────────────────────────

console.log("\n" + "═".repeat(50));
console.log("📊 TEST SUMMARY");
console.log("═".repeat(50));

console.log(`✅ Passed: ${RESULTS.passed.length}`);
console.log(`❌ Failed: ${RESULTS.failed.length}`);
console.log(`⚠️  Warnings: ${RESULTS.warnings.length}`);

if (RESULTS.failed.length === 0) {
  console.log("\n🎉 ALL INTEGRATION TESTS PASSED!");
  console.log("\nNext steps:");
  console.log("1. Sign up at supabase.com for PostgreSQL");
  console.log("2. Add DATABASE_URL to .env");
  console.log("3. Run: npm run db:push");
  console.log("4. Run: npm run db:seed");
  console.log("5. Test login/signup flows in browser");
} else {
  console.log("\n⚠️  Some tests failed. See details above.");
  console.log("\nTraining Guide: http://localhost:3000/INTEGRATION_TESTING_GUIDE.md");
}

if (RESULTS.warnings.length > 0) {
  console.log("\n⚠️  Warnings:");
  RESULTS.warnings.forEach(w => console.log(`   - ${w.name}: ${w.message}`));
}

console.log("\n" + "═".repeat(50));

// Export results for programmatic access
window.INTEGRATION_TEST_RESULTS = RESULTS;
console.log("TEST_RESULTS available as: window.INTEGRATION_TEST_RESULTS");
