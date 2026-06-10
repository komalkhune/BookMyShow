const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;
let _db;

const mongoconnect=(callback)=>{
    MongoClient.connect("mongodb+srv://komalkhune_08:komal4093@cluster0.r4iesua.mongodb.net/?appName=Cluster0").then((success)=>{
        console.log(success)
      _db=success.db("mydatabace");
      console.log("The database connected")
      callback();
    }).catch((error)=>{
        console.log(error)
         console.log("MongoDBconnection Error:", error.message);
    });
    
}

const getdb=()=>{
    if(_db){
        return _db;
    }else{
        console.log("Database not Found");
         console.log("MongoDBconnection Error:", error.message);

    }
}

exports.mongoConnect=mongoconnect;
exports.getdb=getdb;