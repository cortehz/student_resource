var middlewareObj = {};
var Course = require("../models/course");
var Student = require("../models/student");


//Course middleware

middlewareObj.checkCourseOwnership = function(req, res, next){
     // Is user logged in to be able edit 
     if(req.isAuthenticated()){
        Course.findById(req.params.id, function(err, foundCourse){
            if(err || !foundCourse){
                req.flash("error", "Course not found");
                res.redirect("back");
            } else {     
                //does the user own the Course? 
                if(foundCourse.author.id.equals(req.user.id)){
                    next();  
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back")
                }                                                      
            }                    
        });      
    } else {

            res.redirect("back");
    }
}



//Student middleware

middlewareObj.checkStudentOwnership = function(req, res, next){
    // Is user logged in to be able edit 
    if(req.isAuthenticated()){
        Student.findById(req.params.student_id, function(err, foundStudent){
            if(err || !foundStudent){
                req.flash("error", "Student Not Found");
                res.redirect("back");
            } else {     
                //does the user own the student? 
                if(foundStudent.author.id.equals(req.user.id)){
                    next();  
                } else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back")
                }                                                      
            }                    
        });      
    } else {
            res.redirect("back");
    }
}

//isLoggedIn middleware
middlewareObj.isLoggedIn = function(req, res, next){
    // Is user logged in to be able edit 
        if(req.isAuthenticated()){
            return next();
        }

        req.flash("error", "You need to be Logged in to do that");
        res.redirect("/login");
    }

module.exports = middlewareObj;