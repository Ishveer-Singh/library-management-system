const express = require("express");
const router = express.Router();
const { body } = require("express-validator")

const { registerUser, loginUser } = require("../controllers/authController");
const validate = require("../middleware/validate");

router.post("/register", [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6, max: 30 })
        .withMessage("Password must be between 6 and 30 characters")

], validate, registerUser)

router.post("/login", [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")

], validate, loginUser)

module.exports = router

