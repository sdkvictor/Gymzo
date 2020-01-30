let mongoose = require("mongoose");
let { exerciseSchema } = require("./exercise");

let weekExerciseSchema = mongoose.Schema({
  startDate: { type: Date },
  finishDate: { type: Date },
  exercises: [exerciseSchema]
});

let WeekExercise = mongoose.Model("weekExercise", weekExerciseSchema);

let weekExerciseController = {
  getAll: function() {
    WeekExercise.find().then(exercises => {
      return exercises;
    });
  }
};

module.exports = {
  weekExerciseSchema
};
