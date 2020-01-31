let mongoose = require("mongoose");
let { routineSchema } = require("./routine");

mongoose.Promise = global.Promise;

let userCollection = mongoose.Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  dateOfBirth: { type: Date },
  sex: { type: String },
  height: { type: Number },
  defaultRoutine: { type: routineSchema },
  weightId: { type: String }
});

let User = mongoose.model("users", userCollection);

let userController = {
  getAll: function() {
    User.find()
      .then(people => {
        return people;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};

module.exports = {
  userController
};
