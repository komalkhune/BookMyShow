
 let status=0;

function Payment(){

    status=1;

    if(status==1){

         axios.post("http://localhost:3000/moviebookinginfo", { mid:mid, tid:tid, seats:seats, mtime:mtime, today:today, ubdate:ubdate, mname:mname, mdate:mdate, mprice:mprice, count:count, total:total, tname:tname, tlocation:tlocation, tcity:tcity, tstate:tstate})
       .then((success)=>{
          console.log("axios data")
          console.log(success)
        //   let id=success.data;
            // console.log("newidid")
        //    console.log(id)
        //   window.location.href = `http://localhost:3000/paymentpage/?id=${id}`
        //    document.getElementById("msg").innerText = success.data

      }).catch((error)=>{
          console.log(error)
      });

    }



}