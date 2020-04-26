const router = require('koa-router')()
const common =require('./common/index')
router.use("/common",common)
module.exports = router.routes()