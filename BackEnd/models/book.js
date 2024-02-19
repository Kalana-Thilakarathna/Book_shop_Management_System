const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    description: { type: String, required: false },
    ISBN: { type: String, required: false },
    price: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("Book", bookSchema);

module.exports = book;
