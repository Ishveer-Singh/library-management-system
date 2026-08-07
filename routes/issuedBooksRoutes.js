const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validate = require("../middleware/validate")

const { getIssued_books, getIssued_booksid, addIssued_books, returnBook } =
    require("../controllers/issuedBooksController");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.use(auth);

router.get("/", authorize("user", "admin"), getIssued_books)

router.get("/:id", authorize("user", "admin"), [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Issued books id must be a positive integer")

], validate, getIssued_booksid)

router.post("/", authorize("admin"), [
    body("book_id")
        .notEmpty()
        .withMessage("Book id is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Book id must be a positive integer"),

    body("member_id")
        .notEmpty()
        .withMessage("Member id is required")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Member id must be a positive integer"),

    body("issue_date")
        .notEmpty()
        .withMessage("Issue date is required")
        .bail()
        .isISO8601()
        .withMessage("Issue date must be a valid date (YYYY-MM-DD)")
        .toDate(),

], validate, addIssued_books)

router.put("/:id/return", authorize("admin"), [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Issued books id must be a positive integer")
], validate, returnBook);

module.exports = router
