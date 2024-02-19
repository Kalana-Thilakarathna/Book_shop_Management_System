const express = require("express");
const Book = require("../models/book");

const router = express.Router();

//saving a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear || !req.body.price) {
      return res.status(400).json({ message: "send all the required data" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
      description: req.body.description,
      ISBN: req.body.ISBN,
      price:req.body.price
    };
    console.log(newBook);
    const book = await Book.create(newBook);
    return res.status(201).json({message: "Book saves Successfuly"});
  } catch {
    (err) => {
      console.log("Internal server error : ", err.message);
      res.status(500).json({ message: err.message });
    };
  }
});

//get all the books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

//get the book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      return res.status(200).json({ data: book });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ubdate book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const title = req.body.title;
    const author = req.body.author;
    const publishedYear = req.body.publishedYear;
    const price = req.body.price
    if (!title || !author || !publishedYear || !price) {
      return res
        .status(400)
        .json({ message: "please send the all the required data" });
    } else {
      const results = await Book.findByIdAndUpdate(id, req.body);
      if (!results) {
        return res.status(404).json({ message: "book not found" });
      } else {
        return res.status(200).json({ message: "book updated successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete book
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await Book.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({ message: "book not found", data: result });
  }

  return res.status(200).json({ message: "successfuly deleted" });
});

module.exports = router
