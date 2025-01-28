
const pool = require('./db');


// Cretae new expense
const createExpense = async(userId, categoryId, amount, date, description) => {
    const query = `
    INSERT INTO expenses (user_id, category_id, amount, date, description)
    VALUES ($1, $2, $3, $4, $5);
    `;

    const result = await pool.query(query, [userId, categoryId, amount, date, description]);
    return result.rows[0];
};

// Get expenses for a user
const getExpensesByUserId = async (userId) => {
    const query = `
      SELECT *
      FROM expenses
      WHERE user_id = $1
      ORDER BY date DESC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  };

  module.exports = {
    createExpense,
    getExpensesByUserId,
  }