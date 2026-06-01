
const {getdb}=require("../utils/database");

class SignupModel{
   register(uname,pass){
    let db=getdb();

    let qres=db.collection("usignup").find({username:uname}).toArray().then((success)=>{
      if(success.length===0){

         let results=db.collection("usignup").insertOne({username:uname,pass:pass}).then((success)=>{
           console.log(success);
           return success
           }).catch((error)=>{
           console.log(error)
           });
         return results;
      }else{
         return {status:"Existed"}
      }

    }).catch((error)=>{
      console.log(error);
    });
    return qres;

    
   }

   fetchDetails(uname){
      let db=getdb();
     let results=db.collection("usignup").find({username:uname}).toArray().then((success)=>{
        //  console.log(success);
         return success;
     }).catch((error)=>{
         console.log(error);
         return error;
     });
     return results;
   }
}

module.exports=SignupModel;