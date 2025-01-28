
const pool = require('./db');

// Create a new user
const createUser = async(username, email, password) => {
    const query = `
        INSERT INTO users (username, email, password)
        Values ($1, $2, $3) RETURNING *;
        `;

    const result = await pool.query(query, [username, email, password]);
    return result.rows[0];
};

// Find user by username 
const findUserByUsername = async(username) => {
    const query = `
    SELECT * FROM users 
    WHERE username = $1;
    `;

    const result = await pool.query(query, [username]);
    return result.rows[0];
};

// Get user by ID
const findUserById = async (id) => {
    const query = `
      SELECT *
      FROM users
      WHERE user_id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };

module.exports = {
    createUser,
    findUserByUsername,
    findUserById
};