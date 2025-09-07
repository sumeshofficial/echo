import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "blog-application-d350b.firebaseapp.com",
  projectId: "blog-application-d350b",
  storageBucket: "blog-application-d350b.firebasestorage.app",
  messagingSenderId: "233682820907",
  appId: "1:233682820907:web:668ad2bb80f6ad40dfef6e",
  measurementId: "G-J9DGN2TQ2L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db};
