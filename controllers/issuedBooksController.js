const {getAllissued_books,getAllissued_booksid,addingIssued_books,deletingIssued_books}=
require("../models/issuedBooksModel")

const getIssued_books=(req, res)=>{

    getAllissued_books((err, results) => {

        if (err) {
            return res.status(500).json({ message: "database error" });
        }
        res.status(200).json(results);
    })
}

const getIssued_booksid=(req, res)=>{

     const id = Number(req.params.id)

    getAllissued_booksid(id,(err, results) => {

        if (err) {
            return res.status(500).json({ message: "database error" });
        }
        res.status(200).json(results);
    })
}

const addIssued_books=(req, res)=>{

    const { book_id, member_id, issue_date, return_date } = req.body

    addingIssued_books(book_id, member_id, issue_date, return_date,(err, results) => {

        if (err) {
            return res.status(500).json({ message: "error in adding issued_book" });
        }
        res.status(200).json(results)

    })
}

const deleteIssued_books=(req, res)=>{

    const id = Number(req.params.id)

    deletingIssued_books(id,(err, results) => {

         if (err) {
            return res.status(500).json({ message: "error in deleting issued_book" });
        }
        res.status(200).json(results)
    })
}

module.exports = {getIssued_books,getIssued_booksid,addIssued_books,deleteIssued_books}