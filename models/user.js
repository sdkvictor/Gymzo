let mongoose = require("mongoose");
let { routineSchema } = require("./routine");

mongoose.Promise = global.Promise;

let userCollection = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  dateOfBirth: { type: Date },
  sex: { type: String },
  height: { type: Number },
  defaultRoutine: { type: routineSchema },
  weightId: [String]
});

let User = mongoose.model("users", userCollection);

let userController = {
  getAll: function() {
    return User.find()
      .then(people => {
        return people;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByUserId: function(id) {
    return User.findOne({ _id: mongoose.Types.ObjectId(id) })
      .then(user => {
        return user;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getByEmail: function(email) {
    return User.findOne({ email: email })
      .then(user => {
        return user;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  delete: function(id) {
    return User.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) })
      .then(user => {
        return user;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  create: function(newUser) {
    return User.create(newUser)
      .then(user => {
        return user;
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  update: function(id, newUser) {
    return User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, newUser)
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
