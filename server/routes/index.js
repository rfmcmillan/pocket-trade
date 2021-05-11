const router = require('express').Router();

//routes go here - these will be for your api routes
const { alpaca } = require('../alpaca');
const {
  models: { Position },
} = require('../db');

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

module.exports = router;
