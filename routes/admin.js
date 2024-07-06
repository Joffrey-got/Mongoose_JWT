const express = require("express");
const router = express.Router();
const adminMiddleware = require('../middlewares/admin');
const { Admin, Course } = require("../db"); 
router.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username:username,
        password:password
    })
    .then(
        res.json({
            msg:"Admin created successfully"
        })
    )
    
});
 
router.post("/courses",adminMiddleware,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //zod 
    const newCourse = await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })
    res.json({
        message:"course has been created successfully",
        Courseid:newCourse._id
    })
});

router.get("/courses",adminMiddleware,async (req,res)=>{
   const allCourses = await Course.find({});
   res.json({
        courses:allCourses
   })
});
module.exports = router;