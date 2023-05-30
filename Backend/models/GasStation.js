const mongoose = require("mongoose");

const GasStationSchema = new mongoose.Schema({
  ad: String,
  brand: String,
  address: {
    city: { type: String },
    distict: { type: String },
  },
});

module.exports = mongoose.model("GasStation", GasStationSchema);