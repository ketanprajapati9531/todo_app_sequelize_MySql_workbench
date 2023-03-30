const express = require('express');
const router = express.Router();

const adminController = require('./index.controller.js');
const { User } = require('../../models/userModel'); // Import the User model
const Auth = require('../../middlewares/Auth');

router.get('/', adminController.getLogin);
router.get('/login', adminController.getLogin);
router.post('/login', adminController.login);
router.get('/adminDashboard', Auth ,adminController.adminDashboard);
//router.get('/logout', adminController.logout); // add a logout route

module.exports = router;
