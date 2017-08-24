// 20140509 Hong-Yu
// passport.js
// load all the thing we need
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require("../app/user");
var user = {};
user.email = "";
user.password = "";

//expose this function to out app using module.exports
module.exports = function(passport) {
   // Passport session set up =================================================
   // required for persistent login sessions
   // passport need ability to serialize an unserialize users out of session

   // used to serialize user for the session
   passport.serializeUser(function(user, done) {
      console.log("serialize user");
      done(null, user.id);
   });
   // used to deserialize user
   passport.deserializeUser(function(id, done) {
      console.log("deserialize user");

//      User.findById(id, function(err, user) {
//         done(err, user);
//      });
   });
   // Local sign up ===========================================================
   // we are using named strategies since we have one for login and one for sign-up
   // by default, if there was no name, it would just be called 'local'
   passport.use('local-signup', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
         usernameField:'email',
         passwordField: 'password',
         passReqToCallback:true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {

         //asynchronous
         //User.findOne wont fire unless data is sect back
         process.nextTick(function() {
            console.log(email);
            console.log(User.GenerateHash(password));
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
             return done(null, false, req.flash("signupMessage", "That email is already taken"));
//            User.findOne({'local.email': email}, function(err, user) {
//               // if there are any errors, return the error
//               if (err)
//                  return done(err);
//               //check to see if theres already a user with that email
//               if (user) {
//                  return done(null, false, req.flash("signupMessage", "That email is already taken"));
//               } else {
//                  // if there is no user with that email
//                  // create the user
//                  var newUser =  new User();
//                  // set the user's local credentials
//                  newUser.local.email = email;
//                  newUser.local.password = newUser.generateHash(password);
//                  // save the user
//                  newUser.save(function(err){
//                     if(err)
//                        throw err;
//                     return done(null, newUser);
//                  });
//               }
//            });

         });
      }
   ));
    //Local login =============================================================
    // we are using named strategies since we have one to login and one for signup
    passport.use("local-login", new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField:'email',
        passwordField: 'password',
        passReqToCallback:true // allows us to pass back the entire request to the callback
    },
        function(req, email, password, done) {
            console.log(email);
            console.log(password);
            user.local = {};
            user.id = 1;
            user.local.email = email;
            user.local.password = password;



           done(null, user);
        }
    ));



};