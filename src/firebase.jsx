// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjRpPodXfi5yH_cnmFUQjnQ-3anAybyqI",
  authDomain: "finance-tracker-5fd80.firebaseapp.com",
  projectId: "finance-tracker-5fd80",
  storageBucket: "finance-tracker-5fd80.firebasestorage.app",
  messagingSenderId: "196495497892",
  appId: "1:196495497892:web:2b1bd72eff4ab628e6e431",
  measurementId: "G-H7D5QVMG5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {  db, auth, provider, doc, setDoc};