const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongoURL } = require("./config.json");

const posts = require("./database/model");

function createPost(title, content, username) {
  posts.insertMany({ title, content, username });
}

async function getRandomPost() {
  return await posts.aggregate([{ $sample: { size: 1 } }]);
}

function connectDB() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(mongoURL, connectionParams)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });
}

module.exports = { connectDB, createPost, getRandomPost };
