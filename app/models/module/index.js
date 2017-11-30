const DB = require('../../../config/database');
const Sequelize = require('sequelize');

const Module = DB.define('module', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  app_id: Sequelize.UUID
}, {
  freezeTableName: true,
  underscored: true
});

module.exports = Module;

module.exports.del = async(reqObj) => {
  let data = await Module.destroy({
    where: {
      id: reqObj.id
    }
  });
  return data;
}

module.exports._add = async(reqObj) => {
  let db = await Module.create({
    name: reqObj.moduleName,
    app_id: reqObj.appId
  });
  return db;
}
