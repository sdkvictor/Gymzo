let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let weightSchema = mongoose.Schema({
  userId: { type: String },
  weight: { type: Number },
  measureDate: { type: Date }
});

let Weight = mongoose.Model("weights", weightSchema);

let weightController = {
  getAll: function() {
    Weight.find()
      .then(weights => {
        return weights;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByUserId: function(id) {
    Weight.find({ userId: id })
      .then(records => {
        return records;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getById: function(id) {
    Weight.findOne({ _id: id })
      .then(record => {
        return record;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return Weight.findOneAndRemove({ _id: id })
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
    return Weight.findOneAndUpdate({ _id: id }, newWeight)
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
