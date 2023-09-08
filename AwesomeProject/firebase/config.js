// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPW3qj_zv2fjGhPyzWYTIZ9d2i5MqZU-s",
  authDomain: "test-43b1e.firebaseapp.com",
  projectId: "test-43b1e",
  storageBucket: "test-43b1e.appspot.com",
  messagingSenderId: "1071834808823",
  appId: "1:1071834808823:web:6e5c578a82dba00d6d6ef2",
  measurementId: "G-FQG42JHTC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)