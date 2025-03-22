const pool = require("../database");

async function getMaterials(name) {
  try {
    const query = "SELECT DISTINCT material FROM products WHERE name = $1";
    const result = await pool.query(query, [name]);
    console.log(result.rows)
    return result.rows;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return { error: "Database error" };
  }
}

module.exports = {
  getMaterials,
};
