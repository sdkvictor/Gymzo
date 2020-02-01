let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let weightSchema = mongoose.Schema({
  userId: { type: String },
  weight: { type: Number },
  measureDate: { type: Date }
});

let Weight = mongoose.model("weights", weightSchema);

let weightController = {
  getAll: function() {
    return Weight.find()
      .then(weights => {
        return weights;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByUserId: function(id) {
    return Weight.find({ userId: id })
      .then(records => {
        return records;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getById: function(id) {
    return Weight.findOne({ _id: mongoose.Types.ObjectId(id) })
      .then(record => {
        return record;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return Weight.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) })
      .then(weight => {
        return weight;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  create: function(newWeight) {
    return Weight.create(newWeight)
      .then(weight => {
        return weight;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  update: function(id, newWeight) {
    return Weight.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      newWeight
    )
      .then(weight => {
        return weight;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};
module.exports = {
  weightController
};
