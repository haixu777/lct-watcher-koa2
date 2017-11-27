const AppSys = require('../models/appSys');

exports.getList = async(ctx, next) => {
  try {
    let res = await AppSys.getList();
    ctx.body = res;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

exports.getTree = async(ctx, next) => {
  try {
    let res = await AppSys.getList();
    let resObj = res.map((app) => {
      return Object.assign(
        {},
        {
          id: app.id,
          name: app.name,
          children: app.modules ? app.modules.map((module) => {
            return Object.assign(
              {},
              {
                id: module.id,
                name: module.name
              }
            )
          }) : []
        }
      )
    })
    ctx.body = resObj;
  } catch(err) {
    console.log(err);
    throw err;
  }
}
