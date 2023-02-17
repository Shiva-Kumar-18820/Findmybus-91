import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, where, query,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// import { email } from "./auth2.js";
const trackres = document.getElementById('track-res');
const firebaseConfig = {
    apiKey: "AIzaSyDjLYj1-0lCvUbAwkEOQ4DvfXRfPtBGkjY",
    authDomain: "findmybus-28b79.firebaseapp.com",
    databaseURL: "https://findmybus-28b79-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "findmybus-28b79",
    storageBucket: "findmybus-28b79.appspot.com",
    messagingSenderId: "442494983414",
    appId: "1:442494983414:web:650557da355cc8f05b60d7",
    measurementId: "G-JYDFZP1CXJ"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const findLocation = () =>{
//     document.getElementById("track-res").style.display = "flex" ;
//     document.getElementById('track-res').style = "flex-direction: column;background-color: antiquewhite;";
//     track_but.style.display = "none"
//     trackres.innerHTML="<h1>Getting Your Location.....</h1>";
//     const apikey = "27a5029be3254c65a7c378f128e24c51";
//     const success = (position) =>{
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
//         .then(response => response.json()).then(response =>  {
//             let allDetails = response.results[0].components;
//             console.table(allDetails);
//             trackres.innerHTML = '<div><img src="../img/bus-track.jpg"'+"</div>"+"<div><h5>Your Location</h5></div>"+ "<div><h4>Area:  </h4>"+"<p>"+allDetails.neighbourhood+"</p></div>"+"<div><h4>Road:  </h4>"+"<p>"+allDetails.road+"</p></div>"+"<div><h4>Pin Code: </h4>"+"<p>"+allDetails.postcode+"</p></div>"
//             // await setDoc(doc(db,"Users"),{
//             //     Latitude : latitude,
//             //     Longitude : longitude,
//             //     Area : allDetails.neighbourhood,
//             //     Road : allDetails.road,
//             //     Pin : allDetails.postcode,
//             // })
//         }).catch(()=>{
//             console.log("Something went wrong");
//         });

//         // console.log(email)

//     }
//     const error = () =>{
//         trackres.innerHTMl = '<h1>Cannot get the location of the user</h1>';
//     }
//     navigator.geolocation.getCurrentPosition(success,error);

// }
const busdiv = document.getElementById("busdiv")

async function findLocation(){
    const busno = document.getElementById('busno').value;

        
    if (busno) {
        busdiv.style.display = "none";
        document.getElementById('end-track').style.display="flex";
        document.getElementById("track-res").style.display = "flex" ;
        document.getElementById('updatetext').style.display = "block"
        document.getElementById('track-res').style = "flex-direction: column;background-color: antiquewhite;";
        track_but.style.display = "none"
        trackres.innerHTML="<h1>Getting Your Location.....</h1>";
        const apikey = "27a5029be3254c65a7c378f128e24c51";
        const success = (position) =>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
            .then(response => response.json()).then(response =>  {
                let allDetails = response.results[0].components;
                console.table(allDetails);
                trackres.innerHTML = '<div><img src="../img/bus-track.jpg"'+"</div>"+"<div><h5>Your Location</h5></div>"+ "<div><h4>Area:  </h4>"+"<p>"+allDetails.neighbourhood+"</p></div>"+"<div><h4>Road:  </h4>"+"<p>"+allDetails.road+"</p></div>"+"<div><h4>Pin Code: </h4>"+"<p>"+allDetails.postcode+"</p></div>"
                updateLoc(allDetails,latitude,longitude,busno)
            }).catch(()=>{
                console.log("Something went wrong");
            });
        }
        
        
        const error = () =>{
            trackres.innerHTMl = '<h1>Cannot get the location of the user</h1>';
        }
        navigator.geolocation.getCurrentPosition(success,error);
    } else {
        alert("Enter the Bus Number!")
    }

}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function updateLoc(allDetails,latitude,longitude,busno){
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    const data = {
        Latitude : latitude,
        Longitude : longitude,
        Area : allDetails.neighbourhood,
        Road : allDetails.road,
        Pin : allDetails.postcode,
        Time : time
    }
    await setDoc(doc(db,'buses',busno),data);
    console.log("Inside Update Location function Refresh Location will be called!")
    await delay(30000);
    refreshLoc(busno);
}

function refreshLoc(busno){
    const success = (position) =>{
        const apikey = "27a5029be3254c65a7c378f128e24c51";
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
        .then(response => response.json()).then(response =>  {
            let allDetails = response.results[0].components;
            console.table(allDetails);
            trackres.innerHTML = '<div><img src="../img/bus-track.jpg"'+"</div>"+"<div><h5>Your Location</h5></div>"+ "<div><h4>Area:  </h4>"+"<p>"+allDetails.neighbourhood+"</p></div>"+"<div><h4>Road:  </h4>"+"<p>"+allDetails.road+"</p></div>"+"<div><h4>Pin Code: </h4>"+"<p>"+allDetails.postcode+"</p></div>"
            console.log("Inside Refresh Location. Update Location Function will be called Now")
            updateLoc(allDetails,latitude,longitude,busno)
        }).catch(()=>{
            console.log("Something went wrong");
        });


    }
    const error = () =>{
        trackres.innerHTMl = '<h1>Cannot get the location of the user</h1>';
    }
    navigator.geolocation.getCurrentPosition(success,error);
}

const track_but = document.getElementById("start");
if(track_but)
track_but.addEventListener('click',findLocation);

const end_but = document.getElementById('end-track');
end_but.addEventListener('click',function() {
    document.getElementById("tracking").innerHTML = "<h1>Ending Location Tracking!</h1>"
    window.location.replace('../login.html');
})

