authenticator = (req, res, next) => {
  console.log("Authenticating User ........ ");
  next(); // important to tell to go to the next middleware
};

module.exports = authenticator