import city from 'src/index.js'
const fetch = require('node-fetch');

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
