const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
SECRET_KEY = "123456789";

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid credentials");

    let pwMatching = await bcrypt.compare(req.body.password, user.password);
    if (!pwMatching) return res.status(400).send("Invalid credentials");

    let token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      SECRET_KEY, {expiresIn: "10h"}
    );

    return res.send({ token: token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
