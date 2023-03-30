const bcrypt = require('bcrypt'); 
const User = require('../../models/UserModel'); 

exports.login = async (req, res) => { // Define a function to handle user login
  console.log(req.body);
  try {
    const { email, password } = req.body; 

    // Find the admin user in the database by email and is_admin 
    const admin = await User.findOne({ where: { email: email, is_admin: true } });

    if (admin) { // If the admin is found, check their password

      // Compare the entered password with the hashed password in the database
      const isPasswordMatched = await bcrypt.compare(password, admin.password);

      if (isPasswordMatched) {
        // If the password is correct, set session variables and redirect to the admin dashboard
        console.log("admin logged in ",req.body);
        req.session.isLoggedIn = true;
        req.session.adminId = admin.id;
        return res.redirect('/admin/adminDashboard');
  
      }
    }
    console.log("invalid email and password");
   req.flash('error', 'Invalid email or password');
     return res.redirect('/admin');
     
  } catch (err) {
    console.error(err);
    console.log("admin log in error ")
    const errorMessage = "An error occurred while logging in";
    //// If an error occurs, render the login page with an error message
    // If an error occurs, set a flash message and redirect to the login page
  req.flash('error', 'An error occurred while logging in');
  return res.redirect('/admin');

  }
};


exports.getLogin = (req, res) => { 
  // Define a function to render the adminLogin page
  res.render('adminLogin', { messages: req.flash() });
};


exports.adminDashboard = async (req, res) => { 
 // Define a function to render the admin dashboard
  try {
    // Check if the user is logged in and is an admin
    console.log("enter in admin dashboard try");

    if (req.session.isLoggedIn && req.session.adminId) {
      console.log("enter in admin dashboard try part if condition");
      const users = await User.findAll(); // Get all the users from the database
      res.render('adminDashboard', {  //// Render the admin dashboard with the users data
        pageTitle: 'Admin Dashboard',
        path: '/admin/dashboard',
        users: users
      });
    } else {
      // If the user is not logged in or is not an admin, redirect to the login page
      console.log("admin dashboard else part")

      return res.redirect('/admin/login'); 
    }
  } catch (err) {
    console.error(err);
    //If an error occurs, return an error message
    return res.status(500).send("An error occurred while retrieving the dashboard data");
  }
};



/*
// Add a logout function to destroy the session and redirect to the login page
exports.logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/admin/login');
  };
*/


























/*
exports.login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ where: { email: email, password: password, is_admin: true } })
    .then(admin => {
      if (admin) {
        console.log("IF ADMIN")
        console.log("LOGIN ===========",admin);
        req.session.isLoggedIn = true;
        req.session.adminId = admin.id;
        res.redirect('/admin/adminDashboard');
      } else {
        console.log("NOT ADMIN")
        res.redirect('/admin/login');
      }
    })
    .catch(err => console.log(err));
};







exports.login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(req.body);
  User.findOne({ where: { email: email, password: password, is_admin: true } })
    .then(admin => {
      if (admin) {
        console.log("IF ADMIN")
        console.log("LOGIN ===========",admin);
        req.session.isLoggedIn = true;
        req.session.adminId = admin.id;
        res.redirect('/admin/adminDashboard');
      } else {
        console.log("NOT ADMIN")
        //const errorMessage = "Invalid email or password";
        res.render('adminLogin'); //, { errorMessage: errorMessage }
      }
    })
    .catch(err => console.log(err));
};




exports.adminDashboard = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log("ADMIN DASHBOARD TRIGGERED")
    
    // Check if user is logged in as an admin
    if (req.session.isLoggedIn && req.session.adminId) {
      const users = await User.findAll();
      console.log("USERS DATA", users);
      res.render('adminDashboard', {
        pageTitle: 'Admin Dashboard',
        path: '/admin/dashboard',
        users: users
      });
    } else {
      res.redirect('/admin/login');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};


*/

