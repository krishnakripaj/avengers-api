log = (req, res, next) => {
  console.log("Logging User Details ........ ");
  next();
};

module.exports = log;
