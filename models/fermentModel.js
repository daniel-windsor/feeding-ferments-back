const mongoose = require("mongoose");

const fermentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Ferment must have a name"],
  },
  type: {
    type: String,
    require: [true, "Ferment must have a type"],
  },
  dob: {
    type: Date,
    require: [true, "Ferment must have a date of birth"],
  },
  frequency: {
    type: String,
    required:  [true, "Ferment must have a feed frequency"]
  },
  lastFed: {
    type: String,
    required: [true, "Ferment must have a last fed date"]
  },
  userId: {
    type: String,
    require: [true]
  }
});

const Ferment = mongoose.model("Ferment", fermentSchema);

module.exports = Ferment;
