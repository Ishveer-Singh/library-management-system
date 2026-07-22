const db = require("../db")

const getAllissued_books = (callback) => {

    db.query(`select issued_books.id,books.title,members.name,
        issued_books.issue_date,issued_books.return_date
        FROM issued_books
        INNER JOIN members
        ON issued_books.member_id = members.id
        INNER JOIN books
        ON issued_books.book_id = books.id;`, callback)
}

const getAllissued_booksid = (id, callback) => {

    db.query(`select issued_books.id,books.title,members.name,
        issued_books.issue_date,issued_books.return_date
        FROM issued_books
        INNER JOIN members
        ON issued_books.member_id = members.id
        INNER JOIN books
        ON issued_books.book_id = books.id
        where issued_books.id=?;`, [id], callback)
}

const addingIssued_books = (book_id, member_id, issue_date, return_date, callback) => {

    db.beginTransaction((err) => {

        if (err) {
            return callback(err);
        }

        db.query("SELECT available_copies FROM books WHERE id = ?", [book_id],
            (err, results) => {

                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    });
                }

                if (results[0].available_copies <= 0) {
                    return db.rollback(() => {
                        callback(new Error("No copies available"));
                    });
                }

                db.query(`INSERT INTO issued_books
                    (book_id, member_id, issue_date, return_date)
                     VALUES (?, ?, ?, ?)`,
                    [book_id, member_id, issue_date, return_date],
                    (err, result) => {

                        if (err) {
                            return db.rollback(() => {
                                callback(err);
                            });
                        }

                        db.query(`UPDATE books
                            SET available_copies = available_copies - 1
                            WHERE id = ?`, [book_id],
                            (err, result) => {

                                if (err) {
                                    return db.rollback(() => {
                                        callback(err);
                                    });
                                }

                                db.commit((err) => {

                                    if (err) {
                                        return db.rollback(() => {
                                            callback(err);
                                        });
                                    }

                                    callback(null, { message: "Book issued successfully" });
                                })
                            })
                    })
            })
    })
}

const deletingIssued_books = (id, callback) => {

    db.beginTransaction((err) => {

        if (err) {
            return callback(err)
        }

        db.query("SELECT book_id FROM issued_books WHERE id = ?", [id],
            (err, results) => {

                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    })
                }

                if (results.length === 0) {
                    return db.rollback(() => {
                        callback(new Error("Issued book not found"));
                    });
                }


                const bookId = results[0].book_id

                db.query(`delete from issued_books WHERE id = ?`, [id],
                    (err, results) => {

                        if (err) {
                            return db.rollback(() => {
                                callback(err);
                            })
                        }

                        db.query(`update books
                            set available_copies =available_copies+1
                            where id = ?`, [bookId],
                            (err, results) => {

                                if (err) {
                                    return db.rollback(() => {
                                        callback(err);
                                    })
                                }

                                db.commit((err) => {

                                    if (err) {
                                        return db.rollback(() => {
                                            callback(err);
                                        })
                                    }
                                    callback(null, { message: "Book returned successfully" })
                                })
                            })
                    })
            })
    })
}

module.exports = { getAllissued_books, getAllissued_booksid, addingIssued_books, deletingIssued_books }
