const DB = require('../../../config/database');
const Sequelize = require('sequelize');
const Module = require('../module');

const AppSys = DB.define('app', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  CODE: Sequelize.STRING
}, {
  freezeTableName: true,
  underscored: true
});

module.exports = AppSys;

module.exports.getList = async (reqObj) => {
  let data = AppSys.findAll({
    include: [
      {
        model: Module
      }
    ]
  });
  return data;
}
