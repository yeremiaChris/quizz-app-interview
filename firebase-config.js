// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

const config = {
  apiKey: "AIzaSyBCB2K_dCP3lGqhgP9x_h6cB98oxh7EuwI",
  authDomain: "process.env.FIREBASE_AUTH_DOMAIN",
  projectId: "quizz-app-937a5",
  storageBucket: "q uizz-app-937a5.appspot.com",
  messagingSenderId: "742475884891",
  appId: "1:742475884891:web:49ed941441fb8bb1e0527e",
  measurementId: "G-873G6ZNLBP",
};

// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGEING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
export const firebaseApp = initializeApp(config);
