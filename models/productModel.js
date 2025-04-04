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

async function getMaterials90(name) {
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


async function getMaterialsAdapter(name) {
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
  getMaterials90,
  getMaterialsAdapter,
};
