const express = require("express");
const router = express.Router();

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/styles", express.static(__dirname + "public/styles"));
router.use("/scripts", express.static(__dirname + "public/scripts"));
router.use("/images", express.static(__dirname + "public/images"));

module.exports = router;
