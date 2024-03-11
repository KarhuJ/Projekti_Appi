import React, { createContext, useState, useEffect } from "react";

// Create a new context
export const AppContext = createContext();

// Create a context provider component
export const AppContextProvider = ({ children }) => {
  
  const [alert, setAlert] = useState("ALKU");

  useEffect(() => {
    console.log("ALERT:", alert);
  }, [alert]);

  const setAlertValue = (value) => {
    setAlert(value);
    console.log("ALERT1:", value);
  };

  // Return the context provider with the provided children
  return (
    <AppContext.Provider
      value={{
        alert,
        setAlertValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
