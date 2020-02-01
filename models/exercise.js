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

let Exercise = mongoose.Model("exercises", exerciseSchema);

let exerciseController = {
  getAll: function() {
    Exercise.find()
      .then(ex => {
        return ex;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByRoutineId: function(id) {
    Exercise.find({ routineId: id })
      .then(exercise => {
        return exercise;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return Exercise.findOneAndRemove({ _id: id })
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
