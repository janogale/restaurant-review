import React, { createContext, useReducer, useContext } from "react";

// initialized global store

export const AppContent = createContext();

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      window.sessionStorage.setItem("accessToken", action.payload.accessToken);
      window.sessionStorage.setItem("fullName", action.payload.fullName);
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case "logout": {
      // clear session data
      window.sessionStorage.removeItem("accessToken");
      window.sessionStorage.removeItem("fullName");
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
    accessToken: null, 
  });

  React.useEffect(() => {
    const accessToken = window.sessionStorage.getItem("accessToken");
    const displayName = window.sessionStorage.getItem("fullName");

    if (accessToken && displayName) {
      dispatch({
        type: "login",
        payload: {
          accessToken: accessToken,
          isLoggedIn: true,
          fullName: displayName,
        },
      });
    }
  }, []);

  return (
    <AppContent.Provider value={{ state, dispatch }}>
      {children}
    </AppContent.Provider>
  );
};

export const AppState = () => useContext(AppContent);

export default AppContextProvider;
