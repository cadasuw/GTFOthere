var mongoose = require("mongoose"); 

var Schema = mongoose.Schema; 
//defining all the data attributes as JSon key values 
var HikesSchema = new Schema({
    key: {
        type:String
    },
    name: {
        type: String,
    },
    num: {
        type: Number
    },
    latitude: { 
        type: Number
    },
    longitude: {
        type: Number
    },
    summary: {
        type: String
    },
    location: {
        type: String
    },
    length: {
        type: Number
    },
    image: {
        type: String
    }
    
});

var Hike = mongoose.model("Hike", HikesSchema);   //creation of the collection in the db 

module.exports = Hike;