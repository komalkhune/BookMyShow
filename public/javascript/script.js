
const toggleMenu=()=>{
    document.querySelector(".mview")
    .classList.toggle("show");
}



let seats = [];

  let status="0";
  let check=0;




const selectSeat=(element)=>{

     ubdate=document.getElementById("inp").value;

  
      if(ubdate===""){
        alert("Please Select Date First");
    }else{

    let seatNo = element.innerText;

    console.log("seatNo")

    console.log(seatNo)

    if(element.style.background === "green"){

        // unselect seat
        element.style.background = "white";
         element.classList.remove("selected"); 

        let index = seats.indexOf(seatNo);

        if(index > -1){
            seats.splice(index,1);
        }

    }else if(element.style.background === "red"){
          
        msg.innerText="This seat already booked! Choose another seat";
    }else{

        // select seat
        element.style.background = "green";
         element.classList.add("selected"); 

        seats.push(seatNo); 

    } 
     console.log(seats)

}



    
   
}



// function payments(){

//     today = new Date();
   
//     ubdate = document.getElementById("inp").value;


//        let date=new Date().toLocaleDateString("en-CA");
       
//        let uubdate=new Date(ubdate).toLocaleDateString("en-CA");

//         console.log(date)
//         console.log(typeof date)
//         console.log(uubdate)         
//         console.log(typeof uubdate)
    

//     let msg = document.getElementById("msg");

//      let selectseat= document.querySelectorAll(".selected");

//     if(ubdate === "" && seats.length === 0){

//         msg.innerText = "Please select date and choose seats";

//     }else if(ubdate === ""){

//         msg.innerText = "Please select date";

//     }else if(seats.length === 0){

//         msg.innerText = "Please choose seats";

//     }else if(uubdate < date){

//          msg.innerText = "No movie Available for this Date Choose other date";

//     }else{

//         msg.innerText = "Payment Successful";

//         status = 1;
//         selectseat.style.backgroundColor="red";
//     }
// }





const booknow=(ele)=>{

  

     let mid = ele.getAttribute("data-app-mid");
    let tid = ele.getAttribute("data-app-tid");

    mname=document.getElementById("mname").innerText;
    let mdate=document.getElementById("msdate").innerText;
    medate=document.getElementById("medate").innerText;
    mtime=document.getElementById("mtime").innerText;
    mprice=document.getElementById("mprice").innerText;
    tname=document.getElementById("tname").innerText;
    tlocation=document.getElementById("tlocation").innerText;
    tcity=document.getElementById("tcity").innerText;
    tstate=document.getElementById("tstate").innerText;
    console.log(mprice)

    
    today=new Date().getDate();
    ubdate=document.getElementById("inp").value;
    // ubtime=document.getElementById("inptime").value;

    let now = new Date();

     let Ctime = now.toLocaleTimeString();
    
      console.log("Ctime");
     console.log(Ctime);

    console.log("ubdate")

    console.log(ubdate)

    let date=new Date().toLocaleDateString("en-CA");
       
    let uubdate=new Date(ubdate).toLocaleDateString("en-CA");



    let selectedSeats = document.querySelectorAll(".seat.selected");
    console.log("sssssssssssssssssssssss")
    console.log(selectedSeats)

    let count = selectedSeats.length;
    let total = count * mprice;
  

  
  
    ubdate=document.getElementById("inp").value;

  

    if(ubdate==="" && seats.length===0){
        msg.innerText = "Please select date and choose seats";
    }else if(ubdate===""){
          msg.innerText="Please select date";
    }else if(ubdate < mdate || ubdate > medate ){
       alert("No movie Available for this Date Choose Date in beetwen movie duration");      
    }else if(seats.length===0){
        msg.innerText="Please Select seats"
     }else if(ubdate < date){
         msg.innerText = "No movie Available for this Date Choose next date";
     }else if(ubdate == date && Ctime>=mtime){
        msg.innerText = "Show already start try for next day";
     }else{  



      axios.post("http://bookmyshowbykomal.onrender.com/moviebookinginfo", { mid:mid, tid:tid, seats:seats, mtime:mtime, Ctime:Ctime, today:today, ubdate:ubdate, mname:mname, mdate:mdate, medate:medate, mprice:mprice, count:count, total:total, tname:tname, tlocation:tlocation, tcity:tcity, tstate:tstate, status:status })
       .then((success)=>{
          console.log("axios data")
          console.log(success)
          let id=success.data;
            // console.log(success.data)    https://bookmyshowbykomal.onrender.com


            console.log("newidid")
           console.log(id)
          window.location.href = `http://bookmyshowbykomal.onrender.com/paymentpage/?id=${id}`
        //    document.getElementById("msg").innerText = success.data

      }).catch((error)=>{
          console.log(error)
      });



    }
    
}

window.onload = function () {
    changeDate();
};

function changeDate() {

    seats = [];

    let date=new Date().toLocaleDateString("en-CA");

    let userdate = document.getElementById("inp").value;

    if(userdate >= date){

    console.log(userdate);

    let bookedData = document.querySelectorAll(".backseat");

    let dateWiseSeats = {};

    // Create object date-wise seats
    bookedData.forEach((seat) => {

        let date = seat.getAttribute("data-date");
        let seatNo = seat.getAttribute("data-seat");

        if (!dateWiseSeats[date]) {
            dateWiseSeats[date] = [];
        }

        dateWiseSeats[date].push(seatNo);
    });

    console.log(dateWiseSeats);


    document.querySelectorAll(".seat").forEach((sss) => {
    sss.style.backgroundColor = "";
    sss.style.color = "";
    sss.classList.remove("booked");
    sss.style.pointerEvents = "auto";
});

    
    if (dateWiseSeats[userdate]) {

        // Get seats for matched date
        let matchedSeats = dateWiseSeats[userdate];

        console.log(matchedSeats);

        
        document.querySelectorAll(".seat").forEach((sss) => {

            let seatNo = sss.innerText;

            // If seat number exists in booked seats
            if (matchedSeats.includes(seatNo)) {

                sss.style.backgroundColor = "red";
                sss.style.color = "white";
                sss.classList.add("booked"); 
                sss.style.pointerEvents = "none";
            }
        });
    }

    }else if(userdate ===""){
        
    }else{
       alert(`No Movie available for this ${userdate}`);
    }
}









const payment=()=>{


    let obid = document.getElementById("obid").value;


        axios.post("http://bookmyshowbykomal.onrender.com/seatbookinginfo", {obid:obid})
          .then((success)=>{
        //   console.log(success)

        let pid=success.data;
        
            console.log("newidid")
           console.log(pid)
          window.location.href = `http://bookmyshowbykomal.onrender.com/ticketinfo/?id=${pid}`

          document.getElementById("smsg").innerText="Payment Successfully";
        
    


        }).catch((error)=>{
          console.log(error)
        });




}    



const downloadTicket=()=>{

    let printData = document.getElementById("ticket-print").innerHTML;  

    // let originalData = document.body.innerHTML;

    // document.body.innerHTML = printData;

    // window.print();



      let newWindow = window.open("", "", "width=800,height=700");

    newWindow.document.write(` 
        <html>
        <head>
            <title>Movie Ticket</title>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

            <style>
               #ticket-print{
                   width: 90%;
                   margin: 0 auto;
               }
                .ticket-info{
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: start;
               }
               .info-box{
                   display: flex;
                   text-align: center;
               }
               .info-box p:first-child{
                   margin-right: 7px;
               }
              .seat-box{
              display:flex;
              flex-direction: column;
              justify-content:start;
              align-items-center
              }
              .seat-box p:nth-child(2){
              margin-right:20px
             }

            </style>

              </head>

        <body>

            <div class="ticket-box">
                ${printData}
            </div>

            <script>
                window.onload = function(){
                    window.print();
                    window.close();
                }
            <\/script>

        </body>
        </html>
    `);

    newWindow.document.close();

}






$(".slide").owlCarousel({
  autoplay:true,
  loop:true,
  margin:30,
  nav:true,
  responsive:{
    320:{
      items:1,
      dots:false
    },
    576:{
      items:2,
      dots:false
    },
    992:{
      items:4,
      dots:false
    },
     1200:{
      items:5,
      dots:false
    }

  }
})




