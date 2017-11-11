var router = require('koa-router')();
var alert_controller = require('../../app/controllers/alert');

router.post('/push', alert_controller.notice);
router.post('/cancel', alert_controller.noticeCancel);

module.exports = router;
