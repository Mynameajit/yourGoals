// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRWFDuln7nyLnKnl7dp5G456wefN3i1Cs",
  authDomain: "todolist-7d371.firebaseapp.com",
  projectId: "todolist-7d371",
  storageBucket: "todolist-7d371.firebasestorage.app",
  messagingSenderId: "232614687940",
  appId: "1:232614687940:web:41b6d55f4b9b6093798591",
  measurementId: "G-7XBZEEFDWS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const realtimeDB = getDatabase(app)





