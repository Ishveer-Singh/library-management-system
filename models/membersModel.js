const db = require("../db")

const getAllmembers = (callback) => {

    db.query(`select * from members`, callback)
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
