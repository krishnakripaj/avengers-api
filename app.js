const express = require("express");
const mongoose = require("mongoose");
const avengers = require("./routes/avengers");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const app = express(); // created an express application

app.use(express.json()); // parse json objects ; telling app to use inbuilt middleware
app.use(logger); // telling app to use the custom middleware logger
app.use(authenticator);
app.use("/api/avengers", avengers);
app.use("/", home);

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

mongoose
  .connect("mongodb://localhost/avengerdb", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to db successfully ....");
  })
  .catch(() => console.log("Error: " + err));
