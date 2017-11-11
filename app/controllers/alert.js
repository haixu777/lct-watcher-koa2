// const ApiError = require('../error/ApiError');
// const ApiErrorNames = require('../error/ApiErrorNames');
import {isObjEmpty} from '../../utils';
const Alert = require('../models/alert');
import socket from '../../bin/www'

//保存报警数据并且通过socket通知前端
exports.notice = async(ctx, next) => {
  try {
    if (!isObjEmpty(socket)) {
      socket.socket.emit('notice', {aa: 11});
    }
    let res = await Alert.add(ctx.request.body);
    ctx.msg = '预警推送成功';
    ctx.body = {};
  } catch(err) {
    ctx.msg = '推送失败';
    throw err
  }
}

exports.noticeCancel = async(ctx, next) => {
  try {
    if (!isObjEmpty(socket)) {
      socket.socket.emit('noticeCancel');
    }
    let res = await Alert.cancel(ctx.request.body);
    ctx.msg = '预警取消成功';
  } catch(err) {
    ctx.msg = '预警取消失败';
    throw err
  }
}

// ------------  对内接口 start -----------------

exports.getList = async(ctx, next) => {
  try {
    let res = await Alert.list(ctx.query);
    ctx.body = res;
  } catch(err) {
    console.log(err);
    throw err
  }
}

// ------------  对内接口 end -----------------
