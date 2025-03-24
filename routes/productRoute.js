// Needed Resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const productController = require("../controllers/productController");
const pool = require("../database");

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

router.get(
  "/get-materials",
  utilities.handleErrors(productController.getMaterials)
);

router.get(
  "/get-materials-adapter",
  utilities.handleErrors(productController.getMaterialsAdapter)
);

// Get available sizes based on selected product name and material
router.get("/get-sizes", async (req, res) => {
  try {
    const { name, size } = req.query;
    const query =
      "SELECT DISTINCT size FROM products WHERE name = $1 AND size = $2";
    const result = await pool.query(query, [name, size]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/get-sizesB7", async (req, res) => {
  try {
    const { name } = req.query; // Only need name, not size
    const query = "SELECT DISTINCT size FROM products WHERE name = $1";
    const result = await pool.query(query, [name]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/get-part-number", async (req, res) => {
  try {
    const { name } = req.query; // Only need name, not size
    const query = "SELECT DISTINCT part_number FROM products WHERE name = $1";
    const result = await pool.query(query, [name]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching size:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/get-types", async (req, res) => {
  try {
    const { name, size } = req.query;
    const query = "SELECT DISTINCT type FROM products WHERE name = $1 AND size = $2";
    const result = await pool.query(query, [name, size]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ error: "Database error" });
  }
});


// Get available pounds based on selected name, material, and size
router.get("/get-pounds", async (req, res) => {
  try {
    const { name, material, size } = req.query;
    const query =
      "SELECT DISTINCT pounds FROM products WHERE name = $1 AND material = $2 AND size = $3";
    const result = await pool.query(query, [name, material, size]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pounds:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/get-pounds-gauges", async (req, res) => {
  try {
    const { name, size } = req.query;
    const query = "SELECT DISTINCT pounds FROM products WHERE name = $1 AND size = $2";
    const result = await pool.query(query, [name, size]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pounds:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/get-pressure", async (req, res) => {
  try {
    const { name, size } = req.query;
    const query = "SELECT DISTINCT pressure FROM products WHERE name = $1 AND size = $2";
    const result = await pool.query(query, [name, size]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching pounds:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.get(
  "/get-materials90",
  utilities.handleErrors(productController.getMaterials90)
);

router.get("/get-sizes90", async (req, res) => {
  try {
    const { name, material } = req.query;
    const query =
      "SELECT DISTINCT size FROM products WHERE name = $1 AND material = $2";
    const result = await pool.query(query, [name, material]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/get-pounds90", async (req, res) => {
  try {
    const { name, material, size } = req.query;
    const query =
      "SELECT DISTINCT pounds FROM products WHERE name = $1 AND material = $2 AND size = $3 ";
    const result = await pool.query(query, [name, material, size]);
    res.json(result.rows);
    
  } catch (error) {
    console.error("Error fetching pounds:", error);
    res.status(500).json({ error: "Database error" });
  }
});




module.exports = router;
