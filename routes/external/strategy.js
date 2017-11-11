var router = require('koa-router')();
var strategy_controller = require('../../app/controllers/strategy');

router.get('/addList', strategy_controller.getAddList);
router.get('/modifyList', strategy_controller.getModifyList);
router.get('/delList', strategy_controller.getDelList);

router.post('/doneAdd', strategy_controller.doneAdd);
router.post('/doneModify', strategy_controller.doneModify);
router.post('/doneDel', strategy_controller.doneDel);

module.exports = router;
