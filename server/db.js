const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/robo_advisor_db',
  {
    logging: false,
  }
);
const { DataTypes } = Sequelize;

const Position = db.define('position', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  alpaca: {
    type: DataTypes.JSON,
  },
  targAllocation: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  currAllocation: {
    type: DataTypes.NUMBER,
  },
});
