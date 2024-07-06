const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
app.use(bodyparser.json());
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.listen(3000,()=>{
    console.log("your server is running on port 3000");
});