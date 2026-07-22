const express = require("express");
const router = express.Router();

const { getBooks, getBooksId, addBook, updateBook, deleteBook } =
    require("../controllers/booksController");

router.get("/books", getBooks)

router.get("/books/:id", getBooksId)

router.post("/books", addBook)

router.put("/books/:id", updateBook)

router.delete("/books/:id", deleteBook)

module.exports = router;

