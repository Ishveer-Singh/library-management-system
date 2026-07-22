const { getAllBooks, getBook, createBook, updatingBook, deletingBook } =
    require("../models/booksModel");

const getBooks = (req, res) => {

    getAllBooks((err, results) => {

        if (err) {
            return res.status(500).json({ message: "database error" });
        }
        res.status(200).json(results);
    });
};

const getBooksId = (req, res) => {

    const id = Number(req.params.id)

    getBook(id, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "Book not found" });
        }
        res.status(200).json(results);
    })
}

const addBook = (req, res) => {

    const { title, author, category, available_copies } = req.body

    createBook(title, author, category, available_copies, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in adding book" });
        }
        res.status(201).json({ message: "Book added successfully" });
    })
}

const updateBook = (req, res) => {

    const id = Number(req.params.id)
    const { title, author, category, available_copies } = req.body

    updatingBook(id, title, author, category, available_copies, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in updating book " });
        }
        res.status(200).json({ message: "Book updated successfully" });
    })
}

const deleteBook = (req, res) => {

    const id = Number(req.params.id)

    deletingBook(id, (err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in deleting book" });
        }
        res.status(200).json({ message: "Book deleted successfully" })
    })
}

module.exports = {
    getBooks, getBooksId, addBook, updateBook, deleteBook
};
