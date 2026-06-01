const Seatbook=require("../models/SeatbookModel")
const nodemailer=require("nodemailer");


exports.seatbook=(req,res)=>{

     console.log(req.body)

     let mid=req.body.mid;
     let tid=req.body.tid;
     let mname=req.body.mname;
     let mtime=req.body.mtime;
     let ctime=req.body.Ctime;
     let mdate=req.body.mdate;
     let medate=req.body.medate;

     let mprice=req.body.mprice;
     let bdate=req.body.ubdate;
     let bseats=req.body.seats;
     let count=req.body.count;
     let total=req.body.total;
    
     let tname=req.body.tname;
     let tlocation=req.body.tlocation;
     let tcity=req.body.tcity;
     let tstate=req.body.tstate;
     let status=req.body.status;


      
     

     console.log(tcity)
     console.log(tstate)

    
       let date=new Date().toLocaleDateString("en-CA");
       
       
    //    bdate=req.body.ubdate;
         ubdate=new Date(bdate).toLocaleDateString("en-CA");

      
        console.log(date)
        console.log(typeof date)
        console.log(ubdate)         
        console.log(typeof ubdate)
      
    
        if(ubdate >= mdate && ubdate <= medate ) {
            console.log("Movie available you can Book now")


            let instance=new Seatbook();
            instance.bookseat(mid, tid, mname, mtime, ctime, mdate, medate, bdate, mprice, tname, tlocation, tcity, tstate, bseats, count, total, status)
            .then((success)=>{
                console.log(success)
                console.log("data bhetla")
                 let insertedid = success.insertedId;
                 res.send(insertedid);
                 console.log(insertedid)
                //  res.render("Payment", { paymentinfo: success });

            }).catch((error)=>{
                console.log(error)
            })
           

        }else{
            res.send("No Movie available for this date");
            
        }

}

exports.payment=(req,res)=>{

      let id = req.query.id;
      console.log(id)

     let instance=new Seatbook();
     instance.pay(id).then((success)=>{
        console.log(success)
         res.render("Payment", {data:success});
     }).catch((error)=>{
        console.log(error)
    })
        

}



exports.confirmseatbook=(req,res)=>{

    let id=req.body.obid;

    let instance=new Seatbook();
    instance.conbook(id).then((success)=>{
        console.log("sala bhetun nahinrahili id")

        console.log(success)
        let pid = success[0]._id;
         console.log("pid")
        console.log(pid)

                 res.send(pid);
        // console.log(success[0].BookedSeat);
        //  res.send(success);
        //  res.render("Ticket", {data:success});
     }).catch((error)=>{
        console.log(error)
    })

}



exports.ticket=(req,res)=>{

    //  let umail = req.session.umail.trim();
     let uumail = req.session.umail;


    // console.log("Session Data:", umail);
    console.log("Session Data:", uumail);

 


 let pid = req.query.id;
    //   console.log(id)

     let instance=new Seatbook();
     instance.tic(pid).then((success)=>{
        console.log(success)

    let movieName = success.MovieName;
    let movieTime = success.MovieTime;
    let movieDate = success.MovieDate;
    let userDate = success.UserDate;
    let moviePrice = success.MoviePrice;

    let theaterName = success.TheaterName;
    let landmark = success.Landmark;
    let city = success.City;
    let state = success.State;

    let bookedSeat = success.BookedSeat;
    let totalSeat = success.Totalseat;
    let totalPrice = success.TotalPrice;
    let status = success.Status;

        console.log(movieName)


        if(success){
        
             const transporter = nodemailer.createTransport({
                 host: "smtp.gmail.com",
                 port: 587,
                 secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                 auth: {
                   user: "khunekomal08@gmail.com",
                   pass: "notwrpfavobzgkzg",
                 },
             });

             transporter.sendMail({
               from: '"Movie Project Mail" <khunekomal08@gmail.com>', // sender address
               to: uumail, // list of recipients
               subject: "Movie Ticket Booking Confirmation", // subject line
               text: "", // plain text body
               html: `<h2>Ticket Booked Successfully!</h2>

        <p>Hello, <b>${uumail}</b>,</p>

        <p>Your movie ticket has been confirmed.</p>

        <h3>Booking Details :-</h3>

        <p><strong>Movie Name:</strong> ${movieName}</p>
        <p><strong>Theater:</strong> ${theaterName}</p>
        <p><strong>Theater Location:</strong><span> ${landmark} </span>, <span> ${city} </span>, <span> ${state} </span></p>
        <p><strong>Show Time:</strong> ${movieTime}</p>
        <p><strong>Your Seat No.:</strong> ${bookedSeat}</p>
         <p><strong>Total Seats:</strong> ${totalSeat}</p>
        <p><strong>Price per Seat:</strong> ₹${moviePrice}</p>
       
    
        <br>
         <p><strong>Total Price:</strong> ₹${totalPrice}</p>
         <br>

        <p>
            Please carry your ticket details while visiting the theater.
        </p>

        <h3>Enjoy Your Movie </h3>

        <p>Thank You,<br>Movie Booking Team</p>` // HTML body
               })
             }




         res.render("Ticket", {data:success});
     }).catch((error)=>{
        console.log(error)
    })

}

// exports.logout = (req, res) => {

//     req.session.destroy((err) => {

//         res.redirect("/loginfrm");
//     });

// };