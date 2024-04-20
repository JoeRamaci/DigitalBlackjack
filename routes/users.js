// Users.js handles user interactions?
// i.e, POST requests?

var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var bcrypt = require('bcryptjs');

/* Database funcitonality */
var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL
}); 
client.connect(); // connect to the DATABASE_URL


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


 /* login page
 * localhost:3000/ */
 router.post('/', 
 passport.authenticate('local', { failureRedirect: '?message=Incorrect+credentials', failureFlash:true }),
 function(req, res, next) {
    res.redirect('/digitalBlackjack/game');
});

/* create account page
 * localhost:3000/createAccount */
 router.post('/createAccount', function(req, res, next) {
  if (req.body.username == null) {
    console.log("USERNAME EMPTY");
    res.redirect('/digitalBlackjack/createAccount?message=Please+enter+a+username');
  } else if (req.body.password == null) {
    console.log("PASSWORD EMPTY");
    res.redirect('/digitalBlackjack/createAccount?message=Please+enter+a+password');
  } else {
    var salt = bcrypt.genSaltSync(10);
    var encryptPassword = bcrypt.hashSync(req.body.password, salt);
    client.query('SELECT * FROM blackjack_user WHERE username = $1', [req.body.username], function(err, result) {
      if (err) {
        console.log("unable to query SELECT");
        next(err);
      }
      // if user already existing
      if (result.rows.length > 0) {
        console.log("user exists");
        res.redirect('/digitalBlackjack/createAccount?message=User+exists')
      } else {
        client.query('INSERT INTO blackjack_user (username, password, win_count, loss_count) VALUES($1, $2, $3, $4)', [req.body.username, encryptPassword, 0, 0], function(err, result) {
          if (err) {
            console.log("unable to query INSERT");
            next(err);
          }
          console.log("ENCRYPTED PASS: " + encryptPassword) //DEBUG
          console.log("New user created");
          res.redirect('/digitalBlackjack/?message=New+user+created.+Try+logging+in!');
        });
      }
    });
  }
 });

/* game page
 * localhost:3000/game
 * should post a user's win or loss when it occurs */
router.post('/game', function(req, res, next) {
  client.query();
});

module.exports = router;
