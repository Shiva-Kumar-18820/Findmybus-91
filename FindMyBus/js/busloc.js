// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, where, query,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjLYj1-0lCvUbAwkEOQ4DvfXRfPtBGkjY",
  authDomain: "findmybus-28b79.firebaseapp.com",
  databaseURL: "https://findmybus-28b79-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "findmybus-28b79",
  storageBucket: "findmybus-28b79.appspot.com",
  messagingSenderId: "442494983414",
  appId: "1:442494983414:web:650557da355cc8f05b60d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const docRef = collection(db,"buses");
const docSnap = await getDocs(docRef);
