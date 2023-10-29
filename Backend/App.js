const express=require("express");
const cookieParser=require("cookie-parser");
const path=require("path");
const app=express();
app.listen(3000);
app.use(express.json());
app.use(cookieParser());

const {UserRegisterRouter}=require("./RegisterRouteUser");
const {CompanyRegisterRouter}=require("./RegisterRouteCompany");
const HomePageRoute=require("./HomePageRoute.js");
const UserLoginRoute=require("./UserLoginRoute");
const CompanyLoginRoute=require("./CompanyLoginRoute");
const LoggedInChecker=require("./LoggedInChecker");
const UserDashboard=require("./UserDashboard");

app.get("/",(req,res)=>{res.redirect("/homePage");})
app.use("/homePage",LoggedInChecker,HomePageRoute)
app.use("/register/user",LoggedInChecker,UserRegisterRouter);
app.use("/register/company",LoggedInChecker,CompanyRegisterRouter);
app.use("/login/user",LoggedInChecker,UserLoginRoute);
app.use("/login/company",LoggedInChecker,CompanyLoginRoute);
app.use("/dashboard/user",UserDashboard);
app.route("/booking/:id").get((req,res)=>{
    res.sendFile(path.join(__dirname,"../Frontend/maintainence.html"));
});