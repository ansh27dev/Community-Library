const { Schema } = require("mongoose");

const books = new Schema({
  bookName: {
    type: Text,
    required: true,
  },
  publisher: {
    type: Text,
    required: true,
  },
  Author: {
    type: Text,
    required: true,
  },
  ISBN: {
    type: Text,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const bookModel = model("bookModel", books);
module.exports = bookModel;
