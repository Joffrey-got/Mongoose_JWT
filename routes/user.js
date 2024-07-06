const express = require("express");
const router = express.Router();
const usermiddleware = require('../middlewares/user');
const { User, Course } = require("../db");
const { default: mongoose } = require("mongoose");
router.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    User.create({
        username,
        password,
    }).then(res.json({
        message:"user created succesfully"
    }))
});

router.post("/courses/:courseId",usermiddleware,(req,res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;
    User.updateOne({
        //zod
        username:username,
        password:password
    },{
        "$push":{
            purchasedCourses:new mongoose.Types.ObjectId(courseId)
        }
    }).then(res.json({
        message:"course purchased successfully"
    }))
});

router.get("/purchasedCourse",usermiddleware,async (req,res)=>{
    const username = req.body.username;
    const ourUser = await User.findOne({
        username:username,
    });
    const pp = ourUser.purchasedCourses;
    let mycourses = [];
    for(let i=0;i<pp.length;i++){
        mycourses.push(pp[i])
    }
    let my_C = [];
    for(let j=0;j<mycourses.length;j++) {
        let x = await Course.findOne({_id:mycourses[j]});
        my_C.push(x);
    }
    res.json({
        all_Courses:my_C
    })
});

router.get("/courses",async (req,res)=>{
    const allcourses = await Course.find({});
    console.log(allcourses);
    res.json({
        courses:allcourses
    })
});
module.exports = router; 