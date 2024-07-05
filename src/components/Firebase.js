import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBekAv2ys13m4BHwjkIyScxJMDZ9LzDmWA",
  authDomain: "zaio--clone-66bbe.firebaseapp.com",
  projectId: "zaio--clone-66bbe",
  storageBucket: "zaio--clone-66bbe.appspot.com",
  messagingSenderId: "96248144002",
  appId: "1:96248144002:web:810fb5415e1601aea5949b",
  measurementId: "G-DGJFXMXTXE",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
