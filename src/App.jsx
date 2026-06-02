

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NutritionDashboard from "./components/NutritionDashboard.jsx";
import MealPlan from "./components/MealPlan.jsx";
import Healthprofile from "./components/Healthprofile.jsx";
import Consultations from "./components/Consultations.jsx";
import Orders from "./components/Orders.jsx";
import SecuritySettings from "./components/SecuritySettings.jsx";
import Subscriptions from "./components/Subscriptions.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent text-gray-900">
        <Routes>
          {/* Default Route falls back to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Core App Module Routes */}
          <Route path="/dashboard"     element={<NutritionDashboard />} />
          <Route path="/meals"         element={<MealPlan />} />
          <Route path="/healthprofile" element={<Healthprofile />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/orders"        element={<Orders />} />
          <Route path="/security"      element={<SecuritySettings />} />
          <Route path="/subscriptions" element={<Subscriptions />} />

          {/* Fallback Catch-all to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;