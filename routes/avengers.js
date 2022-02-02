const express = require("express");
const Avenger = require("../models/avenger");
const router = express.Router();

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
router.get("/:avengerId", async (req, res) => {
  let avenger = await Avenger.findById(req.params.avengerId);
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

router.put("/:avengerId", async (req, res) => {
  let avenger = await Avenger.findById(req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }

  // validation
  if (!req.body.likeCount) {
    return res.status(400).send("Not all mandatory values are sent");
  }

  avenger.set({ likeCount: req.body.likeCount });
  avenger = await avenger.save();
  res.send(avenger);
});

router.delete("/:avengerId", async (req, res) => {
  let avenger = await Avenger.findOneAndDelete({ _id: req.params.avengerId})
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }

  res.send(avenger);
});

module.exports = router;
