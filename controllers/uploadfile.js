const FileUpload=require("../models/UploadModel");

exports.uploadfile=(req,res)=>{
    let img=req.file.filename;

    let obj=new FileUpload();
    obj.uploadImg(img)
}