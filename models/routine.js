let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let routineSchema = mongoose.Schema({
  name: { type: String },
  userId: { type: String }
});

let Routine = mongoose.Model("routines", routineSchema);

let routineController = {
  getAll: function() {
    Routine.find()
      .then(routines => {
        return routines;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByUserId: function(id) {
    Routine.find({ userId: id })
      .then(routines => {
        return routines;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getById: function(id) {
    Routine.find({ _id: id })
      .then(routine => {
        return routine;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return Routine.findOneAndRemove({ _id: id })
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
    return Routine.findOneAndUpdate({ _id: id }, newRoutine)
      .then(routine => {
        return routine;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
  /*
  getByDate: function(userId, day, month, year) {
    Routine.findMany({userId: userId, })
      .then(routines => {
        return routines;
      })
      .catch(err => {
        throw new Error(err);
      }); }
  */
};
module.exports = {
  routineController
};
