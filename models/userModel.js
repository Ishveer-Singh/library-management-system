const db = require("../db");

const findUserByEmail = (email, callback) => {

    db.query("SELECT * FROM users WHERE email = ?", [email], callback);

};

const createUser = (name, email, hashedPassword, callback) => {

    db.query("INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hashedPassword], callback);

};

module.exports = { findUserByEmail, createUser }