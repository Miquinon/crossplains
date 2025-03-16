// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const userController = require("../controllers/userController");
const userValidate = require("../utilities/userValidation");

// Routes
router.get("/login", utilities.handleErrors(userController.getLogin));

router.get("/register", utilities.handleErrors(userController.getRegister));

// Process the registration data
router.post(
  "/register",
  userValidate.registationRules(),
  userValidate.checkRegData,
  utilities.handleErrors(userController.registerUser)
);

// Process the login request
router.post(
  "/login",
  userValidate.loginRules(),
  userValidate.checkLoginData,
  utilities.handleErrors(userController.userLogin)
);

router.get("/logout", userController.logout);


module.exports = router;
