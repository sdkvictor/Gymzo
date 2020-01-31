let mongoose = require("mongoose");

let routineSchema = mongoose.Schema({
  name: { type: String },
  personId: { type: String }
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
  }
};
module.exports = {
  routineController
};
