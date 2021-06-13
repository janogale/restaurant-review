import React, { createContext, useReducer, useContext } from "react";

// initialized global store

export const AppContent = createContext();

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {

      // store login details to session
      window.sessionStorage.setItem("accessToken", action.payload.accessToken);
      window.sessionStorage.setItem("fullName", action.payload.fullName);
      window.sessionStorage.setItem("uid", action.payload.uid);

      const newState = { ...state, ...action.payload };
      return newState;
    }
    case "logout": {
      // clear session data
      window.sessionStorage.removeItem("accessToken");
      window.sessionStorage.removeItem("fullName");
      window.sessionStorage.removeItem("uid");

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
    const uid = window.sessionStorage.getItem("uid");

    if (accessToken && displayName) {
      dispatch({
        type: "login",
        payload: {
          accessToken: accessToken,
          isLoggedIn: true,
          fullName: displayName,
          uid: uid,
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
