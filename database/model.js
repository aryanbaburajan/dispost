const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let post = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  { collection: "posts" }
);

module.exports = mongoose.model("posts", post);
