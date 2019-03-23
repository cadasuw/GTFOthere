var express = require("express");                             //express is used to make our app appear on the server
var mongoose = require("mongoose");                            //mongoose allows us to connect to a db server and create collections 

var PORT = 3000;        

var app = express();                                        
var Hike = require("./hikeModel.js");                           //using the model of the data and its functions 

// app.use(express.urlencoded({extended: true}));                  //parse request as Json, for UI to communicate with db
// app.use(express.json());                                         //uses Json to parse the response 

mongoose.connect("mongodb://localhost:27017/gtfodb", {useNewUrlParser: true});    //creating a new database instance for Mongo db server 

Hike.create({trailName:"TestTrailt", length:25, email:"claudia@hiking.com" + Math.random()})   //creating seed data 
// Hike.create(request.body)                                      //accepting data from an HTML page as a POST request 
.then(function(person){                                             
    console.log(person);                                            //displaying data 
})
.catch(function(err){console.log(err);}); 
Hike.find().then((x)=>console.log(x));                              //displaying the data to the UI 
app.listen(PORT, () => console.log("Running on port number " + PORT));              //starting the application on a particular port
