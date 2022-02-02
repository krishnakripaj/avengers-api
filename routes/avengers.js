const express = require("express");
const Avenger = require("../models/avenger");
const router = express.Router();

let avengerArray = [
  { id: 1, name: "Captain America" },
  { id: 2, name: "Thor" },
  { id: 3, name: "Black Widow" },
];

// GET ALL
router.get("/", async (req, res) => {
  try {
    let avengers = await Avenger.find().sort({ name: "asc" });
    return res.send(avengers);
  } catch (ex) {
    return res.status(500).send("Error: " + ex.message);
  }
});

// HOMEWORK: 
//1. Try to see how to return only the name, deceased and movies of the avengers
//2. Return all avengers whose like count is greater than 4000
//3. Return all avengers whose like count is greaer than 4000 and is still alive. Read about logical operators (eg: and, or)

// GET with Params
// ==      comparing the value "2" == 2
// ===     comparing the value and the data type "2" === 2
router.get("/:avengerId", (req, res) => {
  let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }
  res.status(200).send(avenger);
});

router.post("/", async (req, res) => {
  // if (!req.body.avengerName) {
  //   return res.status(400).send("Not all mandatory values are sent");
  // }
  try {
    let avenger = new Avenger({
      name: req.body.avengerName,
      birthName: req.body.birthName,
      movies: req.body.movies,
      imgUrl: req.body.imgUrl,
      likeCount: req.body.likeCount,
      deceased: req.body.deceased,
    });

    avenger = await avenger.save();
    return res.send(avenger);
  } catch (ex) {
    return res.status(500).send("Error: " + ex.message);
  }
});

router.put("/:avengerId", (req, res) => {
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

router.delete("/:avengerId", (req, res) => {
  let avenger = avengerArray.find((a) => a.id == req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }

  let indexOfAvenger = avengerArray.indexOf(avenger);
  avengerArray.splice(indexOfAvenger, 1);

  res.send(avenger);
});

module.exports = router;
