let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

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
  },
  getByExerciseId: function(id) {
    InstanceExercise.find({ exerciseId: id })
      .then(exercise => {
        return exercise;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return InstanceExercise.findOneAndRemove({ _id: id })
      .then(instanceExercise => {
        return instanceExercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = {
  instanceExerciseController
};
