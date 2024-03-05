// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3_yGzs9dANP4WM2ZnnKLyB3mqJzxeUOc",
  authDomain: "entertainment-app-87f62.firebaseapp.com",
  projectId: "entertainment-app-87f62",
  storageBucket: "entertainment-app-87f62.appspot.com",
  messagingSenderId: "56743764636",
  appId: "1:56743764636:web:ddb739791609563775c359",
  measurementId: "G-3Q98TS2448"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app)