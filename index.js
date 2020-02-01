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
/*

POST

createUser
createRoutine:/:userId
createInstExercise/:exerciseId
createExercise/:routineId
createWeight/:userId

login

GET

* profile/:userid/
* getAllRoutines/:userid
* getAllWeights/:userId
* getAllExercises/:routineID
* getAllInstanceExercises/:exerciseId

validate
getMyRoutine/:userid/?day&month&year
getExerciseWeight/:instanceExerciseId
getExerciseDate/:instanceExerciseId

PUT

modifyProfile/:userId
modifyWeight//:pesoId
modifyRoutine//:routineId
modifyExercise/:exerciseId
modifyInstExercise/:instanceExerciseId

DELETE

* deleteWeight/:pesoId
* deleteUser/:userId
* deleteRoutine/:routineId
* deleteExercise/:exerciseId
* deleteInstExercise/:instanceExerciseId

*/

let app = express();
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/gymzoAPI/profile", jsonParser, (req, res) => {
  let userId = req.body.userId;

  if (userId == undefined || userId === "") {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }
  userController
    .getByUserId(userId)
    .then(user => {
      res.statusMessage = "Se encontró una persona";
      return res.status(200).json(user);
    })
    .catch(err => {
      res.statusMessage = "No se encontró una persona";
      return res.status(400).send();
    });
});

app.get("/gymzoAPI/getMyRoutine", jsonParser, (req, res) => {
  let userId = req.body.userId;
  let { day, month, year } = req.body;
});

app.get("/gymzoAPI/getAllRoutines", jsonParser, (req, res) => {
  let userId = req.body.userId;

  if (userId == undefined || userId === "") {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }

  routineController
    .getByUserId(userId)
    .then(routines => {
      res.statusMessage = "Se encontraron las rutinas";
      return res.status(200).json(routines);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontraron las rutinas";
      return res.status(400).send();
    });
});

app.get("/gymzoAPI/getAllWeights", jsonParser, (req, res) => {
  let userId = req.body.userId;

  if (userId == undefined || userId === "") {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }

  weightController
    .getByUserId(userId)
    .then(records => {
      res.statusMessage = "Se encontraron los pesos";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontraron las pesos";
      return res.status(400).send();
    });
});

app.get("/gymzoAPI/getAllExercises", jsonParser, (req, res) => {
  let routineId = req.body.routineId;

  if (routineId == undefined || routineId === "") {
    res.statusMessage = "Añadir un valor de routineId en el query string";
    return res.status(406).send();
  }
  exerciseController
    .getByRoutineId(routineId)
    .then(records => {
      res.statusMessage = "Se encontraron los ejercicios";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontraron las ejercicios";
      return res.status(400).send();
    });
});

app.get("/gymzoAPI/getAllInstanceExercises", jsonParser, (req, res) => {
  let exerciseId = req.body.exerciseId;

  if (exerciseId == undefined || exerciseId === "") {
    res.statusMessage = "Añadir un valor de routineId en el query string";
    return res.status(406).send();
  }

  instanceExerciseController
    .getByExerciseId(exerciseId)
    .then(records => {
      res.statusMessage = "Se encontraron las instancias de los ejercicios";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontraron las instancias de los ejercicios";
      return res.status(400).send();
    });
});

app.delete("/gymzoAPI/deleteWeight", (req, res) => {
  let weightId = req.body.weightId;

  if (weightId == undefined || weightId === "") {
    res.statusMessage = "Añadir un valor de weightId en el query string";
    return res.status(406).send();
  }

  weightController
    .delete(weightId)
    .then(weight => {
      res.statusMessage = "Peso borrado";
      return res.status(200).json(weight);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontró el peso";
      return res.status(404).send();
    });
});

app.delete("/gymzoAPI/deleteRoutine", (req, res) => {
  let routineId = req.body.routineId;

  if (routineId == undefined || routineId === "") {
    res.statusMessage = "Añadir un valor de routineId en el query string";
    return res.status(406).send();
  }

  routineController
    .delete(routineId)
    .then(routine => {
      res.statusMessage = "Rutina borrada";
      return res.status(200).json(routine);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontró la rutina";
      return res.status(404).send();
    });
});

app.delete("/gymzoAPI/deleteExercise", (req, res) => {
  let exerciseId = req.body.exerciseId;

  if (exerciseId == undefined || exerciseId === "") {
    res.statusMessage = "Añadir un valor de routineId en el query string";
    return res.status(406).send();
  }

  exerciseController
    .delete(exerciseId)
    .then(exercise => {
      res.statusMessage = "Ejercicio borrado";
      return res.status(200).json(exercise);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontró el ejercicio";
      return res.status(404).send();
    });
});

app.delete("/gymzoAPI/deleteInstanceExercise", (req, res) => {
  let instanceExerciseId = req.body.instanceExerciseId;

  if (instanceExerciseId == undefined || instanceExerciseId === "") {
    res.statusMessage =
      "Añadir un valor de instanceExerciseId en el query string";
    return res.status(406).send();
  }

  instanceExerciseController
    .delete(instanceExerciseId)
    .then(instanceExercise => {
      res.statusMessage = "Instancia de ejercicio borrada";
      return res.status(200).json(instanceExercise);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontró el ejercicio";
      return res.status(404).send();
    });
});

app.delete("/gymzoAPI/deleteUser", (req, res) => {
  let userId = req.body.userId;

  if (userId == undefined || userId === "") {
    res.statusMessage = "Añadir un valor de userId en el query string";
    return res.status(406).send();
  }

  userController
    .delete(userId)
    .then(user => {
      res.statusMessage = "Usuario borrado";
      return res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontró el usuario";
      return res.status(404).send();
    });
});

/* 
validation and login
let url = "http://localhost:8080/api/newStudent";

let settings = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token"
  },
  body: JSON.stringify({
    nombre: "Alan",
    apellido: "Gomez",
    matricula: 12345
  })
}; */

app.post("/gymzoAPI/login", jsonParser, (req, res) => {
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

app.get("/gymzoAPI/validate", (req, res) => {
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
