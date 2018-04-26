import * as Sequelize from "sequelize";
import { config } from "../config";

const db = new Sequelize("postgres", "postgres", config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: "postgres"
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
});

export default db;
