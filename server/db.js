const axios = require("axios");
const { alpaca } = require("./alpaca");
const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/robo_advisor_db",
  {
    logging: false,
  }
);
const { DataTypes } = Sequelize;

const Position = db.define("position", {
  name: { type: DataTypes.STRING },
  symbol: { type: DataTypes.STRING },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  alpacaData: {
    type: DataTypes.JSON,
  },
  tgtPct: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currPct: {
    type: DataTypes.FLOAT,
  },
});

Position.prototype.calcCurrPct = async function () {
  const account = await alpaca.getAccount();
  const { long_market_value } = account;
  this.currPct = (this.alpacaData.market_value * 1) / (long_market_value * 1);
  this.save();
};

Position.addHook("afterCreate", (position) => {
  position.calcCurrPct();
});

const FutureOrder = db.define("futureOrder", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
  },
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const positions = (
    await axios.get("https://paper-api.alpaca.markets/v2/positions", {
      headers: {
        "APCA-API-KEY-ID": process.env.API_KEY,
        "APCA-API-SECRET-KEY": process.env.API_SECRET,
      },
    })
  ).data;

  const vtAlpaca = positions.filter((position) => {
    return position.symbol === "VT";
  })[0];
  const bndwAlpaca = positions.filter((position) => {
    return position.symbol === "BNDW";
  })[0];
  const vnqAlpaca = positions.filter((position) => {
    return position.symbol === "VNQ";
  })[0];
  const gldAlpaca = positions.filter((position) => {
    return position.symbol === "GLD";
  })[0];

  const vt = await Position.create({
    name: "Vanguard Total World Stock ETF",
    symbol: "VT",
    alpacaData: vtAlpaca,
    tgtPct: 0.7,
  });
  const bndw = await Position.create({
    name: "Vanguard Total World Bond ETF",
    symbol: "BNDW",
    alpacaData: bndwAlpaca,
    tgtPct: 0.2,
  });
  const vnq = await Position.create({
    name: "Vanguard Real Estate ETF",
    alpacaData: vnqAlpaca,
    symbol: "VNQ",
    tgtPct: 0.05,
  });
  const gld = await Position.create({
    name: "SPDR Gold Trust ETF",
    alpacaData: gldAlpaca,
    symbol: "GLD",
    tgtPct: 0.05,
  });

  return { positions: { vt, bndw, vnq, gld } };
};

module.exports = { db, syncAndSeed, models: { Position, FutureOrder } };
