const API_KEY = process.env.API_KEY;
let coordInput = document.getElementsByTagName('input');

//fetching data from coords input
async function getCoordPollution (lat, lon) {
  let response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`);
  if(response.status == 200){
    let result = await response.json();
    console.log(result);
    let city = result.data.city;
    alert(city.name);
  } else {
    console.log(`Error ${response.status}: ${response.message}`);
  }
}

//fetching data from city input
async function getCityPollution(city) {
  let response = await fetch(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  let result = await response.json();
  if(response.status == 200 && result.status == 'ok') {
    alert(result.data.city.name);
  } else if (result.status == 'error'){
    console.log(`${result.status}: ${result.data}`);
    alert(`Unfortunately we have no datas for ${city} station (incredible but true), insert coords to see datas from the nearest station or try with another city. Go check https://waqi.info/ to see`)
  } else {
    console.log(response.status);
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
  let latitude;
  let longitude;
  function success (pos) {
   let crd = pos.coords;
   coordInput[0].value = `${crd.latitude}`;
   coordInput[1].value = `${crd.longitude}`;
   latitude = coordInput[0].value;
   longitude = coordInput[1].value;
   getCoordPollution(latitude, longitude);
  };
  function error (err){
   console.log(`Alert! Error: ${err.code}, ${err.message}`);
  }
 navigator.geolocation.getCurrentPosition(success, error);
}

//data output from somewhere coords input
let getSomewhereCoords = document.querySelector("#getSomewhereCoords");
getSomewhereCoords.onclick = () => {
  let latitude = coordInput[0].value;
  let longitude = coordInput[1].value;
  getCoordPollution(latitude, longitude);
}
