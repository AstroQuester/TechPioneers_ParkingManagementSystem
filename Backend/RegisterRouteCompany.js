const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require('path');
// app.listen(3000);
app.use(express.json());

//This file is for Registering Company to database

//Setting up DataBase

const database_link="mongodb+srv://TechPioneers:KvSavp7ddFYnl5cm@techpioneerspms.kfjlypm.mongodb.net/?retryWrites=true&w=majority"; 

mongoose.connect(database_link).then(
    function(){
        console.log("Company DataBase Connected");
    }
).catch(function(err){
    console.log("Company DataBase Connection Failed");
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

CompanyRegisterRouter.route("/").get(send_companyRegisterPage).post(register_company_in_database,);

const companyDataBase=mongoose.model('companyDataBase',companySchema);

function send_companyRegisterPage(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/companyRegister.html"));
}

async function register_company_in_database(req,res){
    //storing data recieved data from frontend form
    let newCompany=req.body;
    // storing in database
    try{
        await createCompany(newCompany)
        console.log("Registeration Successfull!");
        res.status(200).json({message:"Success"});
    }catch(err){
        console.log(err);
        console.log("Registeration Failed!");
        res.status(500).json({message:"Failure"});
    }
}

async function createCompany(companyDetails){
    let result=await companyDataBase.create(companyDetails);
    console.log(result);
}
//this line is so the we can use it in app.js
module.exports={CompanyRegisterRouter,companyDataBase};