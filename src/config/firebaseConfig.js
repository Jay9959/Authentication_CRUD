import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBQOO7eorTP7mMLrnKtqIYozsHd6OPHXPs",
  authDomain: "recipes-exam.firebaseapp.com",
  projectId: "recipes-exam",
  storageBucket: "recipes-exam.firebasestorage.app",
  messagingSenderId: "422292847658",
  appId: "1:422292847658:web:db6d945c7c467a22d6d753"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);