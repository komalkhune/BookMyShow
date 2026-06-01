
const SignupModel = require("../models/SignupModel");
const bcrypt=require("bcrypt")

exports.showForm=(req,res)=>{
    res.render("Signup",{message:""});
}


exports.getSignupDetails=(req,res)=>{
    console.log(req.body.uname);
    console.log(req.body.upass);

    let username=req.body.uname;
    let password=req.body.upass;

      if (!username || !password) {
        return res.render("signup", { message: "All fields are required"});
    }

    if (
       username.includes("@") &&
       username.includes(".") &&
       username.indexOf("@") > 0 &&
       username.indexOf(".") > username.indexOf("@")
    ) {

         bcrypt.hash(password,10).then((success)=>{
         console.log(success)
     
             let instance=new SignupModel();
             let result=instance.register(username,success);
             result.then((success)=>{
              console.log("In controller")
              console.log(success)
             if(success.acknowledged===true){
                res.render("Login", {message:""});
             }else if(success.status==="Existed"){
                 res.render("Signup",{message:"Username is already taken"});
             }
     
             }).catch((error)=>{
              console.log("In controller")
              console.log(error)
             });
         }).catch((error)=>{
             console.log(error);
         })

    } else {
     res.render("signup",{message:"Invalid Email"});
}


   

}


exports.loginfrm=(req,res)=>{
    res.render("Login",{message:""})
}



exports.getLoginDetails=(req,res)=>{
      console.log(req.body.uname);
    console.log(req.body.upass);

    let username=req.body.uname;
    let password=req.body.upass;

     if (!username || !password) {
        return res.render("Login",{message:"All fields are required"});
    }else{

    let instance=new SignupModel();
    let result=instance.fetchDetails(username);
    result.then((success)=>{

        console.log("In controller")
        let umail=success[0].username;
        req.session.umail=umail;
        console.log( req.session.umail)
        console.log(success)
        console.log("success.username")






        req.session.save((err) => {

        if(err){
            console.log(err);
            console.log("Session notSaved");
        }

        console.log("Session Saved");
    });





        
         
        if(success.length===0 ){

             res.render("Login",{message:"Username or passwod is invalid"});
        }else{
             let hashedPass = success[0].pass;
             let uid=success[0]._id;

            bcrypt.compare(password, hashedPass)
            .then((success)=>{
                if(success){
                    req.session.uid=uid;
                    res.render("LocationSet", {message:"Login Successfully"})
                }else{
                   res.render("Login",{message:" passwod is invalid"});
                }
                
            }).catch((error)=>{
                console.log(error)
            })
           
        }

    }).catch((error)=>{
        console.log("In controller") 
        console.log(error)

    })
    }
}
