const mongoose = require("mongoose");

const UserFuelSchema = new mongoose.Schema({
  userid: { type: String },
  fuelstationid: { type: String },
  fueltype: { type: String },
  stationbrand: { type: String },
  distance: { type: String },
  fuelliter: { type: String },
  fuelprice: { type: String },
  date:{type:String}
});

module.exports = mongoose.model("UserFuel", UserFuelSchema);
