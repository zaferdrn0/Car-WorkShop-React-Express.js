const mongoose = require("mongoose");

const Workshop = new mongoose.Schema({
    name:{type:String, require:true},
    address:{type:String, require:true},
    city:[{city:String,district: String}],
    image:{type:String},
    phone:{type:String, require:true},
    description:{type:String},
    model:[{model:String}],
    maintenance : [{ad:String}]

    
});

module.exports = mongoose.model("Workshop",Workshop);