
const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, findCategoryByName } = require('../model/categoryModel');

// Create a new category
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const category = await createCategory(name);
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create category' });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// Get category by name 
router.get('/:name', async(req, res) => {
    const { name } = req.params;
    try{
        const result = await findCategoryByName(name); 
        res.status(200).json({ success: true, result });
    } catch(err){
        res.status(500).json({ success: false, error: 'Failed to fetch name category' });
    }
})

module.exports = router;
