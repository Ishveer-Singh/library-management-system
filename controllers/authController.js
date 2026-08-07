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
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        createUser(name, email, hashedPassword, (err, results) => {

            if (err) {
                return next(err);
            }

            res.status(201).json({
                success: true,
                message: "User registered successfully"
            });
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
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, results[0].password)

        if (!isMatch) {
            const error = new Error("Invalid email or password")
            error.status = 401;
            return next(error)
        }

        const token = jwt.sign({ id: results[0].id, role: results[0].role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json({
            success: true,
            message: "You are successfully logged in",
            data: {
                token,
                user: {
                    id: results[0].id,
                    name: results[0].name,
                    email: results[0].email,
                    role: results[0].role,
                }
            }
        });

    })
}

module.exports = { registerUser, loginUser };