var router = require('koa-router')();
var strategy_controller = require('../../app/controllers/strategy');

router.get('/list', strategy_controller.getList);
router.post('/add', strategy_controller.add);
router.post('/update', strategy_controller.update);
router.post('/del', strategy_controller.del);

module.exports = router;
