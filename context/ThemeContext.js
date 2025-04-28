import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const theme = isDarkMode ? {
    backgroundColor: 'black',
    textColor: 'white',
    primaryColor: 'blue',
  } : {
    backgroundColor: 'white',
    textColor: 'black',
    primaryColor: 'red',
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 

export default ThemeContext;