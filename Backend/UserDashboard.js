const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const app=express();
// app.listen(3000);
app.use(express.json());
app.use(cookieParser());

const UserDashboard=express.Router();
app.use("/dashboard/user",UserDashboard);

UserDashboard.route("/").get(send_userDashboard_page);

function send_userDashboard_page(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/userDashboard.html"))
}

module.exports=UserDashboard;