
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyMDoq7Tz4hXUDntYhFxgRBGKfUXyPJtw",
  authDomain: "netflixgpt-8bc1a.firebaseapp.com",
  projectId: "netflixgpt-8bc1a",
  storageBucket: "netflixgpt-8bc1a.appspot.com",
  messagingSenderId: "929318534600",
  appId: "1:929318534600:web:185ff7d5e49895b4ff14fd",
  measurementId: "G-EQY221H33G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const provider = new GoogleAuthProvider();

export const auth = getAuth();