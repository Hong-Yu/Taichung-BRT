/**
 * Created by CCT on 2014/5/8.
 */
// app/routes.js
module.exports = function(app, passport) {
   // Home page ===============================================================
   app.get('/', function(req, res) {
      res.render("index.ejs");
   });
   // Login ===================================================================
   app.get("/login", function(req, res) {
      // render the page and in any flash data if it exists
      res.render('login.ejs', {message:req.flash("loginMessage")});
   });
   // Sign up =================================================================
   app.get("/signup", function(req, res) {
      // render the page and pass in any flash data if it exists
      res.render("signup.ejs", {message:req.flash('signupMessage')});
   });
   // process the sign-up form
   app.post("/signup", passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
   }));
   // Profile section =========================================================
   app.get("/profile", isLoggedIn, function(req, res) {
      res.render("profile.ejs", {
         user:req.user // get the user out of session an pass to template
      });
   });
   // Logout ==================================================================
   app.get("/logout", function(req, res) {
      req.logout();
      res.redirect("/");
   });
    // pross the login form
    app.post("/login", passport.authenticate("local-login", {
        successRedirect:"/profile", // redirect to the secure profile session
        failureRedirect:"/login", //redirect back to signup page if there is an error
        failureFlash:true // allow flash messages
    }));

};
//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("Authenticated", req.isAuthenticated());

    // if user is authenticated in the session, carry on
//   if(req.isAuthenticated())
   return next();
   // if they aren't redirect them to the home page
    console.log("User is not authenticated in the session");
   res.redirect("/");
}