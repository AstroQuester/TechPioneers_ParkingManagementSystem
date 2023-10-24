const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
// app.listen(3000);
app.use(express.json());

//This file is for Registering user to database

//Setting up DataBase

const database_link="mongodb+srv://TechPioneers:KvSavp7ddFYnl5cm@techpioneerspms.kfjlypm.mongodb.net/?retryWrites=true&w=majority"; 

mongoose.connect(database_link).then(
    function(){
        console.log("User DataBase Connected!");
    }
).catch(function(err){
    console.log("DataBase Connection Failed!!");
})

// Schema of User Database
const userSchema=mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
        // minLength:10,
    },
    AadharCardNumber:{
        type:Number,
        required:true
        // minLength:12
    },
    VehicleNumber:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    }
});



//Setting up Registering part backend

const UserRegisterRouter=express.Router();

app.use("/register/user",UserRegisterRouter);

UserRegisterRouter.route("/").get(send_userRegisterPage).post(register_user_in_database);

const userDataBase=mongoose.model('userDataBase',userSchema);

function send_userRegisterPage(req,res){
    
    res.sendFile(path.join(__dirname,"../Frontend/userRegister.html"));
}
function register_user_in_database(req,res){
    //storing data recieved data from frontend form
    let newUser=req.body;
    // storing in database
    createUser(newUser).then(()=>{
        console.log("Registration Successfull!");
    }).catch((err)=>{
        console.log(err);
        console.log("Registeration Failed!");
        
    });

}
async function createUser(userDetails){
    let resp=await userDataBase.create(userDetails);// creating entry in database
    console.log(resp);
}


//this line is so the we can use it in app.js
module.exports=UserRegisterRouter;