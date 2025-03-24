const { name } = require("ejs");
const productModel = require("../models/productModel.js");
const productController = {};

productController.getFittings = async function (req, res, next) {
  res.render("./products/fittings", {});
};

productController.getMaterials = async function (req, res, next) {
  const { name } = req.query;
  console.log(name)
  data = await productModel.getMaterials(name)
  console.log(data)
  res.json(data);
};

productController.getMaterials90 = async function (req, res, next) {
  const { name } = req.query;
  // console.log("name")
  data = await productModel.getMaterials90(name)
  console.log(data)
  res.json(data);
};



productController.getMaterialsAdapter = async function (req, res, next) {
  const { name } = req.query;
  console.log(name)
  data = await productModel.getMaterialsAdapter(name)
  console.log(data)
  res.json(data);
};

module.exports = productController;
