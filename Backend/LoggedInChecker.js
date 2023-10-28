function LoggedInChecker(req,res,next){
    let CookiesAvailable=req.cookies;
    try{
        if(CookiesAvailable.LoggedIn=="Company"){
            res.redirect("/dashboard/company");
        }
        else if(CookiesAvailable.LoggedIn=="User"){
            res.redirect("/dashboard/user");
        }
        else{
            next();
        }
    }
    catch(err){
        next();
    }
}
module.exports=LoggedInChecker;