import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-800 via-gray-900 to-black text-white">
          <Navbar isConnected={isConnected} setIsConnected={setIsConnected} />
          <Routes>
            <Route path="/" element={<Home isConnected={isConnected} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
