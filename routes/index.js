// index.js is used to route/handle redirection to different pages
// i.e., GET requests?

var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var bcrypt = require('bcryptjs');

/* Database funcitonality
* Not sure if needed, but just in case? Remove if it breaks database stuff somehow */
var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
connectionString: process.env.DATABASE_URL
}); 
client.connect(); // connect to the DATABASE_URL

/* login page 
* localhost:3000/digitalBlackjack/login */
router.get('/', function(req, res, next) {
res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

/* Create an Account page
* localhost:3000/digitalBlackjack/createAccount */
router.get('/createAccount', function(req, res, next) {
res.sendFile(path.join(__dirname, '..', 'public', 'createAccount.html'));
});

/* Game page
* localhost:3000/digitalBlackjack/game */
router.get('/game', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'game.html'));
});

/* Top winners page
* localhost:3000/digitalBlackjack/winners */
router.get('/winners', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'winners.html'));
});

/* Top losers page
* localhost:3000/digitalBlackjack/winners */
router.get('/losers', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'losers.html'));
});



module.exports = router;
