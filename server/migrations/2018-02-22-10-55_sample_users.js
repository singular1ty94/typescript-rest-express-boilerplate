const Sequelize = require("sequelize");

module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.query(`insert into users (id, email, "createdAt", "updatedAt") values ('1f8cfae8-0ef6-45bf-a323-5f7eca364f16', 'test-email@hotmail.com', '2018-04-26T06:53:36+00:00', '2018-04-26T06:53:36+00:00')`);
  }
};
