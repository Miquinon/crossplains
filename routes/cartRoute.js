const express = require("express");
const CartController = require("../controllers/cartController");

const router = express.Router();


router.use((req, res, next) => {
    console.log(`🔍 ${req.method} request to ${req.originalUrl}`);
    next();
});
router.get("/:user_id", CartController.getCart); // Get cart by user_id
router.post("/add", CartController.addItem); // Add item to cart
router.put("/update", CartController.updateItem); // Update item quantity
router.delete("/remove", CartController.removeItem); // Remove an item
router.delete("/clear", CartController.clearCart); // Clear cart


module.exports = router;

