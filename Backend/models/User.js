const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: { type: String, require: true, maxLength: 10 },
  email: { type: String, require: true, maxLength: 35 },
  password: { type: String, require: true, maxLength: 25 },
  phone: {type: String, require:true},
  admin:{type:String, require:true, default:"0"},

});

module.exports = mongoose.model("User", User);