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
  delete: function(id) {
    return Routine.findOneAndRemove({ _id: id })
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
