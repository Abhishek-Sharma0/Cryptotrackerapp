import firebaseConfig from "./config/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);