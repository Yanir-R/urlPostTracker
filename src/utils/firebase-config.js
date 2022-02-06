// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlfVr6P1T7P426xB0i0Rpp5EaLG2aZCt4",
  authDomain: "url-tracker-7d619.firebaseapp.com",
  projectId: "url-tracker-7d619",
  storageBucket: "url-tracker-7d619.appspot.com",
  messagingSenderId: "882458182856",
  appId: "1:882458182856:web:9d3d1da4722447eb4211fd",
  measurementId: "G-TQ1C0WEX1J"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);