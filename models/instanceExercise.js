let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let instanceExerciseSchema = mongoose.Schema(
  {
    startDate: { type: Date },
    finishDate: { type: Date },
    exerciseId: { type: String }
  },
  { collection: "instanceExercises" }
);

let InstanceExercise = mongoose.model(
  "instanceExercises",
  instanceExerciseSchema
);

let instanceExerciseController = {
  getAll: function() {
    return InstanceExercise.find()
      .then(iExercises => {
        return iExercises;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByExerciseId: function(id) {
    return InstanceExercise.find({ exerciseId: id })
      .then(iExercise => {
        return iExercise;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getById: function(id) {
    return InstanceExercise.find({ _id: mongoose.Types.ObjectId(id) })
      .then(iExercise => {
        return iExercise;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return InstanceExercise.findOneAndRemove({
      _id: mongoose.Types.ObjectId(id)
    })
      .then(instanceExercise => {
        return instanceExercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  create: function(newInstanceExercise) {
    return InstanceExercise.create(newInstanceExercise)
      .then(iExercise => {
        return iExercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  update: function(id, newInstanceExercise) {
    return InstanceExercise.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      newInstanceExercise
    )
      .then(iExercise => {
        return iExercise;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = {
  instanceExerciseController
};
