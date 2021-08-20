const fetch = require('node-fetch');

exports.handler = async event => {
  const API_KEY =  process.env.API_KEY;
  let response = await fetch(`https://api.waqi.info/feed/?=rome/?token=${API_KEY}`);
  let data = await response.json();

  const pass = (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  };

  return pass(data);
}
