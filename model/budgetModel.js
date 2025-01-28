
const pool = require('./db');

// Create a new budget
const createBudget = async (userId, categoryId, amount, startDate, endDate) => {
  const query = `
    INSERT INTO budgets (user_id, category_id, amount, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const result = await pool.query(query, [userId, categoryId, amount, startDate, endDate]);
  return result.rows[0];
};

// Get budgets for a user
const getBudgetsByUserId = async (userId) => {
  const query = `
   SELECT * FROM budgets
   WHERE user_id = $1;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Get budgets by category
const getBudgetsByCategory = async (userId, categoryId) => {
  const query = `
    SELECT id, amount, start_date, end_date
    FROM budgets
    WHERE user_id = $1 AND category_id = $2
    ORDER BY start_date ASC;
  `;
  const result = await pool.query(query, [userId, categoryId]);
  return result.rows;
};

module.exports = {
  createBudget,
  getBudgetsByUserId,
  getBudgetsByCategory,
};
