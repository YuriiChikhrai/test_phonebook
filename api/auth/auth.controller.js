const UsersModel = require("../users/users.model");
const { compareSync } = require("bcryptjs");

exports.authUser = async (req, res, next) => {
  try {
    res.json({ message: "hello from authUser controller" });
  } catch (e) {
    next(e);
  }
};
