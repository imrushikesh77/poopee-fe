// App.jsx
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import ToiletFinder from "./pages/ToiletFinder";
import AddToilet from "./pages/AddToilet";
import HowToUse from "./pages/HowToUse";
import ModeToggle from "./components/ModeToggle";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-700">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                🚽 Poopee
              </Link>
            </nav>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<ToiletFinder />} />
              <Route path="/add-toilet" element={<AddToilet />} />
              <Route path="/how-to-use" element={<HowToUse />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;