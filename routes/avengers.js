const express = require("express");
const jwt = require("jsonwebtoken");
const Avenger = require("../models/avenger");
const router = express.Router();

SECRET_KEY = "123456789";

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
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }
  let avenger = await Avenger.findById(req.params.avengerId);
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }
  res.status(200).send(avenger);
});

router.post("/", async (req, res) => {
  const token = req.header("x-jwt-token");
  if (!token) return res.status(401).send("Access is denied. No token found");

  try {
    jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }
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
  const token = req.header("x-jwt-token");
  if (!token) return res.status(401).send("Access is denied. No token found");

  // Checking whether valid and authenticated
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return res.status(400).send("Invalid token");
  }

  let decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded.isAdmin) {
    return res.status(403).send("Forbidden. You don't have access to this endpoint")
  }

  let avenger = await Avenger.findOneAndDelete({ _id: req.params.avengerId });
  if (!avenger) {
    return res.status(404).send("The given ID does not exist on our system");
  }

  res.send(avenger);
});

module.exports = router;
