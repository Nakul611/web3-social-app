import React, { useState, useEffect } from "react";
import WalletConnect from "./WalletConnect";

const Navbar = ({ setIsConnected }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  // Apply the theme on first render
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex justify-between items-center shadow-md transition duration-300">
      <h1 className="text-xl font-bold">Web3 Social App</h1>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        <WalletConnect setIsConnected={setIsConnected} />
      </div>
    </nav>
  );
};

export default Navbar;
