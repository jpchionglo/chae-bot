export const Sequelize = require("sequelize");

export const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

export const UserPhotocards = sequelize.define("user_photocard", {
  userId: Sequelize.STRING,
  cardId: Sequelize.INTEGER,
  timestamps: false
});
