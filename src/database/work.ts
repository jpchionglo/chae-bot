export const Sequelize = require("sequelize");

export const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

export const Work = sequelize.define("daily", {
  userId: { type: Sequelize.STRING, unique: true },
  lastDaily: Sequelize.STRING,
  lastWork: Sequelize.STRING,
});
