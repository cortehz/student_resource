var express = require("express");
var router = express.Router();
var Course = require("../models/course");
var Student = require("../models/student");
var middleware = require("../middleware/index");



////students route
router.get("/courses/:id/students/new", middleware.isLoggedIn, function (req, res) {
    //find Course by id
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            console.log(err);
        } else {
            res.render("students/new", { course: course });
        }
    });

});


router.post("/courses/:id/students", middleware.isLoggedIn, function (req, res) {
    //lookup Course by id
    Course.findById(req.params.id, function (err, course) {
        if (err) {
            console.log(err);
            res.redirect("/courses");
        } else {
            //create Courses students
            Student.create(req.body.student, function (err, student) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to student
                    student.author.id = req.user._id;
                    student.author.username = req.user.username;

                    //save student
                    student.save();

                    course.students.push(student);
                    course.save();
                    req.flash("success", "Student Registered");
                    res.redirect('/courses/' + course._id);
                }
            });
        }
    });

});


//students edit route
router.get("/courses/:id/students/:student_id/edit", middleware.checkStudentOwnership, function (req, res) {
    Course.findById(req.params.id, function (err, foundCourse) {
        if (err || !foundCourse) {
            req.flash("error", "No Course Not Found");
            res.redirect("back");
        }
        Student.findById(req.params.student_id, function (err, foundStudent) {
            if (err) {
                res.redirect("back");
            } else {
                res.render("students/edit", { course_id: req.params.id, student: foundStudent });
            }
        });
    });
});


//students update route
router.put("/courses/:id/students/:student_id", middleware.checkStudentOwnership, function (req, res) {

    Student.findByIdAndUpdate(req.params.student_id, req.body.student, function (err, updatedstudent) {
        if (err) {
            req.flash("You dont have permission to edit this student");
            res.redirect("back");
        } else {
            res.redirect("/courses/" + req.params.id);
        }
    });
});


//students destroy route
router.delete("/courses/:id/students/:student_id", middleware.checkStudentOwnership, function (req, res) {
    Student.findByIdAndRemove(req.params.student_id, function (err) {
        if (err) {
            req.flash("You dont have permission to delete this");
            res.redirect("back");
        } else {
            req.flash("success", "Student deleted");
            res.redirect("/courses/" + req.params.id);
        }

    });
});




module.exports = router;