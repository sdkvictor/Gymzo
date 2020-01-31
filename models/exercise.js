let mongoose = require("mongoose");

let exerciseSchema = mongoose.Schema({
  name: { type: String },
  sets: { type: Number },
  reps: { type: Number },
  weight: { type: Number },
  weekday: [String],
  routineId: { type: String }
});

let Excercise = mongoose.Model("excercises", exerciseSchema);

let exerciseController = {
  getAll: function() {
    Excercise.find()
      .then(ex => {
        return ex;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};

module.exports = {
  exerciseController
};
