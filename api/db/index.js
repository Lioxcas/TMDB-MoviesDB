const Sequelize = require("sequelize");

const database = "vmynsdmg";
const username = "vmynsdmg";
const password = "ZkfRcUrHLz-xLd4ZmbKRNCl6LjX91azE";
const host = "motty.db.elephantsql.com";
const port = 5432;
const url =
  "postgres://vmynsdmg:ZkfRcUrHLz-xLd4ZmbKRNCl6LjX91azE@motty.db.elephantsql.com/vmynsdmg";

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
  port: port,
  logging: false,
});

module.exports = db;
