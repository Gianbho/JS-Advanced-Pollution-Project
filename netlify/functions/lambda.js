const fetch = require('node-fetch');
// async function cityFetch() {
//   let fetchy = await fetch('/.netlify/functions/giorgio');
//       city = await fetchy.json();
// }

exports.handler = async event => {
  const API_KEY =  process.env.API_KEY;
  let CITY = process.env.CITY;
  const response = await fetch(`https://api.waqi.info/feed/${CITY}/?token=${API_KEY}`);
  const data = await response.json();

  const pass = (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  };

  return pass(data);
}
