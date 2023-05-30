const mongoose = require("mongoose");

const GasBrandSchema = new mongoose.Schema({
  ad: String,
});

module.exports = mongoose.model("GasBrand",GasBrandSchema);