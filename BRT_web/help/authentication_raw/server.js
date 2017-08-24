/**
 * Created by CCT on 2014/5/8.
 */
// common_pitfalls.js
//set up
// ============================================================================
//get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require("passport");
var flash = require("connect-flash");

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var morgan  = require('morgan');
//var configDB = require("./config/database.js");
// configuration
// ============================================================================
// connect to database
require("./config/passport")(passport);
//app.configure(function(){
//   app.use(express.logger('dev')); // log every request to the console.
app.use(morgan());
app.use(bodyParser());

app.set('view engine', 'ejs'); // set up ejs for templating.

//required for passport
app.use(cookieParser()); // required before session.
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { maxAge: 60000 }}));
app.use(function(req, res, next) {
    var sess = req.session
    if (sess.views) {
        sess.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + sess.views + '</p>')
        res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        sess.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//});

//routes
// ============================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// launch
// ============================================================================
app.listen(port);
console.log("The magic happens on port" + port);