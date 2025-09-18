import { useEffect, useReducer } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "./AuthContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "currentUser":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "userLoggedIn":
      return {
        ...state,
        userLoggedIn: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser: null,
    userLoggedIn: false,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  const initializeUser = (user) => {
    if (user) {
      dispatch({ type: "currentUser", payload: { ...user } });
      dispatch({ type: "userLoggedIn", payload: true });
    } else {
      dispatch({ type: "currentUser", payload: null });
      dispatch({ type: "userLoggedIn", payload: false });
    }
    dispatch({ type: "loading", payload: false });
  };

  const value = {
    currentUser: state.currentUser,
    userLoggedIn: state.userLoggedIn,
    loading: state.loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};
