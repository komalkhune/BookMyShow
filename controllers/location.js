const Ulocation=require("../models/LocationModel")

exports.getLocation = (req, res) => {

  let country = req.body.country;
  let state = req.body.state;
  let city = req.body.city;

  console.log("Country:", country);
  console.log("State:", state);
  console.log("City:", city);

  if(country === "" || state === "" || city === ""){
    res.render("LocationSet", {message:"Please select Correct location"})
  }else{

  let instance=new Ulocation();

  instance.getlocation(country,state,city).then((success)=>{

    console.log("Location w")
    
    // if(success!=0){
    console.log("Location wise data")  
    console.log(success)
    res.render("CitywiseMovie",{citymovie:success})
    // }
  }).catch((error)=>{
    console.log(error)
    console.log("Location")
  });

  }

  
};



exports.searchwithName=(req,res)=>{
  let searchtext=req.body.search;

  let instance=new Ulocation();
  instance.searchByName(searchtext).then((success)=>{
   console.log("search movie by name new logic")
   console.log(success)
    res.render("Singlemovie", { singlemovie: success });
  }).catch((error)=>{
   console.log(error)
  })


}