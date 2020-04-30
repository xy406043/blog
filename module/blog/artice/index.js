const DB = require("../../db/db-mongoose");
const mongoose = require("mongoose");
const user_id = "5e23c08c52ea0031189b9f34"; //myId

module.exports = {
  /**
   * @文章列表
   */
  getArticleList: async (ctx, content) => {
    let condition = {
      user_id: user_id,
    };
    console.log(condition);
    let result = (await DB.find("blog", condition)).result;
    ctx.body = {
      code: 0,
      result: result,
    };
  },
  /**
   * @获取文章标签
   */
  getTags: async (ctx) => {
    let result = (await DB.find("blog_tags",{})).result;
    ctx.body = {
      code: 0,
      result: result,
    };
  },
  /**
   * @获取文章分类
   */
  getGroupList: async (ctx) => {
      let  condition = {
          user_id:user_id,
          groupType:3
      }
    let result = (await DB.find("group",condition)).result;
    ctx.body = {
      code: 0,
      result: result,
    };
  },
  /**
   * @文章归档
   */
  getArchiveList: async (ctx) => {},
};
