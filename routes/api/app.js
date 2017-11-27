var router = require('koa-router')();
var strategy_controller = require('../../app/controllers/appSys');

router.get('/list', strategy_controller.getList);
router.get('/tree', strategy_controller.getTree);

module.exports = router;
