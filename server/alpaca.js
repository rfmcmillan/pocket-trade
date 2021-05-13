const Alpaca = require('@alpacahq/alpaca-trade-api');
const { api_key, api_secret, base_url } = require('../env.js');

const alpaca = new Alpaca({
  keyId: api_key,
  secretKey: api_secret,
  paper: true,
  usePolygon: false,
});

module.exports = { alpaca };
