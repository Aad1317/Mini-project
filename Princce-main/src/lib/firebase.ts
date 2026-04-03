import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm5TSdwDC1zciy9glG4iHAkCkNvBj_xew",
  authDomain: "college-connect-4057c.firebaseapp.com",
  projectId: "college-connect-4057c",
  storageBucket: "college-connect-4057c.firebasestorage.app",
  messagingSenderId: "926363959127",
  appId: "1:926363959127:web:8bfc1c1cae558833c7c812",
  measurementId: "G-G0MZLEDB47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);

export default app;
