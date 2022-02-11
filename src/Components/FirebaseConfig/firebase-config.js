import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANotUygJIFW-LSgRja08wDzz539Xc72qA",
  authDomain: "yooda-hostel-9f3cc.firebaseapp.com",
  databaseURL: "https://yooda-hostel-9f3cc-default-rtdb.firebaseio.com",
  projectId: "yooda-hostel-9f3cc",
  storageBucket: "yooda-hostel-9f3cc.appspot.com",
  messagingSenderId: "974350397740",
  appId: "1:974350397740:web:3b46d3542eb80fc1e13c89"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export const db = getFirestore();
  
  export const database = getDatabase(app);