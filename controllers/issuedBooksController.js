const { getAllissued_books, getAllissued_booksid, addingIssued_books, deletingIssued_books } =
    require("../models/issuedBooksModel")

const getIssued_books = (req, res, next) => {

    getAllissued_books((err, results) => {

        if (err) {
            return next(err);
        }
        res.status(200).json(results);
    })
}

const getIssued_booksid = (req, res, next) => {

    const id = Number(req.params.id)

    getAllissued_booksid(id, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.length === 0) {
            const error = new Error("Issued book not found");
            error.status = 404;
            return next(error)
        }

        res.status(200).json(results);
    })
}

const addIssued_books = (req, res, next) => {

    const { book_id, member_id, issue_date, return_date } = req.body

    addingIssued_books(book_id, member_id, issue_date, return_date, (err, results) => {

        if (err) {
            return next(err);
        }
        res.status(201).json({ message: "Issued book added successfully" })

    })
}

const deleteIssued_books = (req, res, next) => {

    const id = Number(req.params.id)

    deletingIssued_books(id, (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.affectedRows === 0) {
            const error = new Error("Issued book not found");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({ message: "Issued book deleted successfully" })
    })
}

module.exports = { getIssued_books, getIssued_booksid, addIssued_books, deleteIssued_books }
