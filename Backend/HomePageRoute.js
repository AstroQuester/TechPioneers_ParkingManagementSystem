const express=require("express");
const path=require("path");
const app=express();
// app.listen(3000);
app.use(express.json());

app.use(express.static(path.join(__dirname,"../public")));
const HomePageRoute=express.Router();

app.use("/homePage",HomePageRoute);

HomePageRoute.route("/").get(send_companyRegisterPage);


function send_companyRegisterPage(req,res){
    res.sendFile(path.join(__dirname,"../Frontend/homePage.html"));
}

module.exports=HomePageRoute;