import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB3jpDt1-hRMtL18vlhFMx_Y6WDzBY4Bco",
  authDomain: "authentication-2ca58.firebaseapp.com",
  projectId: "authentication-2ca58",
  storageBucket: "authentication-2ca58.firebasestorage.app",
  messagingSenderId: "210352750532",
  appId: "1:210352750532:web:d88f6c20d62f52f6b2ee91"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);