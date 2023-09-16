// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
//import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC63zsvf6pW44D-noWkiHUzK1l8jg8aAOk",
  authDomain: "studenttest-39ac7.firebaseapp.com",
  projectId: "studenttest-39ac7",
  storageBucket: "studenttest-39ac7.appspot.com",
  messagingSenderId: "905945294593",
  appId: "1:905945294593:web:6519044c6c523a39b91d00",
  measurementId: "G-N5N8HNJ8C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db