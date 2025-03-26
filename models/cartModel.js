// const pool = require("../database"); // Assuming you have a database connection file

// const CartModel = {
//     async addItem(user_id, item_name, quantity) {
//         if (!user_id || !item_name || !quantity) {
//             throw new Error("Invalid input: userId, itemName, and quantity are required.");
//         }
//         try {
//             console.log("Request body:", req.body); // Debugging log
//             console.log(`Adding item to cart: User ID = ${user_id}, Item = ${item_name}, Quantity = ${quantity}`);

//             const checkItemSql = `SELECT * FROM cart WHERE user_id = $1 AND item_name = $2;`;
//             const checkItemResult = await pool.query(checkItemSql, [user_id, item_name]);

//             if (checkItemResult.rows.length > 0) {
//                 console.log("Item found in cart, updating quantity...");
//                 const updateSql = `
//                     UPDATE cart 
//                     SET quantity = quantity + $3, updated_at = CURRENT_TIMESTAMP
//                     WHERE user_id = $1 AND item_name = $2
//                     RETURNING *;
//                 `;
//                 const updateValues = [user_id, item_name, quantity];
//                 const updateResult = await pool.query(updateSql, updateValues);
//                 console.log("Item updated in cart:", updateResult.rows[0]);
//                 return updateResult.rows[0];
//             } else {
//                 console.log("Item not found in cart, adding new item...");
//                 const insertSql = `
//                     INSERT INTO cart (user_id, item_name, quantity)
//                     VALUES ($1, $2, $3)
//                     RETURNING *;
//                 `;
//                 const insertValues = [user_id, item_name, quantity];
//                 const insertResult = await pool.query(insertSql, insertValues);
//                 console.log("New item added to cart:", insertResult.rows[0]);
//                 return insertResult.rows[0];
//             }
//         } catch (error) {
//             console.error("Error in addItem query:", error);
//             throw error;
//         }
//     },

//     async getCart(userId) {
//         try {
//             const sql = `SELECT * FROM cart WHERE user_id = $1;`;
//             const result = await pool.query(sql, [user_id]);
//             return result.rows;
//         } catch (error) {
//             console.error("Error fetching cart:", error);
//             throw error;
//         }
//     },

//     async updateItem(user_id, item_name, quantity) {
//         try {
//             const sql = `
//                 UPDATE cart 
//                 SET quantity = $3, updated_at = CURRENT_TIMESTAMP
//                 WHERE user_id = $1 AND item_name = $2
//                 RETURNING *;
//             `;
//             const result = await pool.query(sql, [user_id, item_name, quantity]);
//             return result.rows[0];
//         } catch (error) {
//             console.error("Error updating cart item:", error);
//             throw error;
//         }
//     },

//     async removeItem(user_id, item_name) {
//         try {
//             const sql = `DELETE FROM cart WHERE user_id = $1 AND item_name = $2 RETURNING *;`;
//             const result = await pool.query(sql, [user_id, item_name]);
//             return result.rows[0];
//         } catch (error) {
//             console.error("Error removing item from cart:", error);
//             throw error;
//         }
//     },

//     async clearCart(user_id) {
//         try {
//             const sql = `DELETE FROM cart WHERE user_id = $1 RETURNING *;`;
//             const result = await pool.query(sql, [user_id]);
//             return result.rows;
//         } catch (error) {
//             console.error("Error clearing cart:", error);
//             throw error;
//         }
//     }
// };

// module.exports = CartModel;
const pool = require("../database"); // Ensure you have the correct database connection

const CartModel = {
    async addItem(user_id, item_name, quantity) {
        if (!user_id || !item_name || quantity === null || quantity === undefined) {
            throw new Error("Invalid input: user_id, item_name, and quantity are required.");
        }
        try {
            console.log(`Adding item to cart: User ID = ${user_id}, Item = ${item_name}, Quantity = ${quantity}`);

            const checkItemSql = `SELECT * FROM cart WHERE user_id = $1 AND item_name = $2;`;
            const checkItemResult = await pool.query(checkItemSql, [user_id, item_name]);

            if (checkItemResult.rows.length > 0) {
                console.log("Item found in cart, updating quantity...");
                const updateSql = `
                    UPDATE cart 
                    SET quantity = quantity + $3, updated_at = CURRENT_TIMESTAMP
                    WHERE user_id = $1 AND item_name = $2
                    RETURNING *;
                `;
                const updateResult = await pool.query(updateSql, [user_id, item_name, quantity]);
                console.log("Item updated in cart:", updateResult.rows[0]);
                return updateResult.rows[0];
            } else {
                console.log("Item not found in cart, adding new item...");
                const insertSql = `
                    INSERT INTO cart (user_id, item_name, quantity)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `;
                const insertResult = await pool.query(insertSql, [user_id, item_name, quantity]);
                console.log("New item added to cart:", insertResult.rows[0]);
                return insertResult.rows[0];
            }
        } catch (error) {
            console.error("Error in addItem query:", error);
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
    

    async updateItem(user_id, item_name, quantity) {
        try {
            const sql = `
                UPDATE cart 
                SET quantity = $3, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = $1 AND item_name = $2
                RETURNING *;
            `;
            const result = await pool.query(sql, [user_id, item_name, quantity]);
            return result.rows[0];
        } catch (error) {
            console.error("Error updating cart item:", error);
            throw error;
        }
    },

    async removeItem(user_id, item_name) {
        try {
            const sql = `DELETE FROM cart WHERE user_id = $1 AND item_name = $2 RETURNING *;`;
            const result = await pool.query(sql, [user_id, item_name]);
            return result.rows[0];
        } catch (error) {
            console.error("Error removing item from cart:", error);
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
