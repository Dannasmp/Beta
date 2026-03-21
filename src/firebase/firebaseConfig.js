// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5IFUhENrInTfhXrIpTS0IhhYUEKyK9xE",
  authDomain: "rest-api-f7140.firebaseapp.com",
  projectId: "rest-api-f7140",
  storageBucket: "rest-api-f7140.firebasestorage.app",
  messagingSenderId: "751752722815",
  appId: "1:751752722815:web:6ec39e414c05a6de0b424a",
  measurementId: "G-V86EV92R37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);