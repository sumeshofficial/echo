import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          setCurrentUser(user);
          setUserLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("Google redirect error:", error);
      });

    return unsubscribe;
  }, []);

  const initializeUser = (user) => {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};