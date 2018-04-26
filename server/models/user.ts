import { sequelize } from "../db";
import * as Sequelize from "sequelize";

const user = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default user;
