var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});



///AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to WhiteBoard " + user.username);
            res.redirect("/courses");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/courses", 
    failureRedirect: "/login"
}), function(req, res){
    
});


//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You've been Successfully Logged out");
    res.redirect("/courses");
});


module.exports = router;