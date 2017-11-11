const DB = require('../../../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Module = require('../module');
const App = require('../appSys');

const Alert = DB.define('alert', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  ip: Sequelize.STRING,
  time: Sequelize.DATE(6),
  app_id: Sequelize.INTEGER,
  module_id: Sequelize.INTEGER,
  metric: Sequelize.STRING,
  desc: Sequelize.STRING,
  CPU: Sequelize.STRING,
  MEMORY: Sequelize.STRING,
  DISK: Sequelize.STRING,
  strategy_id: Sequelize.INTEGER,
  fixed: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  freezeTableName: true,
  underscored: true
});

Alert.belongsTo(Module);
Module.hasMany(Alert);
Module.belongsTo(App);
App.hasMany(Module);

module.exports = Alert;

module.exports.add = async(reqObj) => {
  let db = await Alert.create({
    ip: reqObj.ip,
    time: new Date(reqObj.time * 1000),
    app_id: reqObj.app_sys_id,
    module_id: reqObj.module_id,
    metric: reqObj.metric,
    desc: reqObj.desc,
    CPU: reqObj.CPU,
    MEMORY: reqObj.MEMORY,
    DISK: reqObj.DISK,
    strategy_id: reqObj.strategy_id
  })
  return db;
};

module.exports.cancel = async(reqObj) => {
  let data = await Alert.update(
    {
      fixed: 1
    },
    {
      where: {
        app_id: reqObj.app_sys_id,
        module_id: reqObj.module_id,
        metric: reqObj.metric
      }
    }
  )
  return data;
}

// ------------  对内接口 start -----------------

module.exports.list = async(reqObj) => {
  reqObj.currentPage--
  let data = await Alert.findAndCountAll({
    limit: Number(reqObj.perItem),
    offset: Number(reqObj.currentPage) * Number(reqObj.perItem),
    where: {
      app_id: reqObj.app_id || {[Op.ne]: null}
    },
    include: [
      {
        model: Module,
        attributes: ['name'],
        include: [{model: App, attributes: ['name']}]
      }
    ]
  });
  return data;
}

// ------------  对内接口 end -----------------
