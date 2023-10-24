const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.listen(3000);
app.use(express.json());

const RegisterRouteUser=require("./RegisterRouteUser");
const RegisterRouteCompany=require("./RegisterRouteCompany");

app.use("/register/user",RegisterRouteUser);
app.use("/register/company",RegisterRouteCompany);

