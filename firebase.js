// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApASOEkNPeP1qN6BI_6Hw_0hri3axYcd8",
  authDomain: "inv-management-ee2e5.firebaseapp.com",
  projectId: "inv-management-ee2e5",
  storageBucket: "inv-management-ee2e5.appspot.com",
  messagingSenderId: "375582154002",
  appId: "1:375582154002:web:27e2ed9e08e7249c3967cb",
  measurementId: "G-N9HS0K8GQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};
