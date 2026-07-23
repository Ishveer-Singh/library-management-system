const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validate = require("../middleware/validate")

const { getBooks, getBooksId, addBook, updateBook, deleteBook } =
    require("../controllers/booksController");
const auth = require("../middleware/authMiddleware");

router.use(auth);

router.get("/books", getBooks)

router.get("/books/:id", [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Book id must be a positive integer")

], validate, getBooksId)

router.post("/books", [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required")
        .bail()
        .isLength({ max: 50 })
        .withMessage("Author name too long"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .bail()
        .isLength({ max: 50 })
        .withMessage("Category too long"),

    body("available_copies")
        .notEmpty()
        .withMessage("Available copies are required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("Available copies must be a non-negative integer")

], validate, addBook)

router.put("/books/:id", [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Book id must be a positive integer"),
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required")
        .bail()
        .isLength({ max: 50 })
        .withMessage("Author name too long"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .bail()
        .isLength({ max: 50 })
        .withMessage("Category too long"),

    body("available_copies")
        .notEmpty()
        .withMessage("Available copies are required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("Available copies must be a non-negative integer")

], validate, updateBook)

router.delete("/books/:id", [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Book id must be a positive integer")

], validate, deleteBook)

module.exports = router;
