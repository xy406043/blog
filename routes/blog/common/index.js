const router= require("koa-router")()
const common = require("../../../module/blog/common/index")
router.get("/tell",common.tell)
module.exports = router.routes()