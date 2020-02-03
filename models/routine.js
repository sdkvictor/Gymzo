let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let routineSchema = mongoose.Schema({
  name: { type: String },
  userId: { type: String }
});

let Routine = mongoose.model("routines", routineSchema);

let routineController = {
  getAll: function() {
    return Routine.find()
      .then(routines => {
        return routines;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByUserId: function(id) {
    return Routine.find({ userId: id })
      .then(routines => {
        return routines;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getById: function(id) {
    return Routine.findOne({ _id: id })
      .then(routine => {
        return routine;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return Routine.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) })
      .then(routine => {
        return routine;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  create: function(newRoutine) {
    return Routine.create(newRoutine)
      .then(routine => {
        return routine;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  update: function(id, newRoutine) {
    return Routine.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      newRoutine
    )
      .then(routine => {
        return routine;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};
module.exports = {
  routineSchema,
  routineController
};
