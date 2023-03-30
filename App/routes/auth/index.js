const express = require('express');
const { renderRegisterForm, register , loginUser, logoutUser } = require('./index.controller');
const router = express.Router();

// Render the registration form
router.get('/register', renderRegisterForm);

// Handle user registration
router.post('/register', register);

// Render the login form
router.get('/login', (req, res) => {
  res.render('login', { errorMessage: null });
});

// Handle user login
router.post('/login', loginUser);

// Handle user logout
router.get('/logout', logoutUser);

module.exports = router;
