// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, where, query,} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const searchres = document.getElementById('searchres');
const findLocation = () =>{
    if(document.getElementById('searchBox').value){
        document.getElementById("searchres-cont").style = "display: flex; flex-direction: column" ;
        searchres.innerHTML="<h1>Getting Your Location.....</h1>";
        const apikey = "27a5029be3254c65a7c378f128e24c51";
        const success = (position) =>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
            .then(response => response.json()).then(response =>{
                let allDetails = response.results[0].components;
                console.table(allDetails);
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                searchres.innerHTML ='<video class="yourlocvid" width="100%" height="190px"  loop autoplay><source src="./img/waiting.mp4" type="video/mp4">Your browser does not support the video tag. </video>'+ "</div>"+"<div><h5>Your Location</h5></div>"+ "<div><h4>Area:  </h4>"+"<p>"+allDetails.neighbourhood+"</p></div>"+"<div><h4>Road:  </h4>"+"<p>"+allDetails.road+"</p></div>"+"<div><h4>Pin Code: </h4>"+"<p>"+allDetails.postcode+"</p></div>"+'<div><h4>Current Time: </h4>'+'<p>' +time+'</p>'+'</div>'
                // searchres.innerHTML = "<h2>Area:  </h2>"+allDetails.neighbourhood+"<h2>Road:  </h2>"+allDetails.road+"<h2>Pin Code: </h2>"+allDetails.postcode
            }).catch(()=>{
                console.log("Something went wrong");
            });
            getLoc();
    }
    const error = () =>{
        searchres.innerHTMl = '<h1>Cannot get the location of the user</h1>';
    }
    navigator.geolocation.getCurrentPosition(success,error);
    }
    else{
        alert("Enter the Bus Number")
    }
}
const search_but = document.getElementById("search_but");
if(search_but)
search_but.addEventListener('click',findLocation);




// Reading the data of Bus 

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
const db = getFirestore(app);
const docRef = collection(db,"buses");
const docSnap = await getDocs(docRef);
function getLoc(){
    var found = 0;
    const search_text = document.getElementById("searchBox").value;
    const buslocres = document.getElementById("buslocres");
    if(docSnap!=null){
        docSnap.forEach(doc => {
            if(search_text==doc.id){
                found = 1;
                console.log(search_text)
                buslocres.innerHTML ='<video class="buslocvid" width="100%" height="190px"  loop autoplay> <source src="./img/busarrival.mp4" type="video/mp4">Your browser does not support the video tag.</video>' +"</div>"+"<div><h5>Bus Location</h5></div>"+ "<div><h4>Area:  </h4>"+"<p>"+doc.data().Area+"</p></div>"+"<div><h4>Road:  </h4>"+"<p>"+doc.data().Road+"</p></div>"+"<div><h4>Pin Code: </h4>"+"<p>"+doc.data().Pin+"</p></div>"+'<div><h4>Last Updated Time: </h4>'+'<p>' +doc.data().Time+'</p>'+'</div>'
            }
        });
        if(found == 0)
            alert("Sorry, Bus is not available right now!");
    }
    else{
        console.log("Data not Found!");
    }
              
}