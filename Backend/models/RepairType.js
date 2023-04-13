const mongoose = require("mongoose");


    const RepairType = new mongoose.Schema({
        ad:{type:String},
    })

    module.exports = mongoose.model("RepairType",RepairType);