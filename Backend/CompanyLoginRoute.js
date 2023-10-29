const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const {companyDataBase}=require("./RegisterRouteCompany");
const app=express();
// app.listen(3000);
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,"../public")));
const CompanyLoginRoute=express.Router();
app.use("/login/company",CompanyLoginRoute);

CompanyLoginRoute.route("/").get(send_company_login_page).post(Check_Company_Details);


//Login Backend Start
function send_company_login_page(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/companyLogin.html"));
}

function Check_Company_Details(req,res){
    let RecievedData=req.body;
    companyDataBase.findOne({"Email":RecievedData.Email}).then((docRecieved)=>{
        if(docRecieved.Password==RecievedData.Password){
            console.log("Company login successfull!");
            res.cookie("LoggedIn","Company");
            res.cookie("Name",docRecieved.CompanyName);
            res.cookie("Id",docRecieved.Email);
        }
        else{
            console.log("Wrong Password")
            res.status(500).json({message:"Wrong Password!"})
        }
    }).catch((err)=>{
        console.log(err);
        console.log("Company not in DataBase");
        res.status(500).json({message:"Login Failed"});
    })
}

module.exports=CompanyLoginRoute;