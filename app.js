const express = require("express");
const mongoose = require("mongoose");
const avengers = require("./routes/avengers");
const cors = require("cors");
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");
const logger = require("./middleware/logger");
const authenticator = require("./middleware/authenticator");
const app = express(); // created an express application

app.use(cors());
app.use(express.json()); // parse json objects ; telling app to use inbuilt middleware
app.use(logger); // telling app to use the custom middleware logger
app.use(authenticator);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/avengers", avengers);
app.use("/", home);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Listening on Port" + PORT);
});

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.1thju.mongodb.net/avengersdb?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to db successfully ....");
  })
  .catch((err) => console.log(err));
