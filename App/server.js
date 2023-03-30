// imports the Express.js library.
const express = require('express');

//body-parser middleware that allows us to parse request bodies in middleware.
const bodyParser = require('body-parser');

const flash = require('connect-flash');

//path module which provides utilities for working with file and directory paths.
const path = require('path');

// cookie-parser middleware that allows us to parse cookies in middleware.
const cookieParser = require('cookie-parser');

//imports the database configuration module.
const db = require('./config/database');

//imports the express-session middleware that allows us to create and manage user sessions.
const session = require('express-session');

// imports the connect-session-sequelize module that allows us to store sessions in a Sequelize database.
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//lines import the various route modules.
const indexRoutes = require('./routes/index');

//This line creates a new Express app instance.
const app = express();


//configure the  app to use the EJS view engine and set the default view directory.
app.set('view engine', 'ejs');
app.set('views', 'views');

// Set up middleware
//registers body-parser middleware to parse incoming request bodies in middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//registers the cookie-parser middleware to parse incoming cookies in middleware.
app.use(cookieParser());



app.use(flash());


app.use(
  session({
    secret: 'secret', //secret string used to sign the session ID cookie
    resave: false,
    saveUninitialized: false, //resave and saveUninitialized options are set to false to optimize performance
    store: new SequelizeStore({
      db: db
    })
   })//The store option is set to use the Sequelize store we imported earlier.
);

//These lines register the various route modules as middleware.
// Set up routes
app.use('/', indexRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found 404 error');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message
    }
  });
});

//sets the server port to either the PORT environment variable or port 3000 
//if the environment variable is not set.
// Set up port
const PORT = process.env.PORT || 3000;



// Sync the database and start the servear
//This code syncs the database and starts the server listening on the specified
// port. If there is an error, it is logged to the console.
db.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });




  
  

