const { Admin } = require("../db/index");
const adminMiddleware = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({
    username: username,
    password: password,
  }).then((value) => {
    if (value) {
      next();
    } else
      res.status(403).json({
        message: "admin does not exist",
      });
  });
};

module.exports = adminMiddleware;
