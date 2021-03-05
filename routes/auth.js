const express = require("express");
const router = new express.Router();
const bcrypt = require('bcrypt');
const UserModel = require("./../models/User");
//const uploader = require("./../config/cloudinary");
//const protectAdminRoute = require("./../middlewares/protectAdminRoute");

//POST signin

router.post("/signin", async (req, res, next)=>{
        
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
  
    if (!foundUser) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {

        req.flash("error", "Invalid credentials");
        res.redirect("/signin");

      } else {
        const userObject = foundUser.toObject();
        delete userObject.password; 
        // console.log(req.session, "before defining current user");
        req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
  
        req.flash("success", "Successfully logged in...");
        res.redirect("/");
      }
    }
});
    

//Post signup

router.post("/signup", async (req, res, next)=>{
    
    const newUser  = {...req.body}
    console.log(newUser)
    
    try {
    
    const newUser  = {...req.body};
    const foundUser = await UserModel.findOne({email:newUser.email})

        if (foundUser) {
            res.render("signup.hbs", { msg: "Email already signed up" });
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPassword;
            await UserModel.create(newUser);
            res.render("/signin", {msg:"Congrats ! You are now registered !"});
        } 

    }catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
        errorMessage += err.errors[field].message + "\n";
    } res.render("signup.hbs", { msg: errorMessage });
    }

});


//GET 






module.exports = router;
