const DB = require('../../../config/database');
const Sequelize = require('sequelize');

const Module = DB.define('module', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  app_id: Sequelize.UUID
}, {
  freezeTableName: true,
  underscored: true
});

module.exports = Module;
