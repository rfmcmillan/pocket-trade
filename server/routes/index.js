const router = require('express').Router();

//routes go here - these will be for your api routes
const { alpaca } = require('../alpaca');

router.get('/account', async (req, res, next) => {
  try {
    const account = await alpaca.getAccount();
    console.log(account);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
