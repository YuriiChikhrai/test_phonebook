const passport = require("passport");
const { Router } = require("express");
const router = Router();

const { validate } = require("../middlewares");

const { authUser } = require("./auth.controller");
const { authUserValidation } = require("./auth.validations");

router.post(
  "/login",
  validate(authUserValidation),
  passport.authenticate("local"),
  authUser
);

module.exports = router;
