const mongoose = require("mongoose");


    const City = new mongoose.Schema({
        ilAdi:{type:String},
        plakaNo:{type:String},
        ilceler:[{type:String}],
    })

    module.exports = mongoose.model("City",City);