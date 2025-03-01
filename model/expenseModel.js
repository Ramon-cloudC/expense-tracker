
const pool = require('./db');


// Cretae new expense
const createExpense = async(userId, categoryId, amount, date, description, budgetId) => {
    const query = `
    INSERT INTO expenses (user_id, category_id, amount, date, description, budget_id)
    VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const result = await pool.query(query, [userId, categoryId, amount, date, description, budgetId]);
    return result.rows[0];
};

// Get expenses for a user
const getExpensesByUserId = async (userId) => {
    const query = `
      SELECT *
      FROM expenses
      WHERE user_id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  };

  module.exports = {
    createExpense,
    getExpensesByUserId,
  }