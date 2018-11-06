/* //------------------------------------------------------------
  SERVER.JS 567
*/ //-------------------------------------------------------------

// Require ======================================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport'); 
const serve = require('express-static')
const path = require('path')

var db = require("./models");

// Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware Config ======================================================

// Express --------------------------
// var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(express.static("public"));


// Passport 
//require('./config/passport/passport')(app);

//Static
// app.use(serve('public'))
app.use(express.static("public"));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + 'public/index.html'));
// });
// app.get('/user', function(req, res) {
//   res.sendFile(path.join(__dirname + '/public/user.html'));
// });



// Routes ======================================================
// USER page ========================================================
app.get('/user', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/user.html'));
});
// Stories page ========================================================
app.get('/stories', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/stories.html'));
});
// Blog Post page ========================================================
app.get('/blog-post', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/blog-post.html'));
});
// Friends & Followers page ========================================================
app.get('/friends', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/friends.html'));
});


require("./routes/apiRoutes")(app, passport);
require("./routes/auth.js")(app, passport);
require("./routes/htmlRoutes")(app, passport);


//load passport strategies
//require('./config/passport/passport.js');


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ==========================================
db.sequelize.sync(syncOptions).then(function() {
  console.log(process.env.NODE_ENV)
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT,
    );
    
  });
});

//module.exports = app;


