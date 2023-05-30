const mongoose = require("mongoose");

const FuelsSchema = new mongoose.Schema({
  ad: String,
});

module.exports = mongoose.model("Fuels",FuelsSchema);