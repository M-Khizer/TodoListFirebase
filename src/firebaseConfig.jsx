// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5MZNsi6SUouDRLwwdRPahfHPstl59GNE",
  authDomain: "todoapp-b3249.firebaseapp.com",
  projectId: "todoapp-b3249",
  storageBucket: "todoapp-b3249.appspot.com",
  messagingSenderId: "1082650677693",
  appId: "1:1082650677693:web:e98f1a0d75ed263f2042d4",
  measurementId: "G-GPVDFBQJ9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)

export {auth,firestore};