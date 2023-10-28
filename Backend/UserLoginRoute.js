const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const {userDataBase}=require("./RegisterRouteUser");
const app=express();
// app.listen(3000);
app.use(express.json());
app.use(cookieParser());

const UserLoginRoute=express.Router();
app.use("/login/user",UserLoginRoute);

UserLoginRoute.route("/").get(send_user_login_page).post(Check_User_Details);


//Login Backend Start
function send_user_login_page(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/userLogin.html"));
}

function Check_User_Details(req,res){
    let RecievedData=req.body;
    userDataBase.findOne({"Email":RecievedData.Email}).then((docRecieved)=>{
        if(docRecieved.Password==RecievedData.Password){
            console.log("User login successfull!");
            res.cookie("LoggedIn","User");
            res.cookie("Name",docRecieved.FirstName);
            res.cookie("Id",docRecieved.Email);
            res.status(200);
            res.end();
        }
        else{
            console.log("Wrong Password")
            res.status(500);
            res.end();
        }
    }).catch((err)=>{
        console.log(err);
        console.log("User not in DataBase");
        res.status(500).json({message:"Login Failed"});
    })
}

module.exports=UserLoginRoute;