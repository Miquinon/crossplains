const productController = {};

productController.getFittings = async function (req, res, next) {
  res.render("./products/fittings", {});
};

module.exports = productController;
