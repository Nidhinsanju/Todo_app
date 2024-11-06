const jwt = require("jsonwebtoken");
require("dotenv").config();

const SecretKey = process.env.SECRET_KEY;

const authToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, SecretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid Token" });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(403).json({ message: "no token found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", err: err.message });
  }
};

module.exports = {
  authToken,
  SecretKey,
};
