
const express = require('express');
const router = express.Router();
const { ensureAuthenticated }  = require('../model/auth/auth');
const { createExpense, getExpensesByUserId } = require('../model/expenseModel');

// Add a new expense
router.post('/add',ensureAuthenticated, async (req, res) => {
  const { userId, categoryId, amount, date, description, budgetId } = req.body;
  console.log("Received Data for expenses POST:", req.body);
  try {
    const expense = await createExpense(userId, categoryId, amount, date, description, budgetId);
    res.status(201).json({ success: true, expense });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to add expense' });
  }
});

// Get all expenses for a user
router.get('/:userId', ensureAuthenticated, async (req, res) => {
  const { userId } = req.params;
  console.log("User ID from expenses: ", userId);
  try {
    const expenses = await getExpensesByUserId(userId);
    res.status(200).json({ success: true, expenses });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch expenses' });
  }
});

module.exports = router;
