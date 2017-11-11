const Strategy = require('../models/strategy');

//获取待添加的strategy
exports.getAddList = async(ctx, next) => {
  try {
    let res = await Strategy.getAdd();
    ctx.msg = '待添加strategy获取成功';
    ctx.body = res;
  } catch(err) {
    ctx.msg = '待添加strategy获取失败';
    throw err;
  }
}

//获取待修改的strategy
exports.getModifyList = async(ctx, next) => {
  try {
    let res = await Strategy.getModify();
    ctx.msg = '待修改的strategy获取成功';
    ctx.body = res;
  } catch(err) {
    ctx.msg = '待修改的strategy获取失败';
    throw err;
  }
}

//获取待删除的strategy
exports.getDelList = async(ctx, next) => {
  try {
    let res = await Strategy.getDel();
    ctx.msg = '待删除的strategy获取成功';
    ctx.body = res;
  } catch(err) {
    ctx.msg = '待删除的strategy获取失败';
    throw err;
  }
}

//更新已添加的strategy
exports.doneAdd = async(ctx, next) => {
  try {
    let res = await Strategy.doneAdd(ctx.request.body);
    if (res[0] == 0 && res.length == 1) {
      ctx.msg = 'strategy添加失败，无匹配strategy'
    } else {
      ctx.msg = 'strategy添加,更新成功';
    }
    ctx.body = res;
  } catch(err) {
    ctx.msg = 'strategy添加,更新失败';
    ctx.body = err;
  }
}

//更新已修改的strategy
exports.doneModify = async(ctx, next) => {
  try {
    let res = await Strategy.doneModify(ctx.request.body);
    if (res) {
      ctx.msg = 'strategy修改,更新成功';
    } else {
      ctx.msg = 'strategy修改失败，无匹配strategy'
    }
    ctx.body = res;
  } catch(err) {
    ctx.msg = 'strategy修改,更新失败';
    ctx.body = err;
  }
}

//删除strategy
exports.doneDel = async(ctx, next) => {
  try {
    let res = await Strategy.doneDel(ctx.request.body);
    if (res) {
      ctx.msg = 'strategy删除成功';
    } else {
      ctx.msg = 'strategy删除失败，无匹配strategy';
    }
    ctx.body = res;
  } catch(err) {
    console.log(err);
    ctx.msg = 'strategy删除失败';
    ctx.body = err;
  }
}

// ------------  对内接口 start -----------------

exports.getStatus = async(ctx, next) => {
  try {
    let res = await Strategy.getStatus();
    ctx.body = res
  } catch(err) {
    console.log(err)
    ctx.body = err;
  }
}

exports.getList = async(ctx, next) => {
  try {
    let res = await Strategy.list(ctx.query);
    ctx.body = res;
  } catch(err) {
    console.log(err);
    ctx.body = err;
  }
}

exports.add = async(ctx, next) => {
  try {
    let res = await Strategy.add(ctx.request.body);
    ctx.body = res;
    ctx.msg = '策略标记添加成功'
  } catch(err) {
    console.log(err);
    ctx.body = err;
  }
}

exports.update = async(ctx, next) => {
  try {
    let res = await Strategy.modify(ctx.request.body);
    ctx.body = res;
    ctx.msg = '策略标记修改成功'
  } catch (e) {
    console.log(e);
    ctx.body = e;
  }
}

exports.del = async(ctx, next) => {
  try {
    let res = await Strategy.del(ctx.request.body);
    ctx.body = res;
    ctx.msg = '策略标记删除成功'
  } catch(err) {
    console.log(err);
    ctx.body = err;
  }
}

// ------------  对内接口 end -----------------
