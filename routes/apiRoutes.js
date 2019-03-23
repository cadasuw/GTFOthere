var db = require("../models");

module.exports = function(app) {

  // Plan to watch a movie : 
  //  - add movie to movie table, if it doesn't already exist, get unique movie id
  //  - add unique movie id and status (0 - plan to watch) to status table
  //  - add unique status id from status table to user table

  app.post("/api/plan", function (req, res) {

    let userEmail = req.body.email;
  
    db.Users.findOne({
      where: { email: userEmail }
    }).then(function (user) {
  
      let parsedUser = JSON.parse(JSON.stringify(user));
      let userStatus = parsedUser.status;
      
      if (!userStatus) {
        userStatus = '[]';
      }
      let parsedUserStatus = JSON.parse(userStatus);

      db.Movies.findOne({
        where: {title: req.body.title}

      }).then(function (existingMovie) {
        if (!existingMovie) {
          db.Movies.create({
            title: req.body.title,
            summary: req.body.description,
            year: req.body.release_date

          }).then(function (movieEntry) {
            db.Status.create({
              movie: movieEntry.id,
              status: 0

            }).then(function (statusEntry) {
              
              //parsedUserStatus.push(statusEntry.id);
              if (!parsedUserStatus.length) {
                parsedUserStatus = statusEntry.id; 
              } else {  
                parsedUserStatus = parsedUserStatus + "," + statusEntry.id;
              }  
              db.Users.update(
                { status: `[${parsedUserStatus.toString()}]` },
                { where: { email: req.body.email } }
              );
            });
          });

        } else {
          db.Status.create({
            movie: existingMovie.id,
            status: 0

          }).then(function (statusEntry) {

            if (!parsedUserStatus.length) {
              parsedUserStatus = statusEntry.id; 
            } else {  
              parsedUserStatus = parsedUserStatus + "," + statusEntry.id;
            }  

            db.Users.update(
              { status: `[${parsedUserStatus.toString()}]` },
              { where: { email: req.body.email } }
            );
          });
        };
      });
    });
  });  

  // Watched movie : 
  //  - if movie not in our database:
  //    - repeat the steps in /api/plan but with a status of 1 (1 - movie has been watched)
  //  - if movie already in our database:
  //    - find movie id
  //    - update entry in status table ** can we pull user table status id from the movie we are clicking on? can it be an attribute on that item displayed?

  app.post("/api/completed", function(req, res) {
      
    db.Movies.findOne({
      where: {
        title: req.body.title
      }

    }).then(function(movieEntry) {
      if (!movieEntry) {
        db.Movies.create({
          title: req.body.title,
          summary: req.body.description,
          year: req.body.release_date

        }).then(function(result) {
          db.Status.create({
            movie: result.id,
            status: 1

          }).then(function(statusEntry) {
            parsedUserStatus = parsedUserStatus + "," + statusEntry.id;
            db.Users.update(
              { status: `[${parsedUserStatus.toString()}]`},
              { where: { email: req.body.email } }
            );
          });
        });

      } else {
        db.Movies.findOne({
          where: {
            title: req.body.title
          }
          
        }).then(function(dbmovie) {
          db.Status.update({ status: 2 }, { where: { movie: dbmovie.id } });
        });
      }
    });
  });
  

  app.post("/api/dropped", function(req, res) {
    db.Movies.findOne({
      where: {
        title: req.body.title
      }
    }).then(function(existingMovie) {
      if (!existingMovie) {
        db.Movies.create({
          title: req.body.title,
          summary: req.body.description,
          year: req.body.release_date
        }).then(function(movieEntry) {
          console.log("movieId", movieEntry);
          db.Status.create({
            movie: movieEntry.id,
            status: 2
          }).then(function(statusEntry) {
            db.Users.update(
              { status: statusEntry.id },
              { where: { email: req.body.email } }
            );
          });
        });
      } else {
        db.Movies.findOne({
          where: {
            title: req.body.title
          }
        }).then(function(dbmovie) {
          db.Status.update({ status: 2 }, { where: { movie: dbmovie.id } });
        });
      }
    });
  });
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
  // app.get("/api/plan", function (req, res) {
  //   db.Movies.findAll({ where: { status: req.params.plan } })
  //     .then(function (movies) {
  //       res.json(movies);
  //     });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });

  app.post("/api/completed", function(req, res) {
    res.send("Completed clicked");
  });
  app.post("/api/dropped", function(req, res) {
    res.send("Dropped clicked");
  });
};

// app.post("/api/completed", function (req, res) {
//   res.send("Completed clicked")
// })
// app.post("/api/dropped", function (req, res) {
//   res.send("Dropped clicked")
// })

// app.post("/api/completed", function (req, res) {
//   db.Movies.findOne({
//     where: {
//       title: req.body.title
//     }
//   }).then(function(existingMovie) {
//     if(!existingMovie) {
//       db.Movies.create({
//         title: req.body.title,
//         summary: req.body.description,
//         year: req.body.release_date
//       }).then(function(movieEntry){
//         console.log("movieId",movieEntry)
//         db.Status.create({
//           movie: movieEntry.id,
//           status: 1
//         }).then(function(statusEntry){
//           db.Users.update(
//             {status: statusEntry.id},
//             {where: {email: req.body.email}}
//             );
//         });
//       });
//     } else {
//       console.log("existingMovie",existingMovie);
//     }
//   })
// });
