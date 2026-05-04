import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const colors = {
    primary: darkMode ? "#000000" : "#4DA3FF",
    background: darkMode ? "#000000" : "#F5F5F5",
    card: darkMode ? "#1C1C1E" : "#FFFFFF",
    text: darkMode ? "#FFFFFF" : "#333333",
    border: darkMode ? "#333333" : "#E0E0E0",
    danger: "#E53935",
    white: "#FFFFFF",
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
