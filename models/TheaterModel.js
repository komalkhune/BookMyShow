const {getdb}=require("../utils/database")
const { ObjectId } = require("mongodb");

class TheaterModel{

    theaterinfo(id, tdata, pass){

        let db=getdb();

        let result=db.collection("utheater").find({TheaterName:tdata.tname}).toArray().then((success)=>{
            if(success.length===0){

                return db.collection("utheater").insertOne({TheaterName:tdata.tname, Availableseats:tdata.tseats, Openingtime:tdata.totime, Theatermail:tdata.tmail, Theaterpass:pass, Theaterlocation:tdata.tlocation, Country:tdata.tcountry, State:tdata.tstate, City:tdata.tcity })
                   .then((success)=>{
                      console.log(success)
                      return success
                   }).catch((error)=>{
                      console.log(error);
                   });

            }else{
               return {status:"Existed"}

            }

            }).catch((error)=>{
                console.log(error)
            })
        return result;

    }


    logininfo(email){
        let db=getdb();

        return db.collection("utheater").find({ Theatermail:email}).toArray()
        .then((success)=>{
            console.log("ka yete")
            console.log(success)
         return success;
        }).catch((error)=>{
            console.log(error)
        })
    }



    alltheater(idid){
        
        let db=getdb();

        return db.collection("utheater").find({_id: new ObjectId(idid)}).toArray()
        .then((success)=>{
            console.log(success)
            return success
        }).catch((error)=>{
            console.log(error)
        })
    }





    gettheaterById(id){
      let db = getdb();

       return db.collection("utheater").findOne({ _id: new ObjectId(id) })
       .then((success)=>{
        console.log(success) 
        return success;
      }).catch((error)=>{
        console.log(error)
      });
    }




      updatetheater(id, data){
       let db = getdb();

       return db.collection("utheater").updateOne({ _id: new ObjectId(id) },{ $set: data })
       .then((success)=>{
        console.log(success) 
      }).catch((error)=>{
        console.log(error)
      });
    }



}   



  






module.exports=TheaterModel;