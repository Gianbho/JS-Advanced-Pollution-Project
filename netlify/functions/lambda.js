const fetch = require('node-fetch');
import {city};
// async function cityFetch() {
//   let fetchy = await fetch('/.netlify/functions/giorgio');
//       city = await fetchy.json();
// }

exports.handler = async event => {
  const API_KEY =  process.env.API_KEY;

  const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  const data = await response.json();

  const pass = (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  };

  return pass(data);
}
