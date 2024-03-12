const { Schema } = require("mongoose");

const user = new Schema({
  name: {
    type: Text,
    required: true,
  },
  email: {
    type: email,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
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
});

const userModel = model("userModel", user);
module.exports = userModel;
