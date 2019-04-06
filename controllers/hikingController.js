const db = require("../models");


module.exports = {
    findAll: function(req, res){
        db.Hike.find(req.query)
        .then(dbHike => res.json(dbHike))
        .catch(err => res.status(422).json(err));      
    }, add:function(req, res) {
        db.Hike.create(req.body)
        .then(dbHike => res.json(dbHike))
        .catch(err => res.status(422).json(err));
    }
}