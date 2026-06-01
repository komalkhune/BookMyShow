    const getdb=require("../utils/database").getdb;

    class FileUpload{

        uploadImg(img){
            let db=getdb();
            db.collection("uploads").insertOne({img:img}).then((success)=>{
                 console.log(success);
            }).catch((error)=>{
                 console.log(error);
        })
      }
        
    }


    module.exports=FileUpload;