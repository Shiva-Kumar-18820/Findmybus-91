const firebaseConfig = {
    apiKey: "AIzaSyDjLYj1-0lCvUbAwkEOQ4DvfXRfPtBGkjY",
    authDomain: "findmybus-28b79.firebaseapp.com",
    databaseURL: "https://findmybus-28b79-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "findmybus-28b79",
    storageBucket: "findmybus-28b79.appspot.com",
    messagingSenderId: "442494983414",
    appId: "1:442494983414:web:650557da355cc8f05b60d7"
  };
// import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, where, query} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const btn = document.getElementById("submit_button");


btn.addEventListener('click',async (e)=>{
    e.preventDefault();   
    const name = document.getElementById("name").value;
    const Phn = document.getElementById("Phn").value;
    const email = document.getElementById("email").value;
    const msg = document.getElementById("msg").value;
    await setDoc(doc(db, "Queries", email), {
        "Name" : name,
        "Phone Number" : Phn,
        "Email" : email,
        "Message ":msg
    });
    alert("Successfully Received your Query! We'll get back soon.");
})