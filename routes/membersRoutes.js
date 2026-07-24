const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validate = require("../middleware/validate")

const { getMembers, getMembersid, addMembers, updateMembers, deleteMembers } =
    require("../controllers/membersController");
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");

router.use(auth);

router.get("/members",authorize("user"), getMembers)

router.get("/members/:id",authorize("user"), [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Member id must be a positive integer")

], validate, getMembersid)

router.post("/members",authorize("admin"), [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Name can only contain letters and spaces"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email")
        .normalizeEmail(),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Enter a valid 10-digit Indian mobile number")

], validate, addMembers)

router.put("/members/:id",authorize("admin"), [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Member id must be a positive integer"),
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters")
        .bail()
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Name can only contain letters and spaces"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Enter a valid email")
        .normalizeEmail(),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .bail()
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Enter a valid 10-digit Indian mobile number")

], validate, updateMembers)

router.delete("/members/:id",authorize("admin"), [
    param("id")
        .isInt({ min: 1 })
        .withMessage("Member id must be a positive integer")

], validate, deleteMembers)


module.exports = router;
