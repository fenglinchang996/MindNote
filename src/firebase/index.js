// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhzI1MLfGNsCQ7IgKJBNpyo3WOeAQ6GZU",
  authDomain: "mindnote-f39e9.firebaseapp.com",
  databaseURL: "https://mindnote-f39e9.firebaseio.com",
  projectId: "mindnote-f39e9",
  storageBucket: "mindnote-f39e9.appspot.com",
  messagingSenderId: "604443153991",
  appId: "1:604443153991:web:d4603eee71b70894698362",
  measurementId: "G-DBK1HHL4P8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Database
const db = firebase.firestore();
const DB = firebase.firestore;
// Auth
const auth = firebase.auth();

export { db, DB, auth };
