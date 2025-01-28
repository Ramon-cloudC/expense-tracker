
const express = require('express');
const router = express.Router();
const { ensureAuthenticated }  = require('../model/auth/auth');

// Route redirection for logged in user
router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        message: 'Welcome' + req.user.username, 
    })
});