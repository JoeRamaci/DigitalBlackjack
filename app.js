// app.js is main entry point for application. Builds express app by setting up routers and getting/defining modules necessary for function
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// add this line before var indexRouter = require('./routes/index');
// If not, you MAY have "password must be a string" error
var env = require('dotenv').config();


// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// express app construction
var app = express();


var session = require('express-session');


// Flash is needed for passport middleware
var flash = require('express-flash'); 


const Client = require('pg').Client;
// create an instance from Client
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect(); //connect to database


// javascript password encryption (https://www.npmjs.com/package/bcryptjs)
var bcrypt = require('bcryptjs');
//  authentication middleware
var passport = require('passport');
// authentication locally (not using passport-google, passport-twitter, passport-github...)
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
  usernameField: 'username', // form field name
  passwordField: 'password'
  },
  function(username, password, done) {
    client.query('SELECT * FROM blackjack_user WHERE username = $1', [username], function(err, result) {
      if (err) {
        console.log("SQL error"); //next(err);
        return done(null,false, {message: 'sql error'});
      }
      if (result.rows.length > 0) {
        let matched = bcrypt.compareSync(password, result.rows[0].password);
        if (matched) {
          console.log("Successful login, ", result.rows[0]);
          return done(null, result.rows[0]);
        } 
      }
      console.log("Bad username or password");
      // returning to passport
      // message is passport key
      return done(null, false, {message: 'Bad username or password'});
    });
  })
);

// Store user information into session
passport.serializeUser(function(user, done) {
  //return done(null, user.id);
  return done(null, user);
});

// Get user information out of session
passport.deserializeUser(function(id, done) {
  return done(null, id);
});




// Use the session middleware
// configure session object to handle cookie
// req.flash() requires sessions
// secret: 'webDev' This is the secret used to sign the session ID cookie. 
// It should be a long, randomly-generated string to ensure security.
app.use(session({
  secret: 'WebDev',
  resave:false,
  saveUninitialized: true,
}));

// give attributes to express
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// exports app to be called elsewhere?
module.exports = app;
