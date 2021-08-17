const API_KEY = process.env.API_KEY;
import _ from 'lodash';
import 'bootstrap';
import 'jquery';
import $ from 'jquery';
import './style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// stupid hack so that leaflet's images work after going through webpack
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
});

let coordInput = document.getElementById('input-form').elements;
let cityInput = document.getElementById('city-selector');
let dataOutputs = document.getElementById('output-form').elements;
let dataParagraph = document.querySelector('#data-description');

let leafletMap = document.querySelector('map');


//creating map
var map = L.map(leafletMap, {minZoom:3, maxZoom: 8}).setView([45.4654219, 9.1859243], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let mapMarker;

//updating and showing datas on the map
function mapUpdate(lat, lon, city) {
  map.setView([lat, lon], 7);
  if(mapMarker){
    map.removeLayer(mapMarker);
  }
  mapMarker = L.marker([lat, lon]).addTo(map)
  .bindPopup(`${city}`)
  .openPopup();
  map.addLayer(mapMarker);
}

//getting datas by clicking on map

map.on('click', async function(e) {
    let lat = e.latlng.lat;
    let lon = e.latlng.lng;
    console.log(lat, lon);
    let response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`);
    if(response.status == 200) {
      let result = await response.json();
      dataHandler(result);
    } else {
      alert('error handling');
    };
});

function invalidValues(n) {
  coordInput[n].classList.add('input-error');
  coordInput[n].value = 'Invalid value!';
  coordInput[n].onfocus = () => {
    coordInput[n].classList.remove('input-error');
    if(coordInput[n].value == 'Invalid value!') coordInput[n].value = '';
  }
}

function emptyFields(input, n) {
  input[n].classList.add('input-error');
  input[n].value = 'Empty field!';
  input[n].onfocus = () => {
    input[n].classList.remove('input-error');
    if(input[n].value == 'Empty field!') input[n].value = '';
 }
}

//add fetch data handler

function dataHandler(json) {
  const data = _.get(json, "data")
  const city = _.get(json, "data.city.name");
  const coords = _.get(json, "data.city.geo");
  const aqi = _.get(json, "data.aqi");
  const timeZone = _.get(json, "data.time.tz");
  const lat = coords[0];
  const lon = coords[1];
  const pm25 =_.get(json, "data.forecast.daily.pm25[0].avg")
  const pm10 =_.get(json, "data.forecast.daily.pm10[0].avg")
  const uvi = _.get(json, "data.forecast.daily.uvi[0].max")

  coordInput[0].value = coords[0];
  coordInput[1].value = coords[1];
  dataOutputs[0].value = city;
  dataOutputs[1].value = `${coords[0]}, ${coords[1]}`;
  dataOutputs[2].value = pm25;
  dataOutputs[3].value = pm10;
  dataOutputs[4].value = aqi;
  dataOutputs[5].value = uvi;

  mapUpdate(lat, lon, city);
  dataParagraph.innerHTML= ``;
  $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
}

//fetching data from city input
async function getCityPollution(city) {
  let response = await fetch(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  let result = await response.json();
  if(response.status == 200 && result.status == 'ok') {
    await dataHandler(result);
    console.log(result);
  } else if (result.status == 'error'){
    console.log(`${result.status}: ${result.data}`);
    setTimeout(() => {
      dataParagraph.innerHTML = `Unfortunately we have no datas for ${city} station (incredible but true),
                                insert coords to see datas from the nearest station or try with another city. Go check https://waqi.info/ to see`;
      $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
     }
    , 50);
  } else {
    console.log(response.status);
  }
}

// getting city input and call output function
let getCity = document.querySelector('#getCity');
getCity.onclick = async () => {
  let city = cityInput.value;
  if (!city) {
    emptyFields(cityInput, 0);
  } else {
    await getCityPollution(city);
    coordInput[0].value = '';
    coordInput[1].value = '';
  }
}

//fetching data from coords input
async function getCoordPollution (lat, lon) {
  let response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${API_KEY}`);
  if(response.status == 200){
    let result = await response.json();
    cityInput.value = '';
    await dataHandler(result);
    console.log(result);
  } else {
    dataParagraph.innerHTML = `Error ${response.status}: ${response.message}`;
    $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
  }
}

//getting user coords input and call output function
let getLocalCoords = document.getElementById('getLocalCoords');
getLocalCoords.onclick = async function getCoord(){
  let latitude;
  let longitude;
  function success (pos) {
   let crd = pos.coords;
   // coordInput[0].value = `${crd.latitude}`;
   // coordInput[1].value = `${crd.longitude}`;
   latitude = crd.latitude;
   longitude = crd.longitude;
   getCoordPollution(latitude, longitude);
  };
  function error (err){
   console.log(`Alert! Error: ${err.code}, ${err.message}`);
  }
 navigator.geolocation.getCurrentPosition(success, error);
}

//gets somewhere coords input and call output function
let getSomewhereCoords = document.querySelector("#getSomewhereCoords");
getSomewhereCoords.onclick = () => {
  let latitude = coordInput[0].value;
  let longitude = coordInput[1].value;
  if(!latitude || !longitude) {
    if(!latitude && !longitude) {
      emptyFields(coordInput, 0);
      emptyFields(coordInput, 1);
    } else if (!latitude){
      emptyFields(coordInput, 0)
    } else if (!longitude) {
      emptyFields(coordInput, 1);
    }
  } else if ((+latitude > 90 || +latitude < -90) && (+longitude > 180 || +longitude < -180)) {
    invalidValues(0);
    invalidValues(1);
  } else if (+longitude > 180 || +longitude < -180) {
    invalidValues(1);
  } else if (+latitude > 90 || +latitude < -90) {
    invalidValues(0);
  } else {
    getCoordPollution(latitude, longitude);
  }
}
