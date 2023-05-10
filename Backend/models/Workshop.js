const mongoose = require("mongoose");

const Workshop = new mongoose.Schema({
    name:{type:String, require:true},
    
    address: {
        city: { type: String },
        distict: { type: String },
        address:{type:String, },
     },
    image:{type:String},
    phone:{type:String, require:true},
    description:{type:String},
    brand:[{brand:String}],
    maintenance : [{ad:String}],
    workingHours:{type:String},
     
    
});

module.exports = mongoose.model("Workshop",Workshop);