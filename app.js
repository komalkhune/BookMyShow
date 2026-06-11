require("dotenv").config(); 
const express=require("express");
const router=require("./Router/Router");
const bodyParse=require("body-parser");
const session = require("express-session");
const mongosession=require("connect-mongodb-session")(session);
const multer=require("multer");
const path=require("path");

const mongoConnect=require("./utils/database").mongoConnect;

const app=express();

app.use(express.json());




const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime()+"-"+file.originalname);
    }
})

app.use(multer({storage:fileStorage}).single("image"));




const store=new mongosession({
    uri:"mongodb+srv://komalkhune_08:komal4093@cluster0.r4iesua.mongodb.net/?appName=Cluster0",
    collection:"session"
})



app.use(session({
    secret:"this is string",
    resave:false,
    saveUninitialized:true,
    store:store,
}))

app.use("/public",express.static(path.join(__dirname, 'public')));

app.use(bodyParse.urlencoded({extended:false}));

app.set("view engine","ejs");
app.use(router);


mongoConnect(()=>{app.listen(3000)});
