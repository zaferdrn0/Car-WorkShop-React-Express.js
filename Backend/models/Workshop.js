const mongoose = require("mongoose");

const Workshop = new mongoose.Schema({
    name:{type:String, require:true},
    address:{type:String, require:true},
    image:{type:String},
    phone:{type:String, require:true},
    description:{type:String},
    maintenance : [{ad:String}],
});

module.exports = mongoose.model("Workshop",Workshop);