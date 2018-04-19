var router = require('koa-router')();
const multer = require('koa-multer');
const upload = multer({dest: 'public/snapshot'})

router.post('/snapshot', upload.single('snapshot'), async (ctx) => {
    try {
      ctx.msg = '快照上传成功'
      ctx.body = 'success'
    } catch (err) {
      ctx.msg = '快照上传失败'
      ctx.body = 'error'
    }
})

module.exports = router;
