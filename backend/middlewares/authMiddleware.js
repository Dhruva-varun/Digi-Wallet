const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body = req.body || {};
    req.body.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).send({
      message: error.message || "Authentication failed",
      success: false,
    });
  }
};
