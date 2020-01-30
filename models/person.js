let mongoose = require("mongoose");
let uuid = require("uuid/v4");
let { weightSchema } = require("./weight");
let { routineSchema } = require("./routine");

mongoose.Promise = global.Promise;

let personCollection = mongoose.Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  dateOfBirth: { type: Date },
  sex: { type: String },
  height: { type: Number },
  defaultRoutine: { type: routineSchema },
  weight: [weightSchema],
  routine: [routineSchema]
});

let Person = mongoose.model("person", personCollection);

let personController = {};
