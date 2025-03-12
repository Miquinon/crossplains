const utilities = require(".");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validate = {};

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the database
    body("email")
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required.")
      .custom(async (email) => {
        console.log("Email: ", email);
        const emailExists = await userModel.checkExistingEmail(email);
        console.log("Email Exists: ", emailExists);
        if (emailExists) {
          throw new Error("Email exists. Please log in or use different email");
        }
      }),

    // password is required and must be strong password
    body("password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.render("./user/register", {
      errors,
      title: "Registration",
      firstname,
      lastname,
      email,
    });
    return;
  }
  next();
};

/*  **********************************
 *  Login Data Validation Rules
 *  From "Stickiness" activity
 * ********************************* */
validate.loginRules = () => {
  return [
    // valid email is required and cannot already exist in the database
    body("email")
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

    // password is required and must be strong password
    body("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Password must be provided."),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("./user/login", {
      errors,
      title: "Login",
      nav,
      email,
    });
    return;
  }
  next();
};

module.exports = validate;