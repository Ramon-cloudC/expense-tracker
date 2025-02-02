
const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const { ensureAuthenticated } = require('../model/auth/auth')
const { createUser, findUserByUsername} = require('../model/userModel');


// get user by username

router.get('/:username', ensureAuthenticated, async(req, res) => {
    const { username } = req.params;

    try{
        const result = await findUserByUsername(username);
        res.status(200).json({ success: true , result});
        
    } catch(err){
        res.status(404).json({ success: false, error: 'Username not  found'})
    }
})
// Create user route
router.post('/add', async(req, res) =>{
    const { username, email, password } = req.body;
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound); 
        const user = await createUser(username, email, hashedPassword);
        res.status(201).json({ success: true, user });
      } catch (err) {
        res.status(500).json({ success: false, error: 'User registration failed' });
      }
});

// Login (Placeholder for Passport.js integration)
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login-failure',
}), (req, res) => {
  console.log('Authenticated user: ', req.user); // User should be available here
  res.redirect('/users/dashboard');
});


//Login upon success
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  console.log("🔎 Checking req.user in /dashboard:", req.user);

    res.json({
    success: true,
    message: `Welcome ${req.user.username}`, 
    user: req.user // Send user details
  });


});

// Login failure
router.get('/login-failure', (req, res) => {
    res.status(401).json({ success: false, message: 'Login failed' });
  });
  
  // Logout a user
  router.get('/logout',(req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error logging out:', err.message);
        return res.status(500).json({ success: false, error: 'Logout failed' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ success: false, error: 'Failed to destroy session' });
        }
      res.clearCookie('connect.sid');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
  });
});
  
  module.exports = router;