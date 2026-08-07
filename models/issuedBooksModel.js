const db = require("../db")

const getAllissued_books = (limit, offset, callback) => {

    db.query(`select 
        issued_books.id,
        books.title,
        members.name,
        issued_books.issue_date,
        issued_books.return_date,
        issued_books.status
        FROM issued_books
        INNER JOIN members
        ON issued_books.member_id = members.id
        INNER JOIN books
        ON issued_books.book_id = books.id
        LIMIT ? OFFSET ?;`, [limit, offset], callback)
}

const getTotalIssuedBooks = (callback) => {
    db.query(
        "SELECT COUNT(*) AS total FROM issued_books",
        callback
    );
};

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

const addingIssued_books = (book_id, member_id, issue_date, callback) => {

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
                    (book_id, member_id, issue_date, return_date, status)
                     VALUES (?, ?, ? , NULL, 'issued')`,
                    [book_id, member_id, issue_date],
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

const returningBook = (id, callback) => {

    db.beginTransaction((err) => {

        if (err) {
            return callback(err);
        }

        db.query(
            `SELECT * FROM issued_books WHERE id = ?`,
            [id], (err, results) => {

                if (err) {
                    return db.rollback(() => callback(err));
                }

                if (results.length === 0) {
                    return db.rollback(() =>
                        callback(new Error("Issued book not found"))
                    );
                }

                const issuedBook = results[0];

                if (issuedBook.status === "returned") {

                    return db.rollback(() =>
                        callback(new Error("Book already returned"))
                    );
                }

                db.query(
                    `UPDATE issued_books
                     SET status = 'returned',
                         return_date = CURDATE()
                     WHERE id = ?`,
                    [id], (err) => {

                        if (err) {
                            return db.rollback(() => callback(err));
                        }

                        db.query(
                            `UPDATE books
                             SET available_copies = available_copies + 1
                             WHERE id = ?`,
                            [issuedBook.book_id], (err) => {

                                if (err) {
                                    return db.rollback(() => callback(err));
                                }

                                db.commit((err) => {

                                    if (err) {
                                        return db.rollback(() => callback(err));
                                    }

                                    callback(null, {
                                        message: "Book returned successfully"
                                    });

                                });
                            }
                        );
                    }
                );
            }
        );
    });
};


module.exports = { getAllissued_books, getAllissued_booksid, addingIssued_books, returningBook,getTotalIssuedBooks }
