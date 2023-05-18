const mongoose = require("mongoose");


    const Comment = new mongoose.Schema({
        workshop:{type:String},
        user:{type:String},
        comment:{type:String},
        date:{type:String}
    })

    module.exports = mongoose.model("Comment",Comment);