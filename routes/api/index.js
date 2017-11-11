var router = require('koa-router')();
var user_router = require('./user_router');
var home_router = require('./home');
var record_router = require('./record');
var strategy_router = require('./strategy');

router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use('/home', home_router.routes(), home_router.allowedMethods());
router.use('/record', record_router.routes(), record_router.allowedMethods());
router.use('/strategy', strategy_router.routes(), strategy_router.allowedMethods());


module.exports = router;
