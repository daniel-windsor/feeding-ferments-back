const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "User must have a first name"],
  },
  lastName: {
    type: String,
    require: [false],
  },
  email: {
    type: String,
    require: [true, "User must have an email address"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "User must have a password"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
