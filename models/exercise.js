let mongoose = require("mongoose");

let exerciseSchema = mongoose.Schema({
  name: { type: String },
  sets: { type: Number },
  reps: { type: Number },
  weight: { type: Number },
  weekday: [String]
});

module.exports = {
  exerciseSchema
};
