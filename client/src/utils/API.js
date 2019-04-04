import axios from "axios";

export default {
        
    // Verifies user and creates new user if required
    getToken: function(idToken) {
        return axios.get("/api/google", {params: {id_token: idToken}})
        .then(response => {
        console.log("api.js: ", response);
        return response
        })
    },

    // Gets all saved trails
    getSavedTrails: function() {
    return axios.get("/api/trails");
    },

    // Saves a trail to the database
    saveTrail: function(trailData) {
    return axios.post("/api/trails", trailData);
    
    }
};