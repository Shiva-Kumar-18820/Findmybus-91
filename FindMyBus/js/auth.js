import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
   // const colRef = await collection(db,'users');
   // import { doc, setDoc,addDoc,collection } from "firebase/firestore"; 
//import { getFirestore } from "";

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
const name = document.getElementById('name');
const email = document.getElementById('email');
const bus = document.getElementById('bus');
const password = document.getElementById('pws');
const login = document.getElementById('login');

const auth = getAuth();
const db = getFirestore(app);

login.addEventListener('click',(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("Signed in!");
    db.collection('users').doc(user.uid).set({
        email:email.value,
    });
    window.location.replace('index.html');

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})