const DB = require('../../../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Module = require('../module');
const App = require('../appSys');

const Strategy = DB.define('strategy', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  app_id: Sequelize.INTEGER,
  module_id: Sequelize.INTEGER,
  metric: Sequelize.STRING,
  end_point: Sequelize.STRING,
  operator: Sequelize.STRING,
  right_value: Sequelize.STRING,
  func: Sequelize.STRING,
  max_step: Sequelize.STRING,
  note: Sequelize.STRING,
  del_stat: Sequelize.INTEGER,
  update_stat: Sequelize.INTEGER,
  add_stat: Sequelize.INTEGER,
  status: Sequelize.INTEGER
}, {
  freezeTableName: true,
  underscored: true
});

Strategy.belongsTo(Module, {as: 'module'});
Module.hasMany(Strategy);
Module.belongsTo(App, {as: 'app'});
App.hasMany(Module);

module.exports = Strategy;

//获取未增加的strategy
module.exports.getAdd = async(reqObj) => {
  let data = await Strategy.findAll({
    where: {
      add_stat: 1
    }
  });
  return data;
};

//获取待修改的strategy
module.exports.getModify = async(reqObj) => {
  let data = await Strategy.findAll({
    where: {
      update_stat: 1
    }
  });
  return data;
};

//获取未删除的strategy
module.exports.getDel = async(reqObj) => {
  let data = await Strategy.findAll({
    where: {
      del_stat: 1
    }
  });
  return data;
}

//更新已增加的strategy
module.exports.doneAdd = async(reqObj) => {
  let data = await Strategy.update(
    {
      add_stat: 0
    },
    {
      where: {
        app_id: reqObj.app_sys_id,
        module_id: reqObj.module_id,
        metric: reqObj.metric,
        add_stat: 1
      }
    }
  );
  return data;
};

//更新已修改的strategy
module.exports.doneModify = async(reqObj) => {
  let data = await Strategy.update(
    {
      update_stat: 0
    },
    {
      where: {
        app_id: reqObj.app_sys_id,
        module_id: reqObj.module_id,
        metric: reqObj.metric,
        update_stat: 1
      }
    }
  );
  return data;
};

//更新已删除的strategy
module.exports.doneDel = async(reqObj) => {
  let data = await Strategy.destroy({
    where: {
      del_stat: 1,
      app_id: reqObj.app_sys_id,
      module_id: reqObj.module_id,
      metric: reqObj.metric
    }
  });
  return data;
};

// ------------  对内接口 start -----------------

module.exports.getStatus = async(reqObj) => {
  let data = await Strategy.findAll({
    include: [
      {
        model: Module,
        as: 'module',
        attributes: ['name'],
        include: [{model: App, as: 'app', attributes: ['name']}]
      }
    ],
    where: {
      status: 0
    },
    attributes: ['status', 'note']
  })
  return data
};

module.exports.list = async(reqObj) => {
  reqObj.currentPage--
  let data = await Strategy.findAndCountAll({
    limit: Number(reqObj.perItem),
    offset: Number(reqObj.currentPage) * Number(reqObj.perItem),
    where: {
      app_id: reqObj.app_id || {[Op.ne]: null}
    },
    include: [
      {
        model: Module,
        as: 'module',
        attributes: ['name'],
        include: [{model: App, attributes: ['name'], as: 'app'}]
      }
    ]
  });
  return data;
};

module.exports.add = async(reqObj) => {
  let db = await Strategy.create({
    app_id: reqObj.appId,
    module_id: reqObj.moduleId,
    metric: reqObj.metric,
    end_point: reqObj.endPoint,
    operator: reqObj.operator,
    right_value: reqObj.rightValue,
    func: reqObj.func,
    max_step: Number(reqObj.maxStep),
    note: reqObj.note,
    contact: reqObj.contact,
    email: reqObj.email,
    add_stat: 1
  })
  return db;
};

module.exports.modify = async(reqObj) => {
  let data = await Strategy.update(
    {
      update_stat: 1
    },
    {
      where: {
        id: reqObj.id
      }
    }
  )
  return data;
}

module.exports.del = async(reqObj) => {
  let data = await Strategy.update(
    {
      del_stat: 1
    },
    {
      where: {
        id: reqObj.id
      }
    }
  )
  return data;
}


// ------------  对内接口 end -------------------
