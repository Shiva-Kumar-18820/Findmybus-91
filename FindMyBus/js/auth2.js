 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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
 const auth = getAuth();

login.addEventListener('click', function() {
    const login = document.getElementById('login');
    var email = document.getElementById('email').value;
    const password = document.getElementById('pws').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.replace('../conductor.html');
        alert("Login Successful!")
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
});
