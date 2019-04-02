import axios from "axios";
console.log("API.js");
export default {
  // Gets books from the Google API
  getToken: function(idToken) {
    console.log("api.js before axios call");
  //  console.log("idToken", idToken);
  //  return axios.get("/api/google", idToken);
  //return axios.get("/api/google", {params: {q: "title:" + q}});
      return axios.get("/api/google", {params: {id_token: idToken}})
       .then(response => {
      
         console.log("api.js: ", response);
         return response
       })
  },
  // Gets all saved books
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the saved book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves an book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
