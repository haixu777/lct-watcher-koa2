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
