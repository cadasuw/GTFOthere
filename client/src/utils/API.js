import axios from "axios";

export default {
    getToken: function(idToken) {
        console.log("api.js before axios call");
          return axios.get("/api/google", {params: {id_token: idToken}})
           .then(response => {
             console.log("api.js: ", response);
             return response
           })
      },
    getTrails: function(){
        return axios.get("/api/trails");
    }
};