# JS-Advanced-Pollution-Project for Start2Impact
<p align="center">
  <a href="https://github.com/Gianbho/JS-Advanced-Pollution-Project">
    <img src="dist/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">City Pollution Project</h3>

  <p align="center">
    Get AQI data for a location.
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

![Product Name Screen Shot](dist/screenshot.png)

This is a a simple web app that fetches Air Quality Index data from [AQICN](aqicn.org) via their free [API](https://aqicn.org/api/) and displays it.

The user can use the current geolocalized position, manually insert coordinates, get datas by a click on the map or manually insert a city and get datas from the nearest station (if there's one).

The API fetches data from the station that is nearest to the selected coordinates and shows a local map (screenshot above) and a forecast chart.

### Built With

* [jQuery](https://jquery.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Lodash](https://lodash.com/)
* [Leaflet](https://leafletjs.com/)
* [Dotenv](https://github.com/motdotla/dotenv)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/Gianbho/JS-Advanced-Pollution-Project.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```
   
3. Get a free API key at [Air Quality Open Data Platform](https://aqicn.org/data-platform/token/#/)

4. Rename the ".env.example" file in the root folder in ".env" and insert your API_KEY:

   ```sh
   API_KEY = 'ENTER YOUR API'
   ```
5. Delete "index.js" and rename "index_dev.js" into "index.js" and build from the source


   ```sh
   npm run build
   ```

6. Open build/index.html

## Usage

The "My coords" button geolocalizes the current position and relative datas in their fields.

"Somewhere coords" gets pollution datas from manually entered coordinates.

"City infos" gets pollution datas from manually entered station or city name.
 
Clicking on the map gets coordinates and return datas from the nearest station to the chosen point.

The API finds the station that is closest to the chosen coordinates or city and returns datas.

The map shows also where's the nearest station and it's name.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Gianluca Tramontano - gianluca.trm@gmail.com


## Acknowledgements

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Air Pollution: Real-time Air Quality Index (AQI)](https://aqicn.org/)

