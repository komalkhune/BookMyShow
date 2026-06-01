const { ObjectId } = require("mongodb");
const { getdb } = require("../utils/database");


class Seatbook{

    bookseat(mid, tid, mname, mtime, ctime, mdate, medate, bdate, mprice, tname, tlocation, tcity, tstate, bseats, count, total, status){

        let db=getdb();

        return db.collection("seatbook").insertOne({Movieid:mid, Theatertid:tid, MovieName:mname, MovieTime:mtime, CurrentTime:ctime, MovieDate:mdate, EndDate:medate, UserDate:bdate, MoviePrice:mprice, TheaterName:tname, Landmark:tlocation, City:tcity, State:tstate, BookedSeat:bseats, Totalseat:count, TotalPrice:total, Status:status   })
        .then((success)=>{
            console.log(success)
            console.log("data inserted successfully!")
            return success
        }).catch((error)=>{
            console.log(error)
        })

    }



    pay(id){
         let db=getdb();

          return db.collection("seatbook").findOne({_id: new ObjectId(id)})
        .then((success)=>{
            console.log("paranid")
            console.log(success)
         return success;
        }).catch((error)=>{
            console.log(error)
        });
   }


    conbook(id){

        let db=getdb();

       return db.collection("seatbook").updateOne({_id:new ObjectId(id)},{$set:{Status:"1"}})
       .then((success)=>{
            console.log(success)
        //  return success;
             if(success.modifiedCount>0){
                 return db.collection("seatbook").find({_id:new ObjectId(id)}).toArray()
                  .then((success)=>{
                console.log("Status update zala find query")
                console.log(success)
                return success;
                  }).catch((error)=>{
                console.log(error)
                });

            }


        }).catch((error)=>{
            console.log(error)
        });
    }

    

    tic(pid){

        let db=getdb()

          return db.collection("seatbook").findOne({_id: new ObjectId(pid)})
        .then((success)=>{
            console.log("ttttt id")
            console.log(success)
         return success;
        }).catch((error)=>{
            console.log(error)
        });


    }
    

}

module.exports=Seatbook;
