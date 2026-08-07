const { getAllBooks, getBook, createBook, updatingBook, deletingBook, getTotalBooks } =
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

         getTotalBooks(title, (err, totalResult) => {
            if (err) {
                return next(err);
            }

            const totalBooks = totalResult[0].total;
            const totalPages = Math.ceil(totalBooks / limit);

            res.status(200).json({
                success: true,
                message: "Books fetched successfully",
                data: results,
                currentPage: page,
                totalBooks,
                totalPages
            });
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
    if (err.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        success: false,
        message: "This book cannot be deleted because it has been issued before.",
      });
    }

    return next(err);
  }

  if (results.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "Book not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Book deleted successfully.",
  });
});
}

module.exports = {
    getBooks, getBooksId, addBook, updateBook, deleteBook
};
