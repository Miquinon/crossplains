const express = require("express");
const CartController = require("../controllers/cartController");

const router = express.Router();


router.use((req, res, next) => {
    console.log(`🔍 ${req.method} request to ${req.originalUrl}`);
    next();
});

router.post("/add", CartController.addItem); // Add item to cart
router.put("/update", CartController.updateItem); // Update item quantity
router.delete("/remove", CartController.removeItem); // Remove an item
router.delete("/clear", CartController.clearCart); // Clear cart
router.get("/:user_id", CartController.getCart); // Get cart by user_id

module.exports = router;

// const express = require("express");
// const CartController = require("../controllers/cartController");

// const router = express.Router();

// router.get("/", CartController.getCart);
// router.post("/add", CartController.addItem); // Add item to cart
// router.get("/:userId", CartController.getCart); // Get cart by userId
// router.put("/update", CartController.updateItem); // Update item quantity
// router.delete("/remove", CartController.removeItem); // Remove an item
// router.delete("/clear", CartController.clearCart); // Clear cart

// module.exports = router;