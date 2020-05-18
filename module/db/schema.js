const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

let collection={
    /**
   * @博客管理
   */
  blog: new Schema(
    {
      ObjectId: Schema.Types.ObjectId,
      user_id: Schema.Types.ObjectId,
      title: { type: String, default: "" },
      content: { type: String, default: "" },
      group_id: {
        type: Schema.Types.ObjectId,
        ref: "group",
      },
      // tag:[Schema.Types.ObjectId],
      tag:[{type:Schema.Types.ObjectId,ref:"blog_tags"}],  //包含 标签ID列表
      isReproduced: { type: Number, default: 0 },
      isShow: { type: Number, default: 1 },
      reproduceUrl:String,
      author: String,
      writer: String,
      remark: String, //备注
    },
    {
      versionKey: false,
      index: true,
      collection: "blog",
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    }
  ),
    /**
   * @通用分组
   */
  group: new Schema(
    {
      ObjectId: Schema.Types.ObjectId,
      user_id: Schema.Types.ObjectId,
      name: { type: String },
      description: { type: String },
      groupType: { type: Number }, // 2为 网址收藏  1 为 日记本 3为博客 
    },
    {
      versionKey: false,
      index: true,
      collection: "group",
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    }
  ),
  /**
   * @博客标签
   */
  blog_tags: new Schema(
    {
      ObjectId: Schema.Types.ObjectId,
      user_id: Schema.Types.ObjectId,
      name: String,
      color: String,
    },
    {
      versionKey: false,
      index: true,
      collection: "blog_tags",
      timestamps: {
        createdAt: true,
        updatedAt: true,
      },
    }
  ),
}

module.exports = {
    collections: collection,
    group:mongoose.model("model",collection['group']),
    blog: mongoose.model("blog", collection["blog"]),
    blog_tags: mongoose.model("blog_tags", collection["blog_tags"])
  };
  