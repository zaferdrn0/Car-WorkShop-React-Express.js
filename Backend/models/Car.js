const mongoose = require("mongoose");

const MarkaSchema = new mongoose.Schema({
  ad: String,
  modeller: [{ ad: String, motorTipleri: [{ ad: String }] }],
});

module.exports = mongoose.model("Marka", MarkaSchema);
