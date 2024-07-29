// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue, update } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB84eZGOAVz0WpNKEI31lXqfkslZtsz8OI",
  authDomain: "travel-journal-authentic-4160c.firebaseapp.com",
  projectId: "travel-journal-authentic-4160c",
  storageBucket: "travel-journal-authentic-4160c.appspot.com",
  messagingSenderId: "808060214959",
  appId: "1:808060214959:web:b410b9b8ac06c0b4217e5a",
  databaseURL: "https://travel-journal-authentic-4160c-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the necessary services
export const auth = getAuth(app);
export const database = getDatabase(app);
export { ref, push, set, onValue, update };
