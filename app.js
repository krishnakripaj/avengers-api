const express = require("express");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const app = express(); // created an express application

app.use(express.json()); // parse json objects ; telling app to use inbuilt middleware
app.use(logger); // telling app to use the custom middleware logger
app.use(authenticator);

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

let avengerArray = [
  { id: 1, name: "Captain America" },
  { id: 2, name: "Thor" },
  { id: 3, name: "Black Widow" },
];

// Callback function here is called a route handler
app.get("/", (req, res) => {
  res.send("You have successfully connected to our API! Welcome");
});

// GET ALL
app.get("/api/avengers", (req, res) => {
  console.log("GET Method called ....... ");
  res.send(avengerArray);
});

// GET with Params
// ==      comparing the value "2" == 2
// ===     comparing the value and the data type "2" === 2
app.get("/api/avengers/:avengerId", (req, res) => {
  let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }
  res.status(200).send(avenger);
});

app.post("/api/avengers", (req, res) => {
  //Validations
  if (!req.body.avengerName) {
    return res.status(400).send("Not all mandatory values are sent");
  }

  let newAvengerObj = {
    id: avengerArray.length + 1,
    name: req.body.avengerName,
  };
  avengerArray.push(newAvengerObj);
  res.send(newAvengerObj);
});

app.put("/api/avengers/:avengerId", (req, res) => {
  let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }

  // validation
  if (!req.body.avengerName) {
    return res.status(400).send("Not all mandatory values are sent");
  }

  avenger.name = req.body.avengerName;
  res.send(avenger);
});

app.delete("/api/avengers/:avengerId", (req, res) => {
  let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }

  let indexOfAvenger = avengerArray.indexOf(avenger);
  avengerArray.splice(indexOfAvenger, 1);

  res.send(avenger);
});
