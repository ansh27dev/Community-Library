const { Schema, model } = require("mongoose");

const admin = new Schema({
  adminID: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: password,
    required: true,
  },
});

const adminModel = model("adminModel", admin);
module.exports = adminModel;
