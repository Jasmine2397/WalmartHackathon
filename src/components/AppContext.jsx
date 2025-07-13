import React, { createContext, useState, useContext } from 'react';

// Create the context object
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  // Default user structure
  const [user, setUser] = useState({
    name: 'Dev Singh',
    role: 'admin', // change to 'delivery', 'inventory', 'driver', etc. as needed
    id: 'user123'
  });

  // Add more global state here if needed later (e.g. metrics, notifications)

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);