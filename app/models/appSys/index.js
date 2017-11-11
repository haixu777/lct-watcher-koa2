const DB = require('../../../config/database');
const Sequelize = require('sequelize');

const AppSys = DB.define('app', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: Sequelize.STRING
}, {
  freezeTableName: true,
  underscored: true
});

module.exports = AppSys;
