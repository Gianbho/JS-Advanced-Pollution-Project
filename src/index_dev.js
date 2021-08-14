const API_KEY = process.env.API_KEY;
import _ from 'lodash';
import bootstrap from 'bootstrap';
import jquery from 'jquery';
import css from './style.css';
let coordInput = document.getElementsByTagName('input');

//add fetch data handler

function dataHandler(json) {
  const data = _.get(json, "data")
  const city = _.get(json, "data.city");
  const coords = _.get(json, "data.city.geo");
  const pmVal = _.get(json, "data.aqi");

  coordInput[0].value = city.geo[0];
  coordInput[1].value = city.geo[1];
  coordInput[2].value = city.name;
}

//fetching data from coords input
async function getCoordPollution (lat, lon) {
  let response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`);
  if(response.status == 200){
    let result = await response.json();
    await dataHandler(result);
    alert(coordInput[2].value);
    console.log(result);
  } else {
    console.log(`Error ${response.status}: ${response.message}`);
  }
}

//fetching data from city input
async function getCityPollution(city) {
  let response = await fetch(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  let result = await response.json();
  if(response.status == 200 && result.status == 'ok') {
    dataHandler(result);
  } else if (result.status == 'error'){
    console.log(`${result.status}: ${result.data}`);
    coordInput[0].value = "";
    coordInput[1].value = "";
    setTimeout(() => alert(`Unfortunately we have no datas for ${city} station (incredible but true), insert coords to see datas from the nearest station or try with another city. Go check https://waqi.info/ to see`)
    , 150);
  } else {
    console.log(response.status);
  }
}

// getting city input and call output function
let getCity = document.querySelector('#getCity');
getCity.onclick = () => {
  let city = coordInput[2].value;
  getCityPollution(city);
}

//getting user coords input and call output function
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
