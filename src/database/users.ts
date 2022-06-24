export const Sequelize = require("sequelize");

export const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

export const Users = sequelize.define("users", {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timestamps: false
});