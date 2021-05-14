const router = require('express').Router();

const { default: axios } = require('axios');
//routes go here - these will be for your api routes
const { alpaca } = require('../alpaca');
const {
  models: { Position },
} = require('../db');
const { api_key, api_secret } = require('../../env.js');

//I don't manipulate the Account data at all so I just access it directly through a get route and present it
router.get('/account', async (req, res, next) => {
  try {
    const account = await alpaca.getAccount();
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.get('/positions', async (req, res, next) => {
  try {
    const positions = await Position.findAll({ order: ['name'] });
    res.send(positions);
  } catch (error) {
    next(error);
  }
});

router.put('/positions/:id', async (req, res, next) => {
  try {
    const position = await Position.findByPk(req.params.id);
    const updated = await position.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

router.get('/orders', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://paper-api.alpaca.markets/v2/orders',
      {
        headers: {
          'APCA-API-KEY-ID': api_key,
          'APCA-API-SECRET-KEY': api_secret,
        },
      }
    );
    const orders = response.data;

    res.send(orders);
  } catch (error) {
    if (error) console.log('error with orders get route');
    next(error);
  }
});
router.get('/orders/all', async (req, res, next) => {
  try {
    //
    const response = await alpaca.getOrders({ status: 'all' });

    res.send(response);
  } catch (error) {
    if (error) console.log('error with get all orders get route');
    next(error);
  }
});

router.post('/orders', async (req, res, next) => {
  try {
    const { symbol, notional, side, type, time_in_force } = req.body;
    alpaca.createOrder({
      symbol,
      notional,
      side,
      type,
      time_in_force,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
