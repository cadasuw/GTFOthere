var mongoose = require("mongoose"); 

var Schema = mongoose.Schema; 
//defining all the data attributes as JSon key values 
var HikesSchema = new Schema({
    email: {
        type:String,
        unique: true
    },
    firstName: {
        type:String,
        allowNull: false
    },
    lastName: {
        type:String,
        allowNull: false
    },
    image: {
        type:String
    },
    trailName: {
        type:String, 
        trim:true
    }
});

var Hike = mongoose.model("Hike", HikesSchema);   //creation of the collection in the db 

module.exports = Hike;
