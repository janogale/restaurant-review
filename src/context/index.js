import React, { createContext, useReducer, useContext } from "react";

// initialized global store

export const AppContent = createContext();

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      console.log(action.payload);
      window.sessionStorage.setItem("accessToken", action.payload.accessToken);
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case "logout": {
      // clear session data
      window.sessionStorage.removeItem("accessToken");
      const newState = {
        ...state,
        accessToken: null,
        email: "",
        isLoggedIn: false,
      };

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
