let mongoose = require("mongoose");
let { exerciseSchema } = require("./exercise");

let routineSchema = mongoose.Schema({
  name: { type: String },
  exercises: [exerciseSchema]
});

module.exports = {
  routineSchema
};
