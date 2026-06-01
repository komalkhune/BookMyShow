const {getdb}=require("../utils/database");
const { ObjectId } = require("mongodb");

class MovieModel{
    save(mvname,mvdesc,mvimage,mvrating,mvactors,mvdate,mvedate, mvtime,mvprice,mvfid,mvstatus){
        let db=getdb();
        let forid=new ObjectId(mvfid);

       let data=db.collection("mvdetails").insertOne({MovieName:mvname, Description:mvdesc, Image:mvimage, Rating:mvrating, Actors:mvactors, ReleaseDate:mvdate,EndDate:mvedate, Time:mvtime, Price:mvprice, forid:forid, Status:mvstatus}).then((success)=>{
           console.log(success)
           return success;
        }).catch((error)=>{
            console.log(error)
        });
        return data;
    }


    getAllmovies(tid){
      let db=getdb();
      return db.collection("mvdetails").find({forid: new ObjectId(tid)}).toArray()
        .then((success)=>{
          console.log("kkkkkk")
          console.log(success)
          return success;
        }).catch((error)=>{
          console.log(error)
        })
    }


    deleteMovie(id){
      let db=getdb();

      return db.collection("mvdetails").updateOne({_id:new ObjectId(id)},{$set:{Status:"0"}})
      .then((success)=>{
        console.log(success) 
      }).catch((error)=>{
        console.log(error)
      });

    }

    getMovieById(id){
      let db = getdb();

       return db.collection("mvdetails").findOne({ _id: new ObjectId(id) })
       .then((success)=>{
        console.log(success) 
        return success;
      }).catch((error)=>{
        console.log(error)
      });
    }


    updateMovie(id, data){
       let db = getdb();

       return db.collection("mvdetails").updateOne({ _id: new ObjectId(id) },{ $set: data })
       .then((success)=>{
        console.log(success) 
      }).catch((error)=>{
        console.log(error)
      });
    }


    searchByName(searchtext){
      let db=getdb();

      return db.collection("mvdetails").find({MovieName:searchtext}).toArray();

    }


  getMoviesWithTheater(){
  let db = getdb();

  return db.collection("mvdetails").aggregate([ {$match:{Status:"1"}},{$lookup: { from: "utheater", localField: "forid", foreignField: "_id", as: "theater_info" }}
 ]).toArray()
  .then((success)=>{
    console.log(success)
    return success;
  }).catch((error)=>{
    console.log(error)
  });
}
 


}

module.exports=MovieModel;