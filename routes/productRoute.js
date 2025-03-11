// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const productController = require("../controllers/productController");

// Routes
router.get("/", (req, res) => {
  res.render("./products/index");
});

// An example of how to use the controller
router.get("/fittings", utilities.handleErrors(productController.getFittings));

router.get("/cleaners", (req, res) => {
  res.render("./products/cleaners");
});

router.get("/gauges", (req, res) => {
  res.render("./products/gauges");
});

router.get("/hammer", (req, res) => {
  res.render("./products/hammer");
});

router.get("/hose", (req, res) => {
  res.render("./products/hose");
});

router.get("/nipples", (req, res) => {
  res.render("./products/nipples");
});

router.get("/regulator", (req, res) => {
  res.render("./products/regulator");
});

router.get("/stainless", (req, res) => {
  res.render("./products/stainless");
});

router.get("/studs-gaskets", (req, res) => {
  res.render("./products/studs-gaskets");
});

router.get("/swage-bull", (req, res) => {
  res.render("./products/swage-bull");
});

router.get("/tank", (req, res) => {
  res.render("./products/tank");
});

router.get("/valves", (req, res) => {
  res.render("./products/valves");
});

router.get("/weld", (req, res) => {
  res.render("./products/weld");
});

module.exports = router;
