var router = require('koa-router')();
var strategy_controller = require('../../app/controllers/strategy');

router.get('/currentStatus', strategy_controller.getStatus);

module.exports = router;
