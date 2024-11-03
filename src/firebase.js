import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.enc.FIREBASE_API_KEY,
  authDomain: "lexicon-e6a9b.firebaseapp.com",
  databaseURL: "https://lexicon-e6a9b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lexicon-e6a9b",
  storageBucket: "lexicon-e6a9b.appspot.com",
  messagingSenderId: "395249391062",
  appId: "1:395249391062:web:caae4512bc193f422d4077",
  measurementId: "G-3TVP76577H"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
