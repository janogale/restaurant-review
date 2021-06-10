import React, { createContext, useReducer, useContext } from "react";

// initialized global store

export const AppContent = createContext();

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      window.sessionStorage.setItem("accessToken", action.payload.accessToken);
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case "logout": {
      // clear session data
      window.sessionStorage.removeItem("accessToken");
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case "signup": {
      const newState = { ...state, ...action.payload };
      return newState;
    }

    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    appName: "Restuarant Review",
    token: null,
    isAdmin: false,
    isLoggedIn: false,
  });

  return (
    <AppContent.Provider value={{ state, dispatch }}>
      {children}
    </AppContent.Provider>
  );
};

export const AppState = () => useContext(AppContent);

export default AppContextProvider;
