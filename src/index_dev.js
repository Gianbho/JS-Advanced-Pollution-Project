const API_KEY = process.env.API_KEY;
let coordInput = document.getElementsByTagName('input');

//fetching data from coords input
async function getCoordPollution (lat, lon) {
  let response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`);
  if(response.status == 200){
    let result = await response.json();
    let city = result.data.city;
    alert(city.name);
    // coordInput[0].value = '';
    // coordInput[1].value = '';
  } else {
    console.log(`Error ${response.status}: ${response.message}`);
  }
}

//fetching data from city input
async function getCityPollution(city) {
  let response = await fetch(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  if(response.status == 200) {
    let result = await response.json();
    alert(result.data.city.name);
  } else {
    console.log(`Err ${response.status}: ${response.message}`);
  }
}

// data output from city input
let getCity = document.querySelector('#getCity');
getCity.onclick = () => {
  let city = coordInput[2].value;
  getCityPollution(city);
}

//data output from user coords input
let getLocalCoords = document.getElementById('getLocalCoords');
getLocalCoords.onclick = async function getCoord(){
 function success (pos) {
   let crd = pos.coords;
   coordInput[0].value = `${crd.latitude}`;
   coordInput[1].value = `${crd.longitude}`;
   latitude = coordInput[0].value;
   longitude = coordInput[1].value;
 };
 function error (err){
  console.log(`Alert! Error: ${err.code}, ${err.message}`);
 }
 navigator.geolocation.getCurrentPosition(success, error);
 let latitude;
 let longitude;
 setTimeout(() => getCoordPollution(latitude, longitude), 300);
}

//data output from somewhere coords input
let getSomewhereCoords = document.querySelector("#getSomewhereCoords");
getSomewhereCoords.onclick = () => {
  let latitude = coordInput[0].value;
  let longitude = coordInput[1].value;
  getCoordPollution(latitude, longitude);
}
