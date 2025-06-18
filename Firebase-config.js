// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJd9K1AvGVpFSHqnnRLZoMHBgJ_mI-g8w",
  authDomain: "blogs-c2b99.firebaseapp.com",
  projectId: "blogs-c2b99",
  storageBucket: "blogs-c2b99.firebasestorage.app",
  messagingSenderId: "257289178798",
  appId: "1:257289178798:web:42cdbcb2c7a90bdd02273f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new  GoogleAuthProvider();

