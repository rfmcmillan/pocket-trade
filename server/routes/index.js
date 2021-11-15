const router = require('express').Router();

const { default: axios } = require('axios');
//routes go here - these will be for your api routes
// const schedule = require('node-schedule');
const { alpaca } = require('../alpaca');
const {
  models: { Position, FutureOrder },
} = require('../db');
// const { API_KEY, API_SECRET } = require('../../env');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');

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
          'APCA-API-KEY-ID': process.env.API_KEY,
          'APCA-API-SECRET-KEY': process.env.API_SECRET,
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

router.get('/futureOrders', async (req, res, next) => {
  try {
    const response = await futureOrders.findAll();
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/futureOrders', async (req, res, next) => {
  try {
    const { monthFrequency } = req.body;
    let date = Date.now();
    const futureOrders = [];
    for (let i = 0; i <= 12; i += monthFrequency) {
      date += 86400000 * 30 * monthFrequency;
      const newDate = new Date(date);
      const time = newDate.getTime();
      const returnDate = new Date(time);
      const stringDate = returnDate.toString();
      const futureOrder = await FutureOrder.create({ date: returnDate });
      futureOrders.push(futureOrder);
    }
    res.send(futureOrders);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
