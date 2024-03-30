const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db is connected");
    })
    .catch((err) => {
      console.log("db connection failed");
    });
};

module.exports = connectDB;
