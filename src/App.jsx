

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
 
// // ── Auth / onboarding pages ──────────────────────────────────────────────────
// import LandingPage        from "./components/LandingPage.jsx";
// import SignInPage         from "./components/SignInPage.jsx";
// import SignUpPage         from "./components/SignUpPage.jsx";
 
// // ── Core app pages ────────────────────────────────────────────────────────────
// import NutritionDashboard from "./components/NutritionDashboard.jsx";
// import MealPlan           from "./components/MealPlan.jsx";
// import Healthprofile      from "./components/Healthprofile.jsx";
// import Consultations      from "./components/Consultations.jsx";
// import Orders             from "./components/Orders.jsx";
// import SecuritySettings   from "./components/SecuritySettings.jsx";
// import Subscriptions      from "./components/Subscriptions.jsx";
// import AdminDashboard from "./components/AdminDashboard.jsx";
// import AdminMealManagement from "./components/AdminMealManager.jsx";
 
// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-transparent text-gray-900">
//         <Routes>
//           {/* ── Landing / Auth ───────────────────────────── */}
//           <Route path="/"              element={<LandingPage />} />
//           <Route path="/signin"        element={<SignInPage />} />
//           <Route path="/signup"        element={<SignUpPage />} />
 
//           {/* ── Core app pages ───────────────────────────── */}
//           <Route path="/dashboard"     element={<NutritionDashboard />} />
//           <Route path="/meals"         element={<MealPlan />} />
//           <Route path="/healthprofile" element={<Healthprofile />} />
//           <Route path="/consultations" element={<Consultations />} />
//           <Route path="/orders"        element={<Orders />} />
//           <Route path="/security"      element={<SecuritySettings />} />
//           <Route path="/subscriptions" element={<Subscriptions />} />

//           {/* ── Admin pages ───────────────────────────── */}
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/adminmealmgr" element={<AdminMealManager />} />
 
//           {/* ── Fallback → Landing ───────────────────────── */}
//           <Route path="*"              element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
 
// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Core App Module Components
import NutritionDashboard from "./components/NutritionDashboard.jsx";
import MealPlan from "./components/MealPlan.jsx";
import Healthprofile from "./components/Healthprofile.jsx";
import Consultations from "./components/Consultations.jsx";
import Orders from "./components/Orders.jsx";
import SecuritySettings from "./components/SecuritySettings.jsx";
import Subscriptions from "./components/Subscriptions.jsx";

// Auth / Landing Components
import LandingPage from "./components/LandingPage.jsx";
import SignInPage from "./components/SignInPage.jsx";
import SignUpPage from "./components/SignupPage.jsx";

// Admin Module Components
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminMealManager from "./components/AdminMealManager.jsx"; // Fixed variable name to match route
 
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent text-gray-900">
        <Routes>
          {/* ── Landing / Auth ───────────────────────────── */}
          <Route path="/"              element={<LandingPage />} />
          <Route path="/signin"        element={<SignInPage />} />
          <Route path="/signup"        element={<SignUpPage />} />
 
          {/* ── Core app pages ───────────────────────────── */}
          <Route path="/dashboard"     element={<NutritionDashboard />} />
          <Route path="/meals"         element={<MealPlan />} />
          <Route path="/healthprofile" element={<Healthprofile />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/orders"        element={<Orders />} />
          <Route path="/security"      element={<SecuritySettings />} />
          <Route path="/subscriptions" element={<Subscriptions />} />

          {/* ── Admin pages ───────────────────────────── */}
          <Route path="/admin"         element={<AdminDashboard />} />
          <Route path="/adminmealmgr"  element={<AdminMealManager />} /> {/* Now matches the import exactly */}
 
          {/* ── Fallback → Landing ───────────────────────── */}
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
 
export default App;