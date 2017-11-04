var mongoose = require("mongoose");

//schema setup
var studentSchema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

//compile schema to a model and export
module.exports = mongoose.model("Student", studentSchema);