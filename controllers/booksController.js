const { getAllBooks, getBook, createBook, updatingBook, deletingBook } =
    require("../models/booksModel");

const getBooks = (req, res, next) => {

    const title=req.query.title

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    getAllBooks(title,limit, offset,(err, results) => {

        if (err) {
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: results
        });
    });
};

const getBooksId = (req, res, next) => {

    const id = Number(req.params.id)

    getBook(id, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.length === 0) {
            const error = new Error("Book not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            data: results[0]
        });
    })
}

const addBook = (req, res, next) => {

    const { title, author, category, available_copies } = req.body

    createBook(title, author, category, available_copies, (err, results) => {

        if (err) {
            return next(err);
        }
        
        res.status(201).json({ 
            success: true,
            message: "Book added successfully" });
    })
}

const updateBook = (req, res, next) => {

    const id = Number(req.params.id)
    const { title, author, category, available_copies } = req.body

    updatingBook(id, title, author, category, available_copies, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.affectedRows === 0) {
            const error = new Error("Book not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully" });
    })
}

const deleteBook = (req, res, next) => {

    const id = Number(req.params.id)

    deletingBook(id, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.affectedRows === 0) {
            const error = new Error("Book not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({ 
            success: true,
            message: "Book deleted successfully" })
    })
}

module.exports = {
    getBooks, getBooksId, addBook, updateBook, deleteBook
};
