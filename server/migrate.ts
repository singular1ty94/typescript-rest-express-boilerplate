import * as Umzug from "umzug";
import { sequelize } from "./db";

const umzug = new Umzug({
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize
  },

  // see: https://github.com/sequelize/umzug/issues/17
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor, // DataTypes
      () => {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        );
      }
    ],
    path: __dirname + "/migrations",
    pattern: /\.js$/
  }
});

export { umzug };
