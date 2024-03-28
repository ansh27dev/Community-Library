const { Schema, model } = require("mongoose");

const books = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  donatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const bookModel = model("bookModel", books);
module.exports = bookModel;
