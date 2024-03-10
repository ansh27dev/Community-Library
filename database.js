const mongoose = require("mongoose");
const mongoDB = require("dotenv");
dotenv.config();

const mongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db is connected");
    })
    .catch((err) => {
      console.log("db connection failed");
    });
};

module.exports = mongoDB;
