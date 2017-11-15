var router = require('koa-router')();
var strategy_controller = require('../../app/controllers/appSys');

router.get('/list', strategy_controller.getList);

module.exports = router;
