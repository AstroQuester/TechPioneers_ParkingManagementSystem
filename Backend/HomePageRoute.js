const express=require("express");
const app=express();
// app.listen(3000);
app.use(express.json());


const HomePageRoute=express.Router();

app.use("/homePage",HomePageRoute);

HomePageRoute.route("/").get(send_companyRegisterPage);


function send_companyRegisterPage(req,res){
    res.sendFile("C:/Users/Kartik/Desktop/TechPioneers_ParkingManagementSystem/Frontend/homePage.html");
}

module.exports=HomePageRoute;