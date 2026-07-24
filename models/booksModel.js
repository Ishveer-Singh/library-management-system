const db = require("../db");

const getAllBooks = (title,limit, offset, callback) => {

    if (title) {
        db.query(
            "SELECT * FROM books WHERE title LIKE ? LIMIT ? OFFSET ?",
            [`%${title}%`, limit, offset],callback);

    } else {
        db.query(
            "SELECT * FROM books LIMIT ? OFFSET ?",
            [limit, offset],callback);
    }
};

const getBook = (id, callback) => {

    db.query(`select * from books where id =?`, [id], callback)
}

const createBook = (title, author, category, available_copies, callback) => {

    db.query(`insert into books (title,author,category,available_copies)
        values (?,?,?,?)`,
        [title, author, category, available_copies], callback)
}

const updatingBook = (id, title, author, category, available_copies, callback) => {

    db.query(`UPDATE books
        set title=?,author=?,category=?,available_copies=?
        where id =?`,
        [title, author, category, available_copies, id], callback)
}

const deletingBook = (id, callback) => {

    db.query(`delete from books where id=?`, [id], callback)
}


module.exports = {
    getAllBooks, getBook, createBook, updatingBook, deletingBook
};
