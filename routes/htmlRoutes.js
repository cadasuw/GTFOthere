var db = require("../models");
var axios = require("axios");

module.exports = function (app) {

  
// Load initial index page
  app.get("/", function (req, res) {
    res.render("index")
  });

// Load current user data, once logged in
  app.get("/userData/:id", function (req, res) {

    var userEmail = req.params.id;
    let statusArray = [];

    let allMovies = {
      plan: [],
      completed: [],
      dropped: []
    };

    let finalBoss = {
      plan: [],
      completed: [],
      dropped: []
    };

    db.Users.findOne({
      where: { email: userEmail }
    }).then(function (user) {
      let parsedUser = JSON.parse(JSON.stringify(user));
      // console.log(parsedUser);
      if (!parsedUser) {
        res.render("userData", {
          movies: finalBoss
        });
      }

      if (!parsedUser.status) {
        parsedUser.status = '[]';
      }

      let parsedUserStatus = JSON.parse(parsedUser.status);

      for (let i = 0; i < parsedUserStatus.length; i++) {
        let stat = {
          id: parsedUserStatus[i]
        };

        statusArray.push(stat);
      }
      console.log("Status array:" + JSON.stringify(statusArray));

      db.Status.findAll({
        where: { [db.Sequelize.Op.or]: statusArray }
      }).then(function (dbMovies) {
        let parsedMovies = JSON.parse(JSON.stringify(dbMovies));

        for (let i = 0; i < parsedMovies.length; i++) {
          let moviePlan = {};
          moviePlan.id = parseInt(parsedMovies[i].movie);
          let statusID = parseInt(parsedMovies[i].status);
          if (statusID === 0) {
            allMovies.plan.push(moviePlan);
          } else if (statusID === 1) {
            allMovies.completed.push(moviePlan);
          } else if (statusID === 2) {
            allMovies.dropped.push(moviePlan);
          }
        }

        db.Movies.findAll({
          where: { [db.Sequelize.Op.or]: allMovies.plan }
        }).then(function (planMovies) {
           let parsedPlan = JSON.parse(JSON.stringify(planMovies));
           //insert status objects
           finalBoss.plan = parsedPlan;
         
            db.Movies.findAll({
            where: { [db.Sequelize.Op.or]: allMovies.completed }
          }).then(function (completedMovies) {
            let parsedCompleted = JSON.parse(JSON.stringify(completedMovies));
            finalBoss.completed = parsedCompleted;

            db.Movies.findAll({
              where: { [db.Sequelize.Op.or]: allMovies.dropped }
            }).then(function (droppedMovies) {
              let parsedDropped = JSON.parse(JSON.stringify(droppedMovies));
              finalBoss.dropped = parsedDropped;
              console.log("FINALBOSS: " + JSON.stringify(finalBoss));
              res.render("userData", {
                movies: finalBoss});
              
            });
          }); 

        });
      });
    });
  });


  // Load example page and pass in an example by id
  app.get("/results/:id", function (req, res) {
    var search = req.params.id;
    var queryURL =
      "https://api.themoviedb.org/3/search/movie?api_key=1d306d106bfbf8b4f7c87cf5af3339a8&query=" +
      search;
    // console.log("QueryURL", queryURL);
    axios.get(queryURL).then(function (response) {
      // console.log(data);
      var json = response.data;
      var results = json.results;
      // console.log("This is results", results);
      var data = [];
      for (i = 0; i < results.length; i++) {
        var movies = {
          title: results[i].title,
          release_date: results[i].release_date,
          rating: results[i].vote_average,
          description: results[i].overview,
          poster: "http://image.tmdb.org/t/p/w154/" + results[i].poster_path
        };
        data.push(movies);
      }
      // console.log("HERE IS THE DATA", data);
      // console.log(req.url);
      res.render("example", {
        url: req.url,
        movies: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};