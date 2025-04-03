const pool = require("../database"); // Ensure you have the correct database connection

const CartModel = {
    async addItem(user_id, item_name, item_size, item_pounds, quantity) {
        if (!user_id || !item_name || !item_size || !item_pounds|| quantity === null || quantity === undefined) {
            throw new Error("Invalid input: user_id, item_name, item_size, item_pounds, and quantity are required.");
        }
        try {
            console.log(`Adding item to cart: User ID = ${user_id}, Item = ${item_name}, Size = ${item_size}, Pounds = ${item_pounds} Quantity = ${quantity}`);

            const checkItemSql = `SELECT * FROM cart WHERE user_id = $1 AND item_name = $2 AND item_size = $3 AND item_pounds = $4;`;

            const checkItemResult = await pool.query(checkItemSql, [user_id, item_name, item_size, item_pounds]);

            if (checkItemResult.rows.length > 0) {
                console.log("Item found in cart, updating quantity...");
                const updateSql = `
                    UPDATE cart 
                    SET quantity = quantity + $5, updated_at = CURRENT_TIMESTAMP
                    WHERE user_id = $1 AND item_name = $2 AND item_size = $3 AND item_pounds = $4
                    RETURNING *;
                `;
                const updateResult = await pool.query(updateSql, [user_id, item_name, item_size, item_pounds, quantity]);
                console.log("Item updated in cart:", updateResult.rows[0]);
                return updateResult.rows[0];
            } else {
                console.log("Item not found in cart, adding new item...");
                const insertSql = `
                    INSERT INTO cart (user_id, item_name, item_size, item_pounds, quantity)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *;
                `;
                const insertResult = await pool.query(insertSql, [user_id, item_name, item_size, item_pounds, quantity]);
                console.log("New item added to cart:", insertResult.rows[0]);
                return insertResult.rows[0];
            }
        } catch (error) {
            console.error("Error in addItem query:", error);
            throw error;
        }
    },

    async removeItem(user_id, item_name, item_size, item_pounds) {
        try {
            const sql = `DELETE FROM cart WHERE user_id = $1 AND item_name = $2 AND item_size = $3 AND item_pounds = $4 RETURNING *;`;
            const result = await pool.query(sql, [parseInt(user_id), item_name, item_size, item_pounds]);
            return result.rows[0];
        } catch (error) {
            console.error("Error removing item from cart:", error);
            throw error;
        }
    },


    async getCart(user_id) {
        try {
            const sql = `SELECT * FROM cart WHERE user_id = $1;`;
            const result = await pool.query(sql, [user_id]);
            return result.rows; // Make sure it returns an array
        } catch (error) {
            console.error("Error fetching cart:", error);
            throw error;
        }
    },
    

    async updateItem(user_id, item_name, item_size, item_pounds, quantity) {
        try {
            const sql = `
                UPDATE cart 
                SET quantity = $5, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = $1 AND item_name = $2 AND item_size = $3 AND item_pounds = $4
                RETURNING *;
            `;
            const result = await pool.query(sql, [user_id, item_name, item_size, item_pounds, quantity]);
            return result.rows[0];
        } catch (error) {
            console.error("Error updating cart item:", error);
            throw error;
        }
    },

    

    async clearCart(user_id) {
        try {
            const sql = `DELETE FROM cart WHERE user_id = $1 RETURNING *;`;
            const result = await pool.query(sql, [user_id]);
            return result.rows;
        } catch (error) {
            console.error("Error clearing cart:", error);
            throw error;
        }
    }
};

module.exports = CartModel;
