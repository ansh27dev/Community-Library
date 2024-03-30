const { Schema, model } = require("mongoose");

const issue = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  bookReturned: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const issueModel = model("issueModel", issue);
module.exports = issueModel;
