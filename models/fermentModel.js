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
    type: String,
    require: [true, "Ferment must have a date of birth"],
  },
  userId: {
    type: mongoose.ObjectId,
    require: [true]
  }
});

const Ferment = mongoose.model("Ferment", fermentSchema);

module.exports = Ferment;
