const mongoose = require("mongoose");

const Workshop = new mongoose.Schema({
  name: { type: String, require: true },

  address: {
    city: { type: String },
    distict: { type: String },
    address: { type: String },
    description: { type: String },
  },
  image:[{ type: String }],
  phone: { type: String, require: true },
  description: { type: String },
  brand: [{ brand: String }],
  maintenance: [{ ad: String }],
  workingHours: { start: { type: String }, end: { type: String } },
  email:{type:String},
  website:{type:String},
});

module.exports = mongoose.model("Workshop", Workshop);
