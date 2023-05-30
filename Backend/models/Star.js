const mongoose = require("mongoose");

const Star = new mongoose.Schema({
  user: { type: String },
  workshop: { type: String },
  star: { type: String },
});

module.exports = mongoose.model("Star", Star);
