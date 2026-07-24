const db = require("../db")

const getAllmembers = (name,limit, offset,callback) => {

    if (name) {
        db.query(
            "SELECT * FROM members WHERE name LIKE ? LIMIT ? OFFSET ?",
            [`%${name}%`, limit, offset],callback);

    } else {
        db.query(
            "SELECT * FROM members LIMIT ? OFFSET ?",
            [limit, offset],callback);
    }
}

const gettingMember = (id, callback) => {

    db.query(`select * from members where id =?`, [id], callback)
}

const addingMembers = (name, email, phone, callback) => {

    db.query(`insert into members (name,email,phone)
        values (?,?,?)`,
        [name, email, phone], callback)
}

const updatingMembers = (id, name, email, phone, callback) => {

    db.query(`UPDATE members
        set name=?,email=?,phone=?
        where id =?`,
        [name, email, phone, id], callback)
}

const deletingMembers = (id, callback) => {

    db.query(`delete from members where id=?`, [id], callback)
}

module.exports = { getAllmembers, gettingMember, addingMembers, updatingMembers, deletingMembers }
