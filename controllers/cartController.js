const CartModel = require("../models/cartModel");

const CartController = {

    async getCart(req, res) {
        try {
            const { user_id } = req.params; // Get user_id from the URL
    
            if (!user_id) {
                throw new Error("User ID is missing.");
            }
    
            const cart = await CartModel.getCart(user_id);
    
            console.log("Cart items fetched:", cart); // Debugging log
    
            res.status(200).render("./cart/cart", { success: true, cart });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },



    async addItem(req, res) {
        try {
            console.log("Request received at /cart/add"); // Debugging
            console.log("Request body:", req.body);
            const { user_id, item_name, item_size, item_pounds, item_material, quantity } = req.body;
            const item = await CartModel.addItem(user_id, item_name, item_size, item_pounds, item_material, quantity || 1);
            
            res.redirect(`/cart/${user_id}`);
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    

    async updateItem(req, res) {
        try {
            const { user_id, item_name, item_size, item_pounds, item_material, quantity } = req.body;
            const item = await CartModel.updateItem(user_id, item_name, item_size, item_pounds, item_material, quantity);
            res.status(200).json({ success: true, item });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async removeItem(req, res) {
        try {
            const { user_id, item_name, item_size, item_pounds, item_material } = req.body;
            // const { user_id, item_name } = req.query; 
            const item = await CartModel.removeItem(user_id, item_name, item_size, item_pounds, item_material);
            res.status(200).json({ success: true, item });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async clearCart(req, res) {
        try {
            const { user_id } = req.body;
            const cart = await CartModel.clearCart(user_id);
            res.status(200).json({ success: true, message: "Cart cleared", cart });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = CartController;
