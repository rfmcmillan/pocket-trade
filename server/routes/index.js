const router = require("express").Router();

const { default: axios } = require("axios");
const { alpaca } = require("../alpaca");
const {
  models: { Position, FutureOrder },
} = require("../db");

router.get("/account", async (req, res, next) => {
  try {
    const account = await alpaca.getAccount();
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.get("/positions", async (req, res, next) => {
  try {
    const positions = await Position.findAll({ order: ["name"] });
    res.send(positions);
  } catch (error) {
    next(error);
  }
});

router.put("/positions/:id", async (req, res, next) => {
  try {
    const position = await Position.findByPk(req.params.id);
    const updated = await position.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://paper-api.alpaca.markets/v2/orders",
      {
        headers: {
          "APCA-API-KEY-ID": process.env.API_KEY,
          "APCA-API-SECRET-KEY": process.env.API_SECRET,
        },
      }
    );
    const orders = response.data;

    res.send(orders);
  } catch (error) {
    if (error) console.log("error with orders get route");
    next(error);
  }
});

router.get("/orders/all", async (req, res, next) => {
  try {
    const response = await alpaca.getOrders({ status: "all" });
    res.send(response);
  } catch (error) {
    if (error) console.log("error with get all orders get route");
    next(error);
  }
});

router.post("/orders", async (req, res, next) => {
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

router.post("/futureOrders", async (req, res, next) => {
  try {
    const { monthFrequency } = req.body;
    let date = Date.now();
    const futureOrders = [];
    for (let i = 0; i <= 12; i += monthFrequency) {
      date += 86400000 * 30 * monthFrequency;
      const newDate = new Date(date);
      const time = newDate.getTime();
      const returnDate = new Date(time);
      const futureOrder = await FutureOrder.create({ date: returnDate });
      futureOrders.push(futureOrder);
    }
    res.send(futureOrders);
  } catch (error) {
    next(error);
  }
});

router.get("/portfolio/history", async (req, res, next) => {
  try {
    // const portfolioHistory = await alpaca.getPortfolioHistory("1M");
    const portfolioHistory = await axios.get(
      "https://paper-api.alpaca.markets/v2/account/portfolio/history",
      {
        headers: {
          "APCA-API-KEY-ID": process.env.API_KEY,
          "APCA-API-SECRET-KEY": process.env.API_SECRET,
        },
        params: { period: "1D", timeframe: "15Min" },
      }
    );

    res.send(portfolioHistory.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
