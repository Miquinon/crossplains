const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {};

userController.getLogin = async function (req, res, next) {
  res.render("./user/login", {
    title: "Login",
    message: "Please Login",
    errors: null,
  });
};

userController.getRegister = async function (req, res, next) {
  res.render("./user/register", {
    title: "Register",
    message: "Please Register",
    errors: null,
  });
};

/* ****************************************
 *  Process Registration
 * *************************************** */
userController.registerUser = async function (req, res) {
  const { firstname, lastname, email, password } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(password, 10);
  } catch (error) {
    req.flash(
      "notice",
      "Sorry, there was an error processing the registration."
    );
    res.status(500).render("./user/register", {
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await userModel.registerUser(
    firstname,
    lastname,
    email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${firstname}. Please log in.`
    );
    res.status(201).render("./user/login", {
      title: "Login",
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./user/register", {
      title: "Registration",
      errors: null,
    });
  }
};

/* ****************************************
 *  Process login request
 * ************************************ */
userController.userLogin = async function (req, res) {
  const { email, password } = req.body;
  const userData = await userModel.getUserByEmail(email);
  if (!userData) {
    req.flash("notice", "Please check your credentials and try again.");
    res.status(400).render("./user/login", {
      title: "Login",
      nav,
      errors: null,
      email,
    });
    return;
  }
  try {
    if (await bcrypt.compare(password, userData.password)) {
      console.log("User data: ", userData);
      delete userData.password;
      const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3600 * 1000,
      });
      if (process.env.NODE_ENV === "development") {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      } else {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000,
        });
      }
      return res.redirect("/");
    } else {
      req.flash(
        "message notice",
        "Please check your credentials and try again."
      );
      res.status(400).render("./user/login", {
        title: "Login",
        nav,
        errors: null,
        email,
      });
    }
  } catch (error) {
    throw new Error("Access Forbidden");
  }
};

module.exports = userController;
