
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../model/auth/auth');
const { createBudget, getBudgetsByUserId, deleteBudgetsById } = require('../model/budgetModel');

// Add a new budget
router.post('/', ensureAuthenticated, async (req, res) => {
  const { userId, categoryId, amount, startDate, endDate} = req.body;
  try {
    const budget = await createBudget( userId, categoryId, amount, startDate, endDate);
    res.status(201).json({ success: true, budget });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create budget' });
  }
});

// Get all budgets for a user
router.get('/:userId', ensureAuthenticated, async (req, res) => {
  const { userId } = req.params;
  try {
    const budgets = await getBudgetsByUserId(userId);
    res.status(200).json({ success: true, budgets });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch budgets' });
  }
});

// Delete budget by id

router.delete('/:budgetId', ensureAuthenticated, async (req, res) => {
  const {budgetId} = req.params;
    try{
      const result = await deleteBudgetsById(budgetId);
      res.status(200).json({ success: true, result});
    } catch(err){
      res.status(500).json({ success: false, error: 'Failed to delete', err});
    }
})
module.exports = router;
