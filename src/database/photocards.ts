export const Sequelize = require("sequelize");

export const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

export const Photocards = sequelize.define("photocards", {
  cardId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  imageUrl: Sequelize.STRING,
  cost: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  rarity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  era: {
    type: Sequelize.STRING,
  },
  set: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});
