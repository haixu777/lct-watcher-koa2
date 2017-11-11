var router = require('koa-router')();
var alert_router = require('./alert');
var strategy_router = require('./strategy');

router.use('/alert', alert_router.routes(), alert_router.allowedMethods());
router.use('/strategy', strategy_router.routes(), strategy_router.allowedMethods());

module.exports = router;
