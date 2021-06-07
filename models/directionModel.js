const mongoose = require("mongoose")

const directionSchema = new mongoose.Schema({
  fermentId: {
    type: String,
    require: [true, "Direction must be tied to a ferment.  Provide an id"]
  },
  userId: {
    type: String,
    require: [true, "Direction must be tied to a user.  Provide an id"]
  },
  title: {
    type: String,
    require: [true, "Direction must have a title"]
  },
  direction: {
    type: String,
    require: [true, "Directions must be provided"]
  },
  index: {
    type: Number,
    require: [true, "Direction must have an index"]
  }
})

const Direction = mongoose.model("Direction", directionSchema)

module.exports = Direction