const Alpaca = require('@alpacahq/alpaca-trade-api');
// const { API_KEY, API_SECRET } = require('../env/index.js');

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.API_SECRET,
  paper: true,
  usePolygon: false,
});

module.exports = { alpaca };
