const express=require("express");
const { showForm, getSignupDetails, getLoginDetails, loginfrm } = require("../controllers/signpprocess");
const { showfpage, movieDatainsert, getmoviedetails, showMovies, deleteMovie, editMoviePage, updateMovie, searchmovies, showMoviestheater,  } = require("../controllers/movies");
const { getTheaterdetails, showtheaterresistrationfrm, showtheaterlogin, gettheaterlogindetails, getallTheater, edittheaterPage, updateTheater, sendMail, verifyLoginOTP } = require("../controllers/theaters");
const { uploadfile } = require("../controllers/uploadfile");
const { getLocation, searchwithName } = require("../controllers/location");
const { bookNow, bookConfirm } = require("../controllers/booknow");
const { seatbook, payment, confirmseatbook, ticket, logout } = require("../controllers/seatbook");


const router=express.Router();



// router.get("/sendmail", sendMail)

router.post("/upload",uploadfile);
router.get("/up",(req,res)=>{
  res.render("Upload");
})

// router.get("/logout", logout);

router.get("/ticketinfo/",ticket);
router.post("/seatbookinginfo",confirmseatbook);

router.get("/paymentpage/", payment);
router.post("/moviebookinginfo",seatbook);

router.get("/bookconfirm", bookConfirm)
router.get("/booknow", bookNow);
router.post("/ulocation", getLocation);

router.post("/verifyloginotp",verifyLoginOTP);


router.get("/theaterdetails",(req,res)=>{
    res.render("Theaterdetails", {uid:""})
})
router.get("/dashboard",(req,res)=>{
    res.render("dashboard",{uid:""});    
})

router.post("/updatetheater",updateTheater);
router.get("/edittheater",edittheaterPage);
router.get("/theaters", getallTheater);
router.get("/moviewiththeater", showMoviestheater);
router.get("/showtheaterlogin", showtheaterlogin);
router.post("/theaterlogpage",gettheaterlogindetails);
router.get("/theaterresistration",showtheaterresistrationfrm );
router.post("/theaterform",getTheaterdetails);




router.post("/searchmovies", searchwithName)
router.post("/searchmovie", searchmovies)
router.get("/editmovie",editMoviePage);
router.post("/updatemovie",updateMovie);
router.get("/deletemovie",deleteMovie);
router.get("/movies",showMovies)
router.get("/showmovieinsertfrm",movieDatainsert)
router.post("/getmovieinfo",getmoviedetails)
router.get("/loginfrm",loginfrm)
router.post("/login",getLoginDetails)
router.post("/signup",getSignupDetails)
router.get("/showsignupform",showForm)

router.get("/showfpage",showfpage)
router.get("/",(req,res)=>{
res.send("this is the signip app")
})


module.exports=router;