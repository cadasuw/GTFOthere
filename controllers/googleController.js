const axios = require("axios");
const db = require("../models");
console.log("googleController");

// findAll verifies that the google token used is valid

// It also adds the user to the database, if they do not already exist.

module.exports = {
  findAll: function(req, res) {
    let params = req.query.id_token;
    axios
      .get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + params)
        .then((results) => {

          console.log('api results: ', results.data)
          res.send(results.data);  //send data back to the client side? possibly not needed
          let data = results.data;
          if (results.data) {
            newUser = {
              firstName: results.data.given_name,
              lastName: results.data.family_name,
              email: results.data.email,
              profileImage: results.data.picture
            }
            console.log("NEWUSER: ", newUser);
             db.Hike.find({email: results.data.email})
              .then((results) => {
                console.log('query results: ', results);
                if (results === undefined || results.length == 0) {

                  db.Hike.create(newUser);
                }

              });
          }
        });
  }
};  
            
      
