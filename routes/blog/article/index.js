const router = require("koa-router")()
const article = require("../../../module/blog/artice")

router.post("/getArticleList",article.getArticleList)
router.post("/getArchiveList",article.getArchiveList)
router.get("/getTags",article.getTags)
router.get("/getGroupList",article.getGroupList)
module.exports = router.routes()