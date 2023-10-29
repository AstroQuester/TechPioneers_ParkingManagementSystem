const express=require("express");
const path=require("path");
const app=express();
// app.listen(3000);
app.use(express.json());
const {companyDataBase}=require("./RegisterRouteCompany");

const UserDashboard=express.Router();
app.use("/dashboard/user",UserDashboard);

UserDashboard.route("/").get(send_userDashboard_page).post(send_Query_Result);

function send_userDashboard_page(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/userDashboard.html"));    
}

async function send_Query_Result(req,res){
    let CompaniesData=await companyDataBase.find();
    res.send(CompaniesData);
}

module.exports=UserDashboard;