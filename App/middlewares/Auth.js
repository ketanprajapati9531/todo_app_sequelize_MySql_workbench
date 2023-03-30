module.exports = function(req, res, next) {
  console.log("auth middlewatre....." , req.session);
  if (req.session.isLoggedIn == true &&  req.session.adminId == 1) {

    console.log("logg and adminid log_ wlcm in if");

    next(); // continue to the next middleware function

  } else {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        //res.redirect('/admin/login');
        //res.send("Unauthorized Access");
        res.write('<h1 style="display:block;text-align:center;color:red;">Unauthorized Access</h1>');
        res.end();
      }
    });
  }
}








/*
middlewares/auth.js file to check if the user is logged in and destroy the session if they 
are not. 

This middleware function checks if the loggedIn session variable is set. If it is, it calls the 
next() function to continue to the next middleware function (which could be the adminDashboard 
route handler). If the loggedIn variable is not set, it destroys the session and redirects 
the user back to the login page.

*/