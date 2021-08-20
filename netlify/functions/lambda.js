const fetch = require('node-fetch');
// async function cityFetch() {
//   let fetchy = await fetch('/.netlify/functions/giorgio');
//       city = await fetchy.json();
// }

let city = process.env.CITY;
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
