const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sjangid14115:hxOwlZo05rNCxvIO@cluster0.kyf7jzt.mongodb.net/new_app");

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String,
});
const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const Courses = new mongoose.Schema({
    title : String,
    description : String,
    imageLink:String,
    price:Number
})

const Admin = mongoose.model('Admin',AdminSchema);
const User = mongoose.model('User',UserSchema);
const Course = mongoose.model('Course',Courses);


module.exports = {
    Admin,
    User,
    Course
}