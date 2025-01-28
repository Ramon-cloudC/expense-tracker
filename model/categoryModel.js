
const pool = require('./db');

// Create a new category
const createCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *;
  `;
  const result = await pool.query(query, [name]);
  return result.rows[0];
};

// Get all categories
const getAllCategories = async () => {
  const query = `
    SELECT *
    FROM categories
    ORDER BY name ASC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Find a category by name
const findCategoryByName = async (name) => {
  const query = `
    SELECT *
    FROM categories
    WHERE name = $1;
  `;
  const result = await pool.query(query, [name]);
  return result.rows[0];
};

module.exports = {
  createCategory,
  getAllCategories,
  findCategoryByName,
};
