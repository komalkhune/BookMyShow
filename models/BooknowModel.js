const { ObjectId } = require("mongodb");
const { getdb } = require("../utils/database");

const db=getdb();


class BookNow{

    getbooknow(mid){

      const db=getdb();

      return db.collection("mvdetails").aggregate([{$match:{_id:new ObjectId(mid)}},{$lookup:{from:"utheater",localField:"forid",foreignField:"_id",as:"theaterdata"}}])
      .toArray().then((success)=>{
          return success;
      }).catch((error)=>{
        console.log(error)
      })

    }




     confirmbook(mid){

      const db=getdb();

      return db.collection("mvdetails").aggregate([{$match:{_id:new ObjectId(mid)}},{$lookup:{from:"utheater",localField:"forid",foreignField:"_id",as:"theaterdata"}}])
      .toArray().then((success)=>{
          return success;
      }).catch((error)=>{
        console.log(error)
      })

    }


    seatmatch(midd){

      const db=getdb();

      // let id =new ObjectId(midd);
      // console.log(midd)
      // console.log(typeof(midd))

       let movieId = midd.toString();


        return db.collection("seatbook").find({ Movieid: movieId,  Status: '1' }).toArray().then((success)=>{
        console.log("movie plus seeat matching data")

        console.log(success)

        console.log("movie plus seeat matching info")
          return success;
      }).catch((error)=>{
        console.log(error)
        return error
      })

    }


}

module.exports=BookNow;