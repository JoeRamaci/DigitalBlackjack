// index.js is used to route/handle redirection to different pages
// i.e., GET requests?

var express = require('express');
var router = express.Router();

var path = require('path');
var env = require('dotenv').config();

const Client = require('pg').Client;
const client = new Client({
connectionString: process.env.DATABASE_URL
}); 
client.connect(); // connect to the DATABASE_URL

var passport = require('passport');
var bcrypt = require('bcryptjs');

router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if (err) {
      console.log("unable to logout:", err);
      return next(err);
    }
  });
  res.redirect('/')
});

/* login page 
* localhost:3000/login */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

/* Create an Account page
* localhost:3000/digitalBlackjack/createAccount */
router.get('/createAccount', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'createAccount.html'));
});


 /* login page
 * localhost:3000/ */
router.post('/',
passport.authenticate('local', {failureRedirect: 'login?message=Incorrect+credentials', failureFlash:true }),
function(req, res, next){
  console.log
  res.redirect('/game');
})

/* Game page
* localhost:3000/game */
router.get('/game', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'game.html'));
});

/* Top winners page
* localhost:3000/winners */
router.get('/winners', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'winners.html'));
});

router.get('/winnersOut',function(req, res, next){
  client.query('SELECT * FROM blackjack_user', function(err,result){
    if (err) {
      console.log("sql error 1");
      next(err); // throw error
    }
    else if (result.rows.length > 0) {
      console.log("Found some winners");
      res.json(result.rows);
    }
    else{
      console.log("Nobody has won a game yet");
      res.redirect('/winners?message=No+winners+yet');
    }
  });
});

/* Top losers page
* localhost:3000/winners */
router.get('/losers', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'losers.html'));
});

router.get('/losersOut',function(req, res, next){
  client.query('SELECT * FROM blackjack_user', function(err,result){
    if (err) {
      console.log("sql error 1");
      next(err); // throw error
    }
    else if (result.rows.length > 0) {
      console.log("Found some losers");
      res.json(result.rows);
    }
    else{
      console.log("Nobody has lost a game yet");
      res.redirect('/losers?message=No+losers+yet');
    }
  });
});

router.get('/createAccount', function(req, res, next){
res.sendFile(path.join(__dirname,'..','public','createAccount.html'));
});

/* create account page
 * localhost:3000/createAccount */
 router.post('/createAccount', 
 function(req, res, next) {
  if (req.body.username == null) {
    console.log("USERNAME EMPTY");
    res.redirect('/createAccount?message=Please+enter+a+username');
  } else if (req.body.password == null) {
    console.log("PASSWORD EMPTY");
    res.redirect('/createAccount?message=Please+enter+a+password');
  } else {
    var salt = bcrypt.genSaltSync(10);
    var encryptPassword = bcrypt.hashSync(req.body.password, salt);
    client.query('SELECT * FROM Blackjack_user WHERE username = $1', [req.body.username], function(err, result) {
      if (err) {
        console.log("unable to query SELECT");
        next(err);
      }
      // if user already existing
      if (result.rows.length > 0) {
        console.log("user exists");
        res.redirect('/createAccount?message=User+exists')
      } else {
        client.query('INSERT INTO Blackjack_user (username, password, win_count, loss_count) VALUES($1, $2, $3, $4)', [req.body.username, encryptPassword, 0, 0], function(err, result) {
          if (err) {
            console.log("unable to query INSERT");
            next(err);
          }
          console.log("ENCRYPTED PASS: " + encryptPassword) //DEBUG
          console.log("New user created");
          res.redirect('/createAccount?message=New+user+created.+Try+logging+in!');
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
