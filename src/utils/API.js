import axios from "axios";

export default {
    getTrails: function(){
        return axios.get("/api/trails");
    }
};