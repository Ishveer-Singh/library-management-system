const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findUserByEmail, createUser } = require("../models/userModel")

const registerUser = async (req, res, next) => {

    const { name, email, password } = req.body

    findUserByEmail(email, async (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        createUser(name, email, hashedPassword, (err, results) => {

            if (err) {
                return next(err);
            }

            res.status(201).json({ message: "User registered successfully" });
        })
    })
}

const loginUser = async (req, res, next) => {

    const { email, password } = req.body

    findUserByEmail(email, async (err, results) => {

        if (err) {
            return next(err);
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, results[0].password)

        if (!isMatch) {
            const error = new Error("Invalid password")
            error.status = 401;
            return next(error)
        }

        const token = jwt.sign({ id: results[0].id, role: results[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            message: "You are successfully logged in",
            token: token
        });

    })
}

module.exports = { registerUser, loginUser };