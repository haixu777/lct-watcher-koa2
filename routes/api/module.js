var router = require('koa-router')();
var module_controller = require('../../app/controllers/module');

router.post('/del', module_controller.del);
router.post('/add', module_controller._add);

module.exports = router;
