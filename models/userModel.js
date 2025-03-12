const { check } = require("express-validator");
const pool = require("../database");

/* *****************************
 *   Register new user
 * *************************** */
async function registerUser(firstname, lastname, email, password) {
  try {
    const sql =
      "INSERT INTO users (firstname, lastname, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    return await pool.query(sql, [
      firstname,
      lastname,
      email,
      password,
      new Date(),
    ]);
  } catch (error) {
    return error.message;
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(user_email) {
  try {
    const sql = "SELECT * FROM users WHERE email = $1";
    const email = await pool.query(sql, [user_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * Return user data using email address
 * ***************************** */
async function getUserByEmail(email) {
  try {
    const result = await pool.query(
      "SELECT user_id, firstname, lastname, email, password, created_at FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found");
  }
}

module.exports = {
  registerUser,
  checkExistingEmail,
  getUserByEmail,
};
