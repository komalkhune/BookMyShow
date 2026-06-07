const BookNow=require("../models/BooknowModel")


exports.bookNow=(req,res)=>{

    let mid=req.query.id;
    console.log("kali tid ahe")
     console.log(mid)

    let instance=new BookNow();

    instance.getbooknow(mid).then((success)=>{
        console.log(success)
        res.render("BookNow", {bookmovie:success})
    }).catch((error)=>{
        console.log(error)
    })

}



exports.bookConfirm=(req,res)=>{

    let mid=req.query.id;
    

    console.log("kali tid ahe")
     console.log(mid)


    let instance=new BookNow();

    let aa=instance.confirmbook(mid);
    aa.then((success)=>{
        console.log(success)
        let mmid=success[0]._id
        console.log("mmid")
        
        console.log(mmid)
       let bookdata= instance.seatmatch(mmid);
       bookdata.then((seat)=>{
            let data={};
            
            // let ddate=seat[0].UserDate 
            // console.log("ddddddd")

            // console.log(ddate)
            seat.map((item)=>{

                let date=item.UserDate;
            
            //    data.push(...item.BookedSeat)
                if (!data[date]) {
                  data[date] = [];
                }

               data[date].push(...item.BookedSeat);
            });
            console.log("datadatadatadata")

            console.log(data)

             res.render("BookConfirm", {confirmmovie:success, ubseats:data })
        }).catch((bug)=>{
            console.log(bug)
        })
       
    }).catch((error)=>{
        console.log(error)
    })

}





