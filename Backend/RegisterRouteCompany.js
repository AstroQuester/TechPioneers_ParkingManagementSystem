const express=require("express");
const mongoose=require("mongoose");
const app=express();
// app.listen(3000);
app.use(express.json());

//This file is for Registering Company to database

//Setting up DataBase

const database_link="mongodb+srv://TechPioneers:KvSavp7ddFYnl5cm@techpioneerspms.kfjlypm.mongodb.net/?retryWrites=true&w=majority"; 

mongoose.connect(database_link).then(
    function(){
        console.log("DataBase Connected!");
    }
).catch(function(err){
    console.log("DataBase Connection Failed!!");
})

// Schema of User Database
const companySchema=mongoose.Schema({
    CompanyName:{
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
    ContactNumber:{
        type:Number,
        required:true
        // minLength:10,
    },
    Location:{
        type:String,
        required:true
    },
    RowsCount:{
        type:Number,
        required:true
    },
    ColumnCount:{
        type:Number,
        required:true
    }
});


//Setting up Registering part backend

const CompanyRegisterRouter=express.Router();

app.use("/register/company",CompanyRegisterRouter);

CompanyRegisterRouter.route("/").get(send_companyRegisterPage).post(register_company_in_database);

const companyDataBase=mongoose.model('companyDataBase',companySchema);

function send_companyRegisterPage(req,res){
    res.sendFile("C:/Users/Kartik/Desktop/TechPioneers_ParkingManagementSystem/Frontend/companyRegister.html");
}

function register_company_in_database(req,res){
    //storing data recieved data from frontend form
    let newCompany=req.body;
    // storing in database
    createCompany(newCompany).then(()=>{
        console.log("Registration Successfull!");
    }).catch((err)=>{
        console.log(err);
        console.log("Registeration Failed!");
    });

}

async function createCompany(companyDetails){
    let resp=await companyDataBase.create(companyDetails);// creating entry in database
    console.log(resp);
}

//this line is so the we can use it in app.js
module.exports=CompanyRegisterRouter;