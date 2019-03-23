
// Get references to page elements
var $exampleText = $('#example-text');
var $exampleDescription = $('#example-description');
var $submitBtn = $('#submit');
var $exampleList = $('#example-list');
 
// The API object contains methods for each kind of request we'll make
var API = {

  processToken: function (checkIDToken) {
    return $.ajax({
      headers: {'Content-Type': 'application/json'},
      type: "POST",
      url: "api/signIn",
      data: JSON.stringify(checkIDToken)
    });
  }
};    

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  console.log("ONSIGNIN");
  var profile = googleUser.getBasicProfile();

  //console.log(profile);
  //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  //console.log('Full Name: ' + profile.getName());
  //console.log('Given Name: ' + profile.getGivenName());
  //console.log('Family Name: ' + profile.getFamilyName());
  //console.log("Image URL: " + profile.getImageUrl());
 

  // Using email as client id so need to store it in local storage
  let userEmail = profile.getEmail();
  localStorage.clear();
  localStorage.setItem("emailMovify", userEmail);

  // The ID token you need to pass to your backend:
  var idToken = googleUser.getAuthResponse().id_token;

  // Verify token and return our unique userId
  var checkIDToken = {token: idToken};
  API.processToken(checkIDToken)
    .then(function(res) {
    if (!window.location.href.includes(("/userData/" + userEmail))) {
        window.location.href = "/userData/" + userEmail;
    }
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been successfully signed out")
  });
  auth2.disconnect
}

$("#submitButton").on("click", function(event) {
  event.preventDefault();
  var search = $("#search").val();
  console.log(search);

  $.ajax("/results/" + search, {
    type: "GET"
  }).then(function(data) {
    console.log("meow");
    // console.log(data);
    window.location.href = "/results/" + search;
    // $("#movieTitle").append(data);
  });
});

$("#homeButton").on("click", function(event) {
  event.preventDefault();
  //window.location.href = "/";
  var userEmail = localStorage.getItem("emailMovify")
  $.ajax("/userData/" + userEmail, {
    type: "GET"
  }).then(function(data) {
     console.log("dog");
     window.location.href = "/userData/" + userEmail;
    
    
    // window.location.href = "/";
    //$("#movieTitle").append(data);
  });
}); 

$(".plan").on("click", function(event) {
  event.preventDefault();
  
  var movie = {
    title: $(this).data("title"),
    release_date: $(this).data("release"),
    rating: $(this).data("rating"),
    description: $(this).data("description"),
    poster: $(this).data("poster"),
    email: localStorage.getItem("emailMovify")
  };
  $.ajax("/api/plan", {
    type: "POST",
    data: movie
  }).then(function(data) {
    console.log(data);
  });
});

$(".complete").on("click", function() {
  event.preventDefault();
  var movie = {
    title: $(this).data("title"),
    release_date: $(this).data("release"),
    rating: $(this).data("rating"),
    description: $(this).data("description"),
    poster: $(this).data("poster"),
    email: localStorage.getItem("emailMovify")
  };
  $.ajax("/api/completed", {
    type: "POST",
    data: movie
  }).then(function(data) {
    console.log(data);
  });

  console.log(movie);
});

$(".drop").on("click", function() {
  event.preventDefault();
  var movie = {
    title: $(this).data("title"),
    release_date: $(this).data("release"),
    rating: $(this).data("rating"),
    description: $(this).data("description"),
    poster: $(this).data("poster"),
    email: localStorage.getItem("emailMovify")
  };
  $.ajax("/api/dropped", {
    type: "POST",
    data: movie
  }).then(function(data) {
    console.log(data);
  });

  console.log(movie);
});