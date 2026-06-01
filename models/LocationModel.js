const { getdb } = require("../utils/database");

class Ulocation{

    getlocation(country,state,city){

        let db=getdb();
        

        // return db.collection("utheater").aggregate([ {$match: { Country: country, State: state, City: city }}, { $lookup: {from: "mvdetails",localField: "_id", foreignField: "forid",  as: "movies"} }] )
     return db.collection("mvdetails").aggregate([
  {
    $match: { Status: "1"}  
  },
  {
    $lookup: {
      from: "utheater",
      localField: "forid",
      foreignField: "_id",
      as: "theaterDetails"
    }
  },
  {
    $unwind: "$theaterDetails"  
  },
  {  $match: {
      "theaterDetails.City": city,
      "theaterDetails.State": state,
      "theaterDetails.Country": country
    }}

])
        .toArray()
        .then((success)=>{
           console.log(success)
           return success;
        }).catch((error)=>{
           console.log(error)
        })


    }



    searchByName(searchtext){
      let db=getdb();

      
      return db.collection("mvdetails").aggregate([{$match:{MovieName:searchtext}},{$lookup:{from:"utheater",localField:"forid",foreignField:"_id",as:"theaterdata"}}])
      .toArray()
        .then((success)=>{
           console.log(success)
           return success;
        }).catch((error)=>{
           console.log(error)
        })
    }



}


module.exports=Ulocation;