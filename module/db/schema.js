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
    blog: mongoose.model("blog", collection["blog"]),
    blog_tags: mongoose.model("blog_tags", collection["blog_tags"])
  };
  