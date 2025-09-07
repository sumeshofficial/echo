import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (
  username,
  email,
  password
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: username,
    });

    userCredential.user.displayName = username;

    return userCredential;
  } catch (error) {
    console.log(error.message);
  }
};

export const doSignInUserWithEmailAndPassword = async (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// auth.js
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Sign-in with Google error:", {
      code: error.code,
      message: error.message,
    });
    throw error;
  }
};

export const doSignOut = () => {
  try {
    return auth.signOut();
  } catch (error) {
    console.log(error.message);
  }
};

export const doPasswordReset = (email) => {
  try {
    return sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error.message);
  }
};

export const doPasswordChange = (password) => {
  try {
    return updatePassword(auth.currentUser, password);
  } catch (error) {
    console.log(error.message);
  }
};

export const doSendEmailVerification = () => {
  try {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
