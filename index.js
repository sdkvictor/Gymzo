//Packages
let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let mongoose = require("mongoose");
let uuid = require("uuid");
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

* createUser
* createRoutine:/:userId
* createInstExercise/:exerciseId
* createExercise/:routineId
* createWeight/:userId
* login

GET

* profile/:userid/
* getAllRoutines/:userid
* getAllWeights/:userId
* getAllExercises/:routineID
* getAllInstanceExercises/:exerciseId
* validate
* getInstanceExercises/:instanceExerciseId -> de aqui sacas finish date y start date
+ getMyRoutine/:userid/?day&month&year

PUT

* updateProfile/:userId
* updateWeight//:pesoId
* updateRoutine//:routineId
* updateExercise/:exerciseId
* updateInstExercise/:instanceExerciseId

DELETE

* deleteWeight/:pesoId
* deleteUser/:userId
* deleteRoutine/:routineId
* deleteExercise/:exerciseId
* deleteInstExercise/:instanceExerciseId

*/

let app = express();

/*

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");

  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});
*/

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
 res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
 if (req.method === "OPTIONS") {
 return res.send(204);
 }
 next();
});

app.use(express.static("public"));
app.use(morgan("dev"));
/*
PUT EXAMPLE OF USER

http://localhost:8080/gymzoAPI/updateUser/?userId=5e35b93e4f2fb69c19dfd424

{
"sex": "Female",
"defaultRoutine": {
	"name": "Arnlod's Routine",
	"userId": "5e35b93e4f2fb69c19dfd424"
},
"weightId": ["5e35bc5617f5c59cc7b9dbb9","5e359f3e1c9d440000f67d17"]
}
*/
//Checked
app.put("/gymzoAPI/updateUser", jsonParser, (req, res) => {
  let userId = req.query.userId;

  if (userId == undefined) {
    res.statusMessage = "No existe el userId";
    return res.status(406).send();
  }

  userController
    .getByUserId(userId)
    .then(user => {
      let resUser = req.body;

      let updatedUser = {
        name: resUser.name || user.name,
        email: resUser.email || user.email,
        password: resUser.password || user.password,
        dateOfBirth: resUser.dateOfBirth || user.dateOfBirth,
        sex: resUser.sex || user.sex,
        height: resUser.height || user.height,
        defaultRoutine: resUser.defaultRoutine || user.defaultRoutine,
        weightId: resUser.weightId || user.weightId
      };

      userController
        .update(user._id, updatedUser)
        .then(resUs => {
          res.statusMessage = "Updated User";
          return res.status(200).json(resUs);
        })
        .catch(err => {
          console.log(err);
          res.statusMessage = "Problemas con el servidor";
          return res.status(500).send();
        });
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontro un usuario con este id";
      res.status(406).send();
    });
});
/*
PUT EXAMPLE OF WEIGHT
http://localhost:8080/gymzoAPI/updateWeight/?weightId=5e35bc5617f5c59cc7b9dbb9
{
"weight": 75,
"measureDate": "2020-02-01"
}
*/
app.put("/gymzoAPI/updateWeight", jsonParser, (req, res) => {
  let W = req.query.weightId;

  if (weightId == undefined) {
    res.statusMessage = "No existe el weightId";
    return res.status(406).send();
  }

  weightController
    .getById(weightId)
    .then(weight => {
      let resWeight = req.body;

      let updatedWeight = {
        userId: resWeight.userId || weight.userId,
        weight: resWeight.weight || weight.weight,
        measureDate: resWeight.measureDate || weight.measureDate
      };

      weightController
        .update(weight._id, updatedWeight)
        .then(resWe => {
          res.statusMessage = "Updated Weight";
          return res.status(200).json(resWe);
        })
        .catch(err => {
          console.log(err);
          res.statusMessage = "Problemas con el servidor";
          return res.status(500).send();
        });
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontro un peso con este id";
      res.status(406).send();
    });
});
/*
PUT EXAMPLE OF EXERCISE
http://localhost:8080/gymzoAPI/updateExercise/?exerciseId=5e35a1a91c9d440000f67d23
{
"weekday": ["Monday","Saturday"],
"sets": 6,
"reps": 8
}
*/
app.put("/gymzoAPI/updateExercise", jsonParser, (req, res) => {
  let exerciseId = req.query.exerciseId;

  if (exerciseId == undefined) {
    res.statusMessage = "No existe el exerciseId";
    return res.status(406).send();
  }

  exerciseController
    .getById(exerciseId)
    .then(exercise => {
      let resExercise = req.body;

      let updatedExercise = {
        name: resExercise.name || exercise.name,
        sets: resExercise.sets || exercise.sets,
        reps: resExercise.reps || exercise.reps,
        weight: resExercise.weight || exercise.weight,
        userId: resExercise.userId || exercise.userId,
        weekday: resExercise.weekday || exercise.weekday,
        routineId: resExercise.routineId || exercise.routineId
      };

      exerciseController
        .update(exercise._id, updatedExercise)
        .then(resEx => {
          res.statusMessage = "Updated Exercise";
          return res.status(200).json(resEx);
        })
        .catch(err => {
          console.log(err);
          res.statusMessage = "Problemas con el servidor";
          return res.status(500).send();
        });
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontro un ejercicio con este id";
      res.status(406).send();
    });
});
/*
PUT EXAMPLE OF INSTANCE EXERCISE
http://localhost:8080/gymzoAPI/updateInstanceExercise/?instanceExerciseId=5e35a2911c9d440000f67d26
{
"finishDate": "1800-01-20"
}
*/
app.put("/gymzoAPI/updateInstanceExercise", jsonParser, (req, res) => {
  let instanceExerciseId = req.query.instanceExerciseId;

  if (instanceExerciseId == undefined) {
    res.statusMessage = "No existe el instanceExerciseId";
    return res.status(406).send();
  }

  instanceExerciseController
    .getById(instanceExerciseId)
    .then(iExercise => {
      let resExercise = req.body;

      let updatedInstanceExercise = {
        startDate: resExercise.startDate || iExercise.startDate,
        finishDate: resExercise.finishDate || iExercise.finishDate,
        exerciseId: resExercise.exerciseId || iExercise.exerciseId
      };

      instanceExerciseController
        .update(iExercise._id, updatedInstanceExercise)
        .then(resIEx => {
          console.log({ resIEx });
          res.statusMessage = "Updated Instance Exercise";
          return res.status(200).json(resIEx);
        })
        .catch(err => {
          console.log(err);
          res.statusMessage = "Problemas con el servidor";
          return res.status(500).send();
        });
    })
    .catch(err => {
      console.log(err);
      res.statusMessage =
        "No se encontro una instancia de ejercicio con este id";
      res.status(406).send();
    });
});
/*
PUT EXAMPLE OF ROUTINE

*/
//Falta verificar porque no se crean las rutinas
app.put("/gymzoAPI/updateRoutine", jsonParser, (req, res) => {
  let routineId = req.query.routineId;

  if (routineId == undefined) {
    res.statusMessage = "No existe el routineId";
    return res.status(406).send();
  }

  routineController
    .getById(routineId)
    .then(routine => {
      let resExercise = req.body;

      let updatedExercise = {
        name: resExercise.name || routine.name,
        userId: resExercise.userId || routine.userId
      };

      routineController
        .update(routine._id, updatedExercise)
        .then(resRou => {
          res.statusMessage = "Updated Routine";
          return res.status(200).json(resRou);
        })
        .catch(err => {
          console.log(err);
          res.statusMessage = "Problemas con el servidor";
          return res.status(500).send();
        });
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "No se encontro una rutina con este id";
      res.status(406).send();
    });
});

//Checked
app.post("/gymzoAPI/createUser", jsonParser, (req, res) => {
  let { name, email, password, dateOfBirth, sex, height } = req.body;

  if (
    name == undefined ||
    email == undefined ||
    password == undefined ||
    dateOfBirth == undefined ||
    sex == undefined ||
    height == undefined
  ) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  let newUser = {
    id: uuid.v4(),
    name: name,
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
    sex: sex,
    height: height
  };

  userController
    .create(newUser)
    .then(user => {
      res.statusMessage = "Usuario Añadido";
      return res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error al añadir nuevo Usuario";
      return res.status(500).send(newUser);
    });
});
//Checked
app.post("/gymzoAPI/createExercise", jsonParser, (req, res) => {
  let { name, sets, reps, weight, weekday, routineId } = req.body;

  if (
    name == undefined ||
    sets == undefined ||
    reps == undefined ||
    weight == undefined ||
    weekday == undefined ||
    routineId == undefined
  ) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  let newExercise = {
    sets: sets,
    reps: reps,
    weight: weight,
    weekday: weekday,
    routineId: routineId
  };

  exerciseController
    .create(newExercise)
    .then(exercise => {
      res.statusMessage = "Ejercicio Añadido";
      return res.status(201).json(exercise);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error al añadir nuevo Ejercicio";
      return res.status(500).send(newExercise);
    });
});
//Checked
app.post("/gymzoAPI/createRoutine", jsonParser, (req, res) => {
  let { name, userId } = req.body;

  if (name == undefined || userId == undefined) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  let newRoutine = {
    name: name,
    userId: userId
  };

  routineController
    .create(newRoutine)
    .then(routine => {
      res.statusMessage = "Rutina Añadida";
      return res.status(201).json(routine);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error al añadir nueva Rutina";
      return res.status(500).send(newRoutine);
    });
});
//Checked
app.post("/gymzoAPI/createInstanceExercise", jsonParser, (req, res) => {
  let { startDate, finishDate, exerciseId } = req.body;

  if (
    startDate == undefined ||
    finishDate == undefined ||
    exerciseId == undefined
  ) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  let newInstanceExercise = {
    startDate: startDate,
    finishDate: finishDate,
    exerciseId: exerciseId
  };

  instanceExerciseController
    .create(newInstanceExercise)
    .then(iExercise => {
      res.statusMessage = "Instancia de Ejercicio Añadida";
      return res.status(201).json(iExercise);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error al añadir nueva Instancia de Ejercicio";
      return res.status(500).send(newInstanceExercise);
    });
});
//Checked
app.post("/gymzoAPI/createWeight", jsonParser, (req, res) => {
  let { userId, weight, measureDate } = req.body;

  if (userId == undefined || weight == undefined || measureDate == undefined) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  let newWeight = {
    userId: userId,
    weight: weight,
    measureDate: measureDate
  };

  weightController
    .create(newWeight)
    .then(weight => {
      res.statusMessage = "Peso Añadida";
      return res.status(201).json(weight);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error al añadir nuevo Peso";
      return res.status(500).send(newWeight);
    });
});
//Checked
//http://localhost:8080/gymzoAPI/profile/?userId=5e359f3e1c9d440000f67d17
app.get("/gymzoAPI/profile", jsonParser, (req, res) => {
  let userId = req.query.userId;
  console.log({ userId });

  if (userId == undefined) {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }
  userController
    .getByUserId(userId)
    .then(user => {
      if (Object.keys(user).length === 0) {
        res.statusMessage = "No se encontró al usuario";
        return res.status(400).send();
      }
      console.log(user);
      res.statusMessage = "Se encontró una persona";
      return res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database error";
      return res.status(500).send();
    });
});
//No esta programada
app.get("/gymzoAPI/getMyRoutine", jsonParser, (req, res) => {
  let userId = req.body.userId;
  let { day, month, year } = req.body;

  if (userId == undefined) {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }

  if (day == undefined || month == undefined || year == undefined) {
    res.statusMessage = "Faltan propiedades";
    return res.status(400).send();
  }
  routineController
    .getByUserId(userId)
    .then(routines => {
      if (Object.keys(routines).length === 0) {
        res.statusMessage = "No se encontraron las rutinas";
        return res.status(400).send();
      }
      res.statusMessage = "Se encontraron las rutinas";
      return res.status(200).json(routines);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database error";
      return res.status(500).send();
    });
});

//Checked
//http://localhost:8080/gymzoAPI/getAllRoutines/?userId=5e359f3e1c9d440000f67d17
app.get("/gymzoAPI/getAllRoutines", jsonParser, (req, res) => {
  let userId = req.query.userId;

  if (userId == undefined) {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }

  routineController
    .getByUserId(userId)
    .then(routines => {
      if (Object.keys(routines).length === 0) {
        res.statusMessage = "No se encontraron las rutinas";
        return res.status(400).send();
      }
      res.statusMessage = "Se encontraron las rutinas";
      return res.status(200).json(routines);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database error";
      return res.status(500).send();
    });
});
//Checked
//http://localhost:8080/gymzoAPI/GetAllWeights/?userId=5e359f3e1c9d440000f67d17
app.get("/gymzoAPI/getAllWeights", jsonParser, (req, res) => {
  let userId = req.query.userId;

  if (userId == undefined || userId === "") {
    res.statusMessage = "Añadir un valor de userID en el query string";
    return res.status(406).send();
  }

  weightController
    .getByUserId(userId)
    .then(records => {
      if (Object.keys(records).length === 0) {
        res.statusMessage = "No se encontraron los pesos";
        return res.status(400).send();
      }
      res.statusMessage = "Se encontraron los pesos";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database Error";
      return res.status(500).send();
    });
});
//Checked
//http://localhost:8080/gymzoAPI/getAllExercises/?routineId=5e35a15c1c9d440000f67d21
app.get("/gymzoAPI/getAllExercises", jsonParser, (req, res) => {
  let routineId = req.query.routineId;

  if (routineId == undefined || routineId === "") {
    res.statusMessage = "Añadir un valor de routineId en el query string";
    return res.status(406).send();
  }

  exerciseController
    .getByRoutineId(routineId)
    .then(records => {
      if (Object.keys(records).length === 0) {
        res.statusMessage = "No se encontraron los ejercicios";
        return res.status(400).send();
      }
      res.statusMessage = "Se encontraron los ejercicios";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database Error";
      return res.status(500).send();
    });
});
//localhost:8080/gymzoAPI/getAllInstanceExercises/?exerciseId=5e35a1a91c9d440000f67d23
app.get("/gymzoAPI/getAllInstanceExercises", jsonParser, (req, res) => {
  let exerciseId = req.query.exerciseId;

  if (exerciseId == undefined) {
    res.statusMessage = "Añadir un valor de exerciseId en el query string";
    return res.status(406).send();
  }

  instanceExerciseController
    .getByExerciseId(exerciseId)
    .then(records => {
      if (Object.keys(records).length === 0) {
        res.statusMessage =
          "No se encontraron las instancias de los ejercicios";
        return res.status(400).send();
      }

      res.statusMessage = "Se encontraron las instancias de los ejercicios";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database error";
      return res.status(500).send();
    });
});

app.get("/gymzoAPI/getInstanceExercises", jsonParser, (req, res) => {
  let instanceExerciseId = req.query.instanceExerciseId;

  if (instanceExerciseId == undefined) {
    res.statusMessage =
      "Añadir un valor de instanceExerciseId en el query string";
    return res.status(406).send();
  }

  instanceExerciseController
    .getById(instanceExerciseId)
    .then(records => {
      if (Object.keys(records).length === 0) {
        res.statusMessage =
          "No se encontraron las instancias de los ejercicios";
        return res.status(400).send();
      }

      res.statusMessage = "Se encontraron las instancias de los ejercicios";
      return res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Database error";
      return res.status(500).send();
    });
});
//Checked
app.delete("/gymzoAPI/deleteWeight", (req, res) => {
  let weightId = req.query.weightId;

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
//Checked
app.delete("/gymzoAPI/deleteRoutine", (req, res) => {
  let routineId = req.query.routineId;

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
//Checked
app.delete("/gymzoAPI/deleteExercise", (req, res) => {
  let exerciseId = req.query.exerciseId;

  if (exerciseId == undefined) {
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
//Checked
app.delete("/gymzoAPI/deleteInstanceExercise", (req, res) => {
  let instanceExerciseId = req.query.instanceExerciseId;

  if (instanceExerciseId == undefined) {
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
//Checked
app.delete("/gymzoAPI/deleteUser", (req, res) => {
  let userId = req.query.userId;

  if (userId == undefined) {
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
  let { email, password, _id } = req.body;

  if (email == undefined || password == undefined) {
    res.statusMessage = "No hay email o password";
    return res.status(406).send();
  }
  userController
    .getByEmail(email)
    .then(user => {
      if (user != undefined) {
        let data = {
          emai: user.email,
          password: user.password,
          id: user._id
        };
        if(password!=user.password){
          res.statusMessage = "Invalid password";
          return res.status(400).send();
        }

        let token = jwt.sign(data, JWTTOKEN, {
          expiresIn: 60 * 5
        });
        console.log(token);
        return res.status(200).json({ token, id:user._id});
      }
      res.statusMessage = "No se encontró el usuario";
      return res.status(400).send();
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error en el servidor";
      return res.status(500).send();
    });
});

app.get("/gymzoAPI/validate/:token", (req, res) => {
  //let token = req.headers.authorization;
  let token = req.params.token;
  token = token.replace("Bearer ", "");

  jwt.verify(token, JWTTOKEN, (err, user) => {
    if (err) {
      res.statusMessage = "Token not valid";
      return res.status(400).send();
    }
    console.log(user);
    return res.status(200).json({ message: "Success", id:user.id});
  });
});

let server;
function runServer(port, databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useFindAndModify: false }, response => {
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
