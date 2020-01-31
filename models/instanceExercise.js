let mongoose = require("mongoose");
let { exerciseSchema } = require("./exercise");

let instanceExerciseSchema = mongoose.Schema({
  startDate: { type: Date },
  finishDate: { type: Date },
  exerciseId: { type: String }
});

let InstanceExercise = mongoose.Model(
  "instanceExercise",
  instanceExerciseSchema
);

let instanceExerciseController = {
  getAll: function() {
    InstanceExercise.find()
      .then(instanceExercises => {
        return instanceExercises;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};

module.exports = {
  instanceExerciseController
};
