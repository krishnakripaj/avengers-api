const express = require("express");
const router = express.Router();

// Callback function here is called a route handler
router.get("/", (req, res) => {
  res.send("You have successfully connected to our API! Welcome");
});

module.exports = router;