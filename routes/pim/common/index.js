const router = require('koa-router')()
const common = require("../../../module/common/index")

router.get("/tell",common.tell)
module.exports =router.routes()