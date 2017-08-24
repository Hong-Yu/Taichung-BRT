/**
 * Created by CCT on 2014/5/8.
 */
// app/routes.js
module.exports = function(app, passport, config_db) {
   // Home page ===============================================================
   app.get('/', function(req, res) {
      res.render("index.ejs");
   });
   // Login ===================================================================
   app.get("/login", function(req, res) {
      // render the page and in any flash data if it exists
//      res.render('login.ejs', {message:req.flash("loginMessage")});
   });
   // Sign up =================================================================
//   app.post("/sign_up", function(req, res) {
//      console.log(req.body);
//      config_db.SignUp(req.body, res);
//      // render the page and pass in any flash data if it exists
////      res.render("signup.ejs", {message:req.flash('signupMessage')});
//   });
//   // process the sign-up form
//   app.post("/signup", passport.authenticate("local-signup", {
//      successRedirect: "/profile", // redirect to the secure profile section
//      failureRedirect: "/signup", // redirect back to the signup page if there is an error
//      failureFlash: true // allow flash messages
//   }));
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
    //
    app.post('/account-authenticate', function(req, res) {
        config_db.AccountAuthenticate(req.query.act, req.body, res);
    });
   app.post("/account_manager", function(req, res) {
       config_db.AccountManager(req.query.act, req.body, res);

   });
   app.post("/phase", function(req, res) {
      var type = req.query.type.toString();
      console.log(req.query);
      if (type == 'list') {
         console.log("phase--list");
         config_db.PhaseList(req.body, res);
      }
      if (type == 'update') {
         console.log("phase--update");
         config_db.PhaseUpdate(req.body, res);
      }
      if (type == 'delete'){
         console.log("phase--delete");
         config_db.PhaseDelete(req.body, res);
      }
      if (type == 'renew'){
         console.log("phase--renew");
         config_db.PhaseRenew(req.body, res);
      }
      if (type == 'renew_with_steps'){
         console.log("phase--renew_with_steps");
         config_db.PhaseRenewStep(req.body, res);
      }
   });
    app.post("/intersection", function(req, res) {
        var type = req.query.type.toString();
        console.log(req.query);
        if (type == 'list') {
            console.log("intersection--list");
            config_db.IntersectionList(req.body, res);
        }
    });
    app.post("/travelTime", function(req, res) {
        console.log(req.query);
        console.log(req.body);
        console.log("travel_time");
        config_db.TravelTimeProcess(req.body, res);
    });
    //route-manager
    app.post("/route-manager", function(req, res) {
        config_db.RouteManager(req.query.act, req.body, res);
    });
    //history
    app.post("/history", function(req, res) {
        config_db.History(req.query.purpose, req.body, res);
    });
    //device-manager
    app.post("/device-manager", function(req, res) {
        config_db.DeviceManager(req.query.act, req.body, res);
    });
    // web-settings
    app.post("/web-settings", function(req, res) {
        config_db.WebSettings(req.query.act, req.body, res);
    });
    // traffic light manager
    app.post("/light-manager", function(req, res) {
        config_db.TrafficLightManager(req.query.act, req.body, res);
    });
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