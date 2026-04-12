// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdzUjXbFEXvDl9tUoHa5wC6vmyyIWB1XI",
  authDomain: "edu-app-auth-7f45e.firebaseapp.com",
  projectId: "edu-app-auth-7f45e",
  storageBucket: "edu-app-auth-7f45e.firebasestorage.app",
  messagingSenderId: "989167551103",
  appId: "1:989167551103:web:7a6ee2a28ac9745ae1754a",
  measurementId: "G-EDM6B2EGB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)