const { getAllissued_books, getAllissued_booksid, addingIssued_books, returningBook,getTotalIssuedBooks } =
    require("../models/issuedBooksModel")

const getIssued_books = (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    getAllissued_books(limit, offset, (err, results) => {

        if (err) {
            return next(err);
        }

        getTotalIssuedBooks((err, totalResult) => {
        if (err) return next(err);

        const totalIssuedBooks = totalResult[0].total;
        const totalPages = Math.ceil(totalIssuedBooks / limit);

        res.status(200).json({
            success: true,
            message: "Issued books fetched successfully",
            data: results,
            currentPage: page,
            totalIssuedBooks,
            totalPages
        });
    });
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

        res.status(200).json({
            success: true,
            message: "Issued book fetched successfully",
            data: results[0]
        });
    })
}

const addIssued_books = (req, res, next) => {

    const { book_id, member_id, issue_date } = req.body

    addingIssued_books(book_id, member_id, issue_date, (err, results) => {

        if (err) {
            return next(err);
        }
        res.status(201).json({
            success: true,
            message: "Issued book added successfully"
        })

    })
}

const returnBook = (req, res, next) => {

    const { id } = req.params;

    returningBook(id, (err, results) => {

        if (err) {
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: "Book returned successfully"
        });

    });
}


module.exports = { getIssued_books, getIssued_booksid, addIssued_books, returnBook }
