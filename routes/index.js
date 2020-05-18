const router = require('koa-router')()
const blog = require("./blog")

router.use("/blog",blog)


module.exports = router
