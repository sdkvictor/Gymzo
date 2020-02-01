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
  },
  getByUserId: function(id) {
    User.findOne({ id: id })
      .then(user => {
        return user;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return User.findOneAndRemove({ _id: id })
      .then(user => {
        return user;
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

module.exports = {
  userController
};
