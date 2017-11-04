var mongoose = require("mongoose");

//schema setup
var courseSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
});

//compile schema to a model and export
module.exports = mongoose.model("Course", courseSchema);