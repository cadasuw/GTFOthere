var mongoose = require("mongoose"); 

var Schema = mongoose.Schema; 
//defining all the data attributes as JSon key values 
var HikesSchema = new Schema({
    trailName: {
        type:String, 
        trim:true, 
        required:"Trail name is required"
    }, 
    email: {
        type:String,
        unique: true
    },
    length:{
        type:Number
    }
});

var Hike = mongoose.model("Hikes", HikesSchema);   //creation of the collection in the db 

module.exports = Hike;
