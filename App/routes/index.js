
const express = require('express');
const router = express.Router();
const adminIndex = require('./admin/index');
const todoIndex = require('./todo/index');
const taskIndex = require('./task/index');
const authIndex = require('./auth/index');
//const auth = require('../middlewares/auth');
const flash = require('express-flash');

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});



router.use("/admin", adminIndex);
router.use("/todo", todoIndex);
router.use("/task", taskIndex);
router.use("/auth", authIndex);

router.use(flash());
router.get('/register', (req, res) => {
  res.render("register.ejs")
});

router.get('/login', (req, res) => {
  res.render('login.ejs');
});



module.exports = router;


