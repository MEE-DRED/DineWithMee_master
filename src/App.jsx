// import React, { useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home.jsx';
// import Navbar from './Navbar.jsx';


// function App() {
  

//   return (
  
//         <Router>
//           <div className="min-h-screen flex flex-col bg-gray-900 text-white">
//             <Navbar />
//             <main className="flex-1 pt-20">
//              <Routes>
//               {/* <Route path="/" element={<Home />} /> */}
//             </Routes>
//             </main>
            
//           </div>
//         </Router>
    
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NutritionDashboard from "./components/NutritionDashboard.jsx";
import MealPlan from "./components/MealPlan.jsx";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-transparent text-gray-900">
        <Routes>
          {/* Default Route falls back to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Core App Module Routes */}
          <Route path="/dashboard" element={<NutritionDashboard />} />
          <Route path="/meals" element={<MealPlan />} />
          
          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;