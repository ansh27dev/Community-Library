const { Schema } = require("mongoose");

const admin = new Schema({
  adminID: {
    type: Text,
    required: true,
  },
  country: {
    type: Text,
    required: true,
  },
  state: {
    type: Text,
    required: true,
  },
  city: {
    type: Text,
    required: true,
  },
  password: {
    type: password,
    required: true,
  },
});

const adminModel = model("adminModel", admin);
module.exports = adminModel;
