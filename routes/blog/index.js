const router = require('koa-router')()
const common = require("./common")
const article =require("./article")
router.use("/common",common)
router.use("/article",article)
module.exports =router.routes()