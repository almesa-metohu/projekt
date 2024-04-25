const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  jwt.verify(req.cookies, process.env.SECRET_KEY, (err, payload) => {
    console.log(
      "process.env.SECRET_KEY",
      process.env.SECRET_KEY,
      req.cookies.usertoken
    );
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};

module.exports = {
  authenticate,
};

module.exports.verifyUser = (req, res, next) => {
  authenticate(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      console.log(req.user.id, req.params.id);
      console.log(req.user.isAdmin);
      res.status(401).json({ verified: false });
    }
  });
};

module.exports.verifyAdmin = (req, res, next) => {
  authenticate(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ verified: false });
    }
  });
};
