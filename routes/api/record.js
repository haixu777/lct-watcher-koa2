var router = require('koa-router')();
var alert_controller = require('../../app/controllers/alert');

router.get('/list', alert_controller.getList);

module.exports = router;
