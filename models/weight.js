let mongoose = require("mongoose");

let weightSchema = mongoose.Schema({
  weight: { type: Number },
  measureDate: { type: Date }
});

module.exports = {
  weightSchema
};
