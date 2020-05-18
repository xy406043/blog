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
    let aggregate =[
      {
        $lookup:{
          from:"blog",
          localField:"_id",
          foreignField:"tag",
          as:"blogList"
        }
      }
    ]
    let result = (await DB.where3("blog_tags",aggregate)).result;
    ctx.body = {
      code: 0,
      result: result,
    };
  },
  getEveryTagInfo: async ctx =>{
    let  aggregate2 =[
      {
        $unwind:"$tag"  //扁平化 blog集合中各文档 内tag数组拆分，一个文档拆分为多个文档
      },
      {
        $group:{   // 根据   拆分后的  tag进行分组，统计各个分组的数量
          _id:"$tag",
          count:{$sum:1}
        }
      },
      {
        $lookup:{          //根据各个  标签ID  跨表获取各个 标签的详细信息
          from:"blog_tags",
          localField:"_id",
          foreignField:"_id",
          as:"info"
        }
      },
      {
        $unwind:"$info"
      }

    ]
    let result2 =(await DB.where3("blog",aggregate2)).result
    ctx.body = {
      code: 0,
      result: result2,
    };
  },
  /**
   * @获取文章分类
   */
  getGroupList: async (ctx) => {
    //只需要计数
      let aggregate =[
        {
          $match:{
            user_id:mongoose.Types.ObjectId(user_id), //!！！！ ObjectId
            groupType:3
          }
        },
        // {
        //   $lookup:{
        //       from:"blog",
        //       localField:"_id",
        //       foreignField:"group_id",
        //       as:"blog"
        //   }
        // }
      ]
    let result = (await DB.where3("group",aggregate)).result;
    ctx.body = {
      code: 0,
      result: result,
    };
    
  },
  getEveryGroupInfo: async (ctx) => {
    let  aggregate2 =[
      {
        $match:{
          user_id:mongoose.Types.ObjectId(user_id), //!！！！ ObjectId
        }
      },
      {
        $group:{
          _id:"$group_id",
          count:{$sum:1}
        }
      },
      {
        $lookup:{
          from:"group",
          localField:"_id",
          foreignField:"_id",
          as:"info"
        }
      },
      {
        $unwind:"$info"
      }
    ]
    let result2 =(await DB.where3("blog",aggregate2)).result
    ctx.body = {
      code: 0,
      result: result2,
    };

  },
  /**
   * @文章归档
   */
  getArchiveList: async (ctx) => {},
};
