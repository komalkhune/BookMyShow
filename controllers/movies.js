const MovieModel = require("../models/MovieModel");

exports.showfpage=(req,res)=>{
  res.render("Homepage");
}


exports.movieDatainsert=(req,res)=>{
 res.render("Insertmoviedetails");
}
// , {tuid:"", message:""}

exports.getmoviedetails=(req,res)=>{

     let mvname=req.body.mname;
     let mvdesc=req.body.mdesc;
     let mvimage=req.body.mimage;
     let mvrating=req.body.mrating;
     let mvactors=req.body.mactors.split(",");
     let mvdate=req.body.sdate;
     let mvedate=req.body.edate;
     let mvtime=req.body.mtime;
     let mvprice=req.body.mprice;

    //  let foid=req.body.fid;
    let foid=req.body.fid;

    let status="1";
   



    // let { mname, mdesc, mimage, mrating, mactors, mdate, mtime } = req.body;

    if ( !mvname || !mvdesc || !mvimage || !mvrating || !mvactors || !mvdate || !mvedate || !mvtime || !mvprice ) {  
    res.render("Insertmoviedetails",{tuid:foid, message:"All fields are required"});
  }else{

     let collect=new MovieModel();
     let output=collect.save(mvname,mvdesc,mvimage,mvrating,mvactors,mvdate,mvedate, mvtime,mvprice,foid,status);
     output.then((success)=>{
       console.log("forenkey")
       console.log(foid)
       console.log(success)

        res.render("Insertmoviedetails",{tuid:foid, message:"Movie Insert Successfully"} );
        
     }).catch((error)=>{
        console.log(error)
     });

    }

}


exports.showMovies=(req,res)=>{



let tid = req.query.fid;
console.log("kam zala")
console.log(tid)



    let collect=new MovieModel();


    collect.getAllmovies(tid).then((success)=>{
        console.log(success);
       
        console.log("lolololo");

        if (success.length != 0){
         res.render("Movies", {pictures:success, tuid:tid, message:""});
         }else{
         res.render("Movies",{message:"Please Insert Movie"});
        }
        
    }).catch((error)=>{
        console.log(error)
    });
 
}

exports.deleteMovie=(req,res)=>{
  let id=req.query.id;
  let fid = req.query.fid; 
  //  let tid = req.query.tuid;
//   console.log(id)

  let collect=new MovieModel();
  collect.deleteMovie(id).then((success)=>{
    console.log(success)
    res.redirect("/movies?fid=" + fid);
  }).catch((error)=>{
    console.log(error)
  });
}


exports.editMoviePage = (req,res)=>{
    let id = req.query.id;
     let fid = req.query.fid; 

    let collect = new MovieModel();
    collect.getMovieById(id).then((success)=>{
        console.log(success)
        res.render("EditMovie", {moviedata: success, fid:fid});
    }).catch((error)=>{
    console.log(error)
  });
}

exports.updateMovie = (req,res)=>{
    let id = req.body.id;
    let fid = req.body.fid;   


    let updatedData = {
        MovieName: req.body.mmmname,
        Description: req.body.mdesc,
        Image: req.body.mimage,
        Rating: req.body.mrating,
        Actors: req.body.mactors,
        ReleaseDate: req.body.msdate,
        EndDate: req.body.medate,

        Time: req.body.mtime,
        Price: req.body.mprice

    };

    let collect = new MovieModel();
    collect.updateMovie(id, updatedData)
    .then((success)=>{
      console.log(success)
      console.log("upkpkpkpkp")
      // console.log(tid)

         res.redirect("/movies?fid=" + fid);
    })
    .catch((error)=>{
        console.log(error);
    });
}

exports.searchmovies=(req,res)=>{
  let searchtext=req.body.search;

  let collect=new MovieModel();
  collect.searchByName(searchtext).then((success)=>{
   console.log(success)
    res.render("Searchmovie", { pictures: success });
  }).catch((error)=>{
   console.log(error)
  })


}


exports.showMoviestheater = (req,res)=>{

    let collect = new MovieModel();

    collect.getMoviesWithTheater().then((success)=>{
        console.log(success);
        res.render("Moviewiththeater", {picturess: success});
    }).catch((error)=>{
        console.log(error)
        //   res.render("Moviewiththeater", {
        //     picturess: []
        // });
    });
}


// exports.theaterresistration=(req,res)=>{
// res.render("Theaterresistration")
// }

    


