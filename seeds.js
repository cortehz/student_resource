var mongoose = require("mongoose");
var Course = require("./models/course");
var student = require("./models/student");

var data = [
    {
        name: "Clouds Rest",
        image: "https://tse3.mm.bing.net/th?id=OIP.oYQEmDazVroeEGbXizlCiQEsDC&pid=15.1&P=0&w=261&h=170",
        description: "Duis iaculis vitae nisl eu scelerisque. Vivamus tincidunt purus et metus bibendum, eu ultricies nunc scelerisque. Ut erat tellus, semper vitae hendrerit a, dictum cursus dolor. Sed condimentum quis urna et congue. Quisque at felis sit amet sapien pellentesque venenatis. Vestibulum vitae libero nunc. Aliquam consectetur velit feugiat libero commodo, nec maximus felis aliquet. Donec fermentum turpis eu neque feugiat fringilla. Duis aliquam, tortor in pellentesque congue, magna lorem rhoncus urna, ac vestibulum velit nisl eget libero. Mauris accumsan ultricies lacus, eu consequat arcu ultricies in. Praesent suscipit odio quis erat porta egestas. Duis eget tortor et nisi ullamcorper tincidunt vel sed sapien. Fusce velit nisl, volutpat ultrices magna et, vehicula finibus ante. Praesent a lectus quam. Praesent pharetra porttitor neque vitae molestie. Maecenas volutpat odio quis sem commodo posuere."
    },
    {
        name: "White Fool",
        image: "https://tse1.mm.bing.net/th?id=OIP.zsxUZ1MgIWcTHyyeE76EkAEsEs&pid=15.1&P=0&w=300&h=300",
        description: "Duis iaculis vitae nisl eu scelerisque. Vivamus tincidunt purus et metus bibendum, eu ultricies nunc scelerisque. Ut erat tellus, semper vitae hendrerit a, dictum cursus dolor. Sed condimentum quis urna et congue. Quisque at felis sit amet sapien pellentesque venenatis. Vestibulum vitae libero nunc. Aliquam consectetur velit feugiat libero commodo, nec maximus felis aliquet. Donec fermentum turpis eu neque feugiat fringilla. Duis aliquam, tortor in pellentesque congue, magna lorem rhoncus urna, ac vestibulum velit nisl eget libero. Mauris accumsan ultricies lacus, eu consequat arcu ultricies in. Praesent suscipit odio quis erat porta egestas. Duis eget tortor et nisi ullamcorper tincidunt vel sed sapien. Fusce velit nisl, volutpat ultrices magna et, vehicula finibus ante. Praesent a lectus quam. Praesent pharetra porttitor neque vitae molestie. Maecenas volutpat odio quis sem commodo posuere."
    },
    {
        name: "Who knows",
        image: "https://tse1.mm.bing.net/th?id=OIP.nRwelIbWAz7rOd6DthXn6wFNC7&pid=15.1&P=0&w=350&h=197",
        description: "Duis iaculis vitae nisl eu scelerisque. Vivamus tincidunt purus et metus bibendum, eu ultricies nunc scelerisque. Ut erat tellus, semper vitae hendrerit a, dictum cursus dolor. Sed condimentum quis urna et congue. Quisque at felis sit amet sapien pellentesque venenatis. Vestibulum vitae libero nunc. Aliquam consectetur velit feugiat libero commodo, nec maximus felis aliquet. Donec fermentum turpis eu neque feugiat fringilla. Duis aliquam, tortor in pellentesque congue, magna lorem rhoncus urna, ac vestibulum velit nisl eget libero. Mauris accumsan ultricies lacus, eu consequat arcu ultricies in. Praesent suscipit odio quis erat porta egestas. Duis eget tortor et nisi ullamcorper tincidunt vel sed sapien. Fusce velit nisl, volutpat ultrices magna et, vehicula finibus ante. Praesent a lectus quam. Praesent pharetra porttitor neque vitae molestie. Maecenas volutpat odio quis sem commodo posuere."
    }
]

function seedDB(){
    //remove all coursess
    Course.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // } 
        //     console.log("Removed coursess");

        //         //add a few coursess
        // data.forEach(function(seed){
        //     courses.create(seed, function(err, courses){
        //         if(err){
        //             console.log(err)
        //         } else{
        //             console.log("Added a courses");
        //             //create a student
        //             student.create(
        //                 {
        //                         text: "This is a great camp site",
        //                         author: "Homer"
        //                 }, function(err, student){
        //                     if(err){
        //                         console.log(err);
        //                     } else{
        //                         courses.students.push(student);
        //                         courses.save();
        //                         console.log("created new student");
        //                     }
                           
        //                 });
        //         }
        //     });
        // });
    });   
    
}

//sending the function above out(exporting)
module.exports = seedDB;

