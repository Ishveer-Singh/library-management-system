const express = require("express");
const router = express.Router();

const {getIssued_books,getIssued_booksid,addIssued_books,deleteIssued_books}=
require("../controllers/issuedBooksController")

router.get("/issued_books",getIssued_books)

router.get("/issued_books/:id",getIssued_booksid)

router.post("/issued_books",addIssued_books)

router.delete("/issued_books/:id",deleteIssued_books)

module.exports = router
