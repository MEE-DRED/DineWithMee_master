import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Navbar from './Navbar.jsx';


function App() {
  

  return (
  
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Navbar />
            <main className="flex-1 pt-20">
             <Routes>
              {/* <Route path="/" element={<Home />} /> */}
            </Routes>
            </main>
            
          </div>
        </Router>
    
  );
}

export default App;
