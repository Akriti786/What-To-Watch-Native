// import React, { createContext, useState } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => setIsDarkMode((prev) => !prev);

//   const theme = {
//     isDarkMode,
//     colors: {
//       background: isDarkMode ? "#121212" : "#ffffff",
//       text: isDarkMode ? "#ffffff" : "#000000",
//       card: isDarkMode ? "#1e1e1e" : "#f8f8f8",
//       border: isDarkMode ? "#333333" : "#cccccc",
//     },
//     toggleTheme,
//   };

//   return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
// };




import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? "#121212" : "#ffffff",
      text: isDarkMode ? "#ffffff" : "#000000",
      card: isDarkMode ? "#1e1e1e" : "#f8f8f8",
      border: isDarkMode ? "#333333" : "#cccccc",
      primary: isDarkMode ? "#bb86fc" : "#6200ee", // button background
      onPrimary: "#ffffff", // button text
    },
    toggleTheme,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
