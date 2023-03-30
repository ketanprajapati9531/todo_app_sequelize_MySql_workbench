const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
//1



//loginUser is an asynchronous function that takes in a request and response object as arguments.
const loginUser = async (req, res) => {
  //It extracts the email and password from the request body 
  const { email, password } = req.body;

  try {
    // Find user by email
    // with that email using the findOne method of the User model.
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // User not found
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
     }
         // Check if user is an admin
    if (user.is_admin) {
      req.flash('error', 'Admin login not allowed');
      return res.redirect('/login');
    }

    // Compare passwords
    //If a user is found, it uses bcrypt to compare the hashed password in the database with the 
    //plaintext password provided in the request.
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      // Passwords don't match
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    // Passwords match, user is authenticated
    // response with an error message. If the passwords match, it sets the userId property of the 
    //session object to the user's ID and returns a success message as a JSON object.
    req.session.userId = user.id; // Save user ID in session
    req.session.isLoggedIn = false;
    delete req.session.adminId;
    
    res.json({ message: 'Logged in successfully' });
    //req.flash('success', 'Logged in successfully');

  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong');
    res.redirect('/login');
  }
};





//2

/*
 logoutUser is an asynchronous function that takes in a request and response object as arguments. 
 It destroys the session object and clears the session cookie. If there is an error while 
 destroying the session, it returns a 500 Internal Server Error response with an error message. 
*/
const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }

    res.clearCookie('sid');
    //Otherwise, it returns a success message as a JSON object.
    res.json({ message: 'Logged out successfully' });
  });
};


//3

// Render the registration form

/*
renderRegisterForm is a synchronous function that takes in a request and response object as 
arguments. It renders a view called 'register' and passes in an object with an error message 
set to null.
*/
/*
const renderRegisterForm = async(req, res) => {
  console.log(req.body);
  res.render('register', { errorMessage: "error" });
};
*/

/*
const renderRegisterForm = async (req, res) => {
  res.render('register', { errorMessage: req.flash('error'), successMessage: req.flash('success') });
};

*/

const renderRegisterForm = async (req, res) => {
  res.render('register', { messages: req.flash() });
};


    
   



//4
// Handle user registration

//register is an asynchronous function that takes in a request and response object as arguments. 
const register = async (req, res) => {
  //extracts the name, email, and password from the request body
  const { name, email, password } = req.body;
 console.log(req.body);
  try {
    // Check if user with same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      
      //res.json({ message: 'this email password already registered!' });
      //return res.redirect('/register');
      req.flash('error', 'Email already exists');
      return res.redirect('/register');
    }

    // Hash the password
    //If a user with that email does not exist, it generates a salt using bcrypt and hashes the password
    //using the genSalt and hash methods of bcrypt. 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    //It then creates a new user in the database with the hashed password using the create method of the User model.
    await User.create({ name, email, password: hashedPassword });
    
  
    req.flash('success', 'Registered successfully');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong');
    res.redirect('/register');


  }
};




module.exports = {
  renderRegisterForm,
  register,
  loginUser,
  logoutUser
};



