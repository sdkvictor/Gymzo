let mongoose = require("mongoose");

let weightSchema = mongoose.Schema({
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
  }
};
module.exports = {
  weightController
};
