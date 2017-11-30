const Module = require('../models/module');
const Strategy = require('../models/strategy');

exports.del = async(ctx, next) => {
  try {
    let _s = await Strategy.moduleDel(ctx.request.body);
    let _m = await Module.del(ctx.request.body);
    ctx.body = '模块删除成功!';
  } catch(err) {
    console.log(err);
    throw err;
  }
}

exports._add = async(ctx, next) => {
  try {
    let res = await Module._add(ctx.request.body);
  } catch(err) {
    console.log(err)
    throw err
  }
}
