var express = require("express");
var router = express.Router();
var Course = require("../models/course");
var middleware = require("../middleware/index");


router.get("/courses", function(req, res){
    
        //get all courses from DB
        Course.find({}, function(err, allCourses){
            if(err){
                console.log(err);
            } else {
                res.render("courses/index", {courses: allCourses, currentUser: req.user});
            };
        });
      
    });
    
    router.post("/courses", middleware.isLoggedIn, function(req, res){
        //get course data from form and push to course array
        var name = req.body.name;
        var price = req.body.price;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
               id: req.user._id,
               username: req.user.username
            }
        var newCourse = {name: name, image: image, price: price, description: desc, author: author}
    
     
        //create a new course and save to db
        Course.create(newCourse, function(err, newlyCreated){
            if(err){
                req.flash("error", "You need to be logged in to do that");
            } else {
                //redirect to courses page
                res.redirect("/courses");
            }
        });
     
    });
    
    //creating a new course view
    router.get("/courses/new", middleware.isLoggedIn, function(req, res){
        req.flash("error", "You need to be logged in to do that");
        res.render("courses/new");
    });
    
    //SHOW-VIEW: shows more info about a particular course
    //this has to come after the course/new above(RESTful routing)
    router.get("/courses/:id", function(req, res){
        //find course with provided id and populate students on that ground
        Course.findById(req.params.id).populate("students").exec(function(err, foundCourse){
            if(err || !foundCourse){
                req.flash("error", "course not found");
                res.redirect("back");
            } else {
                console.log(foundCourse);
                //render show template with that course
                res.render("courses/show", {course: foundCourse});
            }
        })
    });


    //edit course route
    router.get("/courses/:id/edit", middleware.checkCourseOwnership, function(req, res){

        // Is user logged in to be able edit 
           Course.findById(req.params.id, function(err, foundCourse){
                res.render("courses/edit", {course: foundCourse});    
                           
            });      
            
    });

    //update course route
    router.put("/courses/:id", middleware.checkCourseOwnership, function(req, res){
        Course.findByIdAndUpdate(req.params.id, req.body.course, function(err, updatedCourse){
            if(err){
                     req.flash("You dont have permission to do that");
                     res.redirect("/courses");
            } else {                
                    res.redirect("courses/" + req.params.id);                           
            }
        
        });      
       
    });


    //route to destroy course
    router.delete("/courses/:id", middleware.checkCourseOwnership, function(req, res){
        Course.findByIdAndRemove(req.params.id, function(err){
            if(err){
                req.flash("What are you doing deleting a ground you didnt create. Not Cool Bro");
                res.redirect("/courses");
            } else {                
                    res.redirect("/courses");                           
            }
        
        });        
    });


           

    module.exports = router;