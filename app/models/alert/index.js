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
  fix_time: Sequelize.DATE(6),
  app_id: Sequelize.INTEGER,
  module_id: Sequelize.INTEGER,
  metric: Sequelize.STRING,
  desc: Sequelize.STRING,
  CPU: Sequelize.TEXT,
  MEMORY: Sequelize.TEXT,
  DISK: Sequelize.TEXT,
  net: Sequelize.TEXT,
  strategy_id: Sequelize.INTEGER,
  snapshot: Sequelize.STRING,
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
    fix_time: null,
    app_id: reqObj.app_id,
    module_id: reqObj.module_id,
    metric: reqObj.metric,
    desc: reqObj.desc,
    CPU: reqObj.CPU,
    MEMORY: reqObj.MEMORY,
    DISK: reqObj.DISK,
    strategy_id: reqObj.strategy_id,
    snapshot: reqObj.snapshot || null,
    fixed: 0
  })
  return db;
};

module.exports.cancel = async(reqObj) => {
  let data = await Alert.update(
    {
      fixed: 1,
      fix_time: new Date()
    },
    {
      where: {
        app_id: reqObj.app_id,
        module_id: reqObj.module_id,
        metric: reqObj.metric,
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
      app_id: reqObj.app_id || {[Op.ne]: null},
      fixed: (reqObj.status == -1) ? {[Op.ne]: null} : reqObj.status,
      time: reqObj.timeStart ? {
        $gte: new Date(reqObj.timeStart),
        $lte: new Date(reqObj.timeEnd)
      } : {[Op.ne]: null}
    },
    order: [
      ['time', 'DESC']
    ],
    include: [
      {
        model: Module,
        attributes: ['name'],
        include: [{model: App, attributes: ['name'], required: true}],
        required: true
      }
    ]
  });
  return data;
}

// ------------  对内接口 end -----------------
