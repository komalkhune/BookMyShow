const TheaterModel=require("../models/TheaterModel");
const bcrypt=require("bcrypt")
const { ObjectId } = require("mongodb");
const nodemailer=require("nodemailer");

exports.showtheaterresistrationfrm=(req,res)=>{
res.render("Theaterresistration",{message:""})
} 


exports.getTheaterdetails=(req,res)=>{


    let { tname, tseats, totime, tmail, tlocation, tcountry, tstate, tcity, tpass } = req.body;

  // let Theaterdata = { tname, tseats, totime, tmail, tlocation, tcountry, tstate, tcity };


 

   if ( !tname || !tseats || !totime || !tmail || !tlocation || !tcountry || !tstate || !tcity || !tpass ) {  
    return res.render("Theaterresistration",{message:"All fields are required"});
  }

  //  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  
  // if(!pattern.test(tmail)){
  //  return res.render("Theaterresistration",{message:"Enter Valid Email"});
  // }else{


     let id = req.body.id;

  let Theaterdata={ tname, tseats, totime, tmail, tlocation, tcountry, tstate, tcity }=req.body
    
   let TheaterName=req.body.tname;
   let Theatermail=req.body.tmail;
    let con =req.body.tcountry;
    let st =req.body.tstate;
    let ci =req.body.tcity;
      console.log("dadadadadadadadadadadadada")
      console.log(con)
      console.log(st)
      console.log(ci)



      console.log(TheaterName)
      console.log(Theatermail)
      
   

    bcrypt.hash(req.body.tpass, 10).then((success)=>{
      console.log(success)
       let instance=new TheaterModel();

        instance.theaterinfo(id, Theaterdata, success)
         .then((success)=>{

          // tid=success[0]._id
          // let ttid=new ObjectId(tid)
        
          console.log(success)
          if(success.acknowledged===true){

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                  user: "khunekomal08@gmail.com",
                  pass: "notwrpfavobzgkzg",
                },
            });

            transporter.sendMail({
              from: '"Movie Project Mail" <khunekomal08@gmail.com>', // sender address
              to: Theatermail, // list of recipients
              subject: "About Signing", // subject line
              text: "", // plain text body
              html: `<h1>Welcome ${TheaterName} </h1><p>Thank You for signing up</p>` , // HTML body
              })

              .then((info)=>{
                 console.log("Mail sent", info.response);
              })
              .catch((err)=>{
                 console.log("Mail error:", err);
              });


            res.render("Theaterlogin", { message:""} )

          }else if(success.status==="Existed"){
             res.render("Theaterresistration",{message:"This theater is already taken"});
         }
          
        }).catch((error)=>{
          console.log(error)
        });
    }).catch((error)=>{
      console.log(error)
    })

  //  }

  }
  



exports.showtheaterlogin=(req,res)=>{
  res.render("Theaterlogin", {message:""}) 
}

exports.gettheaterlogindetails=(req,res)=>{  
  
  let email=req.body.email;
  let password=req.body.pass
  console.log(email)
  console.log(password)

  if (!email && !password) {
    return res.render("Theaterlogin", { message: "Email and Password are required"});
}

if (!email) {
    return res.render("Theaterlogin", { message: "Email is required"});
}

if (!password) {
    return res.render("Theaterlogin", { message: "Password is required"});
}



  let instance=new TheaterModel();

  let output=instance.logininfo(email)
  output.then((success)=>{

  //  let idid=req.query.id;

    console.log(success)
    console.log("ppppppppp")
    console.log(success)
    if(success.length===0){
      res.render("Theaterlogin", {message:"username is not valid"})
    }else{
      let hashedpass=success[0].Theaterpass;

      let uoid=success[0]._id

      console.log(hashedpass)
      
      console.log("uoid khali ahe")
      
      console.log(uoid)

      // let theater_id=req.session.uoid
      // console.log(theater_id)

      bcrypt.compare(password, hashedpass)    
      .then((success)=>{

        if(success){
          console.log("password match zala")

          console.log(success)

            res.render("Otpverify",  { message: "OTP sent to your email",email: email})

          let otp=Math.round(Math.random()*100000);

          console.log(otp)
          req.session.otp = Number(otp);
          console.log(req.session.otp)

          console.log("Session after saving OTP:", req.session.otp);

          // req.session.uoid=uoid;
          req.session.uoid = uoid.toString();

          // ⏱ set expiry (3 minutes)
            req.session.otpExpiry = Date.now() + 3 * 60 * 1000;
            // req.session.otpExpiry = Date.now() + 60000 also write this;




           const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                  user: "khunekomal08@gmail.com",
                  pass: "notwrpfavobzgkzg",
                },
            });

            transporter.sendMail({
              from: '"Movie Project Mail" <khunekomal08@gmail.com>', // sender address
              to: email,  // list of recipients
              subject: "About Signingg", // subject line
              text: "", // plain text body
              html: `<p>Your OTP for login is ${otp}.</p>  
                 <p>Please do not share this code with anyone. It is valid for 3 minutes.</p>` , // HTML body
              });

          //  res.render("Insertmoviedetails",{tuid: req.session.uoid, message:""})
           
          
        }else{
          res.render("Theaterlogin", {message:"Password is not valid"})
        }

      }).catch((error)=>{
        console.log(error)
      });
     
    }
  }).catch((error)=>{
    console.log(error)
  })
 
}



exports.getallTheater=(req,res)=>{

 let idid=req.query.fid;
      // let idid=idid;
       console.log("Logged Theater ID:", idid);
  //  console.log("tid")


  let instance=new TheaterModel();

  instance.alltheater(idid)
  .then((success)=>{
   

    console.log(success)
    if (success.length != 0){
      res.render("Theaters", {tdata:success, tuid:idid})
    }else{
      res.render("Dashboard" )
    }

  }).catch((error)=>{
    console.log(error)
  })

  
}



exports.edittheaterPage = (req,res)=>{
    let id = req.query.id;
     let fid = req.query.fid; 

    let instance=new TheaterModel();
    instance.gettheaterById(id).then((success)=>{
        console.log(success)
        res.render("Edittheater", {theaterdata: success, fid:fid});
    }).catch((error)=>{
    console.log(error)
  });
}




exports.updateTheater = (req,res)=>{
    let id = req.body.id;
    let fid = req.body.fid;   


    let updatedtData = {
        TheaterName: req.body.tname,
        Availableseats: req.body.tseats,
        Openingtime: req.body.totime,
        Theatermail: req.body.tmail,
        Theaterpass: req.body.pass,
        Theaterlocation: req.body.tlocation,
        Country: req.body.tcountry,
        State: req.body.tstate,
        City: req.body.tcity
 
    };

    let instance=new TheaterModel();
    
    instance.updatetheater(id, updatedtData)
    .then((success)=>{
      console.log(success)
      console.log("upkpkpkpkp")
      // console.log(tid)

         res.redirect("/theaters?fid=" + fid);
    })
    .catch((error)=>{
        console.log(error);
    });
}


exports.verifyLoginOTP = (req,res)=>{

   let userOTP = Number(req.body.uotp);
  // let sotp = req.body.sotp;
  // req.session.otp = otp;

  // let otpp= req.session.otp
 console.log("Full session:", req.session);
console.log("OTP from session:", req.session.otp);
  console.log("otpotpotpotpotp")
  console.log(userOTP)
  console.log(req.session.otp)


    //  Check if OTP exists
  if(!req.session.otp){
    return res.render("Otpverify", { message: "Session expired. Please login again.", Expire: req.session.otpExpiry || 0 });
  }

  //  Check expiry
  if(Date.now() > req.session.otpExpiry){
    
    // clear old OTP
    req.session.otp = null;
    req.session.otpExpiry = null;

    return res.render("Otpverify", { message: "OTP expired. Please login again." });
  }





  if(userOTP ===   req.session.otp ){

    let uoid = req.session.uoid;

    res.render("Insertmoviedetails",{tuid: uoid, message:""})

  }else{
    res.render("Otpverify", { message: "You Enter Invalid OTP "});
  }
};

















