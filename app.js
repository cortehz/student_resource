var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var Course = require("./models/course");
var Student = require("./models/student");
var seedDB = require("./seeds");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");


//route files
var studentRoutes = require("./routes/students"),
    courseRoutes = require("./routes/courses"),
    indexRoute = require("./routes/index")


mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//getting the directory that the script was created in
app.use(express.static(__dirname + "/public"));
app.use( methodOverride ("_method"));  //for out PUT requests
app.use(flash());


// seedDB();

//passport config
app.use(require("express-session")({
    secret: "Bage bage is the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//make sure currentUser is available to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//requiring the routes
app.use(indexRoute);
app.use(studentRoutes);
app.use(courseRoutes);


app.listen(3000, function(){
    console.log("WhiteBoard App server is running")
});