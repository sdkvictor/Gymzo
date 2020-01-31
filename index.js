//Packages
let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

//Models
let { exerciseController } = require("./models/exercise");
let { instanceExerciseController } = require("./models/instanceExercise");
let { routineController } = require("./models/routine");
let { userController } = require("./models/user");
let { weightController } = require("./models/weight");

//Variables
let { DATABASE_URL, PORT, JWTTOKEN } = require("./config");

let app = express();
app.use(express.static("public"));
app.use(morgan("dev"));

app.post("/api/login", jsonParser, (req, res) => {
  let user = req.body.user;
  let password = req.body.password;
  //validar usuario en la base de datos
  let data = {
    user,
    password
  };
  let token = jwt.sign(data, JWTTOKEN, {
    expiresIn: 60 * 5
  });
  console.log(token);
  return res.status(200).json({ token });
});

app.get("/api/validate", (req, res) => {
  console.log(req.headers);
  let token = req.headers.authorization;
  token = token.replace("Bearer ", "");

  jwt.verify(token, JWTTOKEN, (err, user) => {
    if (err) {
      res.statusMessage = "Token not valid";
      return res.status(400).send();
    }
    console.log(user);
    return res.status(200).json({ message: "Éxito" });
  });
});

let server;
function runServer(port, databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, response => {
      if (response) {
        return reject(response);
      } else {
        server = app
          .listen(port, () => {
            console.log("App is running on port " + port);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            return reject(err);
          });
      }
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing the server");
      server.close(err => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

runServer(PORT, DATABASE_URL);

module.exports = { app, runServer, closeServer };
