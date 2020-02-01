let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let exerciseSchema = mongoose.Schema({
  name: { type: String },
  sets: { type: Number },
  reps: { type: Number },
  weight: { type: Number },
  weekday: [String],
  routineId: { type: String }
});

let Exercise = mongoose.model("exercises", exerciseSchema);

let exerciseController = {
  getAll: function() {
    return Exercise.find()
      .then(ex => {
        return ex;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByRoutineId: function(id) {
    return Exercise.find({ routineId: id })
      .then(exercise => {
        return exercise;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getById: function(id) {
    return Exercise.findOne({ _id: mongoose.Types.ObjectId(id) })
      .then(exercise => {
        return exercise;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return Exercise.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) })
      .then(exercise => {
        return exercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  create: function(newExercise) {
    return Exercise.create(newExercise)
      .then(exercise => {
        return exercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  update: function(id, newExercise) {
    return Exercise.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      newExercise
    )
      .then(exercise => {
        return exercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = {
  exerciseController
};
