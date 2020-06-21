const passport = require("passport");
const { Router } = require("express");
const router = Router();

const { validate } = require("../middlewares");

const { authUser } = require("./auth.controller");
const { authUserValidation } = require("./auth.validations");

/**
 * @api {post} /api/auth/login Login user
 * @apiName authUser
 * @apiGroup Auth
 *
 * @apiParam {String} email User email
 * @apiParam {String{6..100}} password User password
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "test1@test.com"
 *       "password": "123456"
 *     }
 *
 * @apiSuccess {String} message Success message.
 */
router.post(
  "/login",
  validate(authUserValidation),
  passport.authenticate("local"),
  authUser
);

module.exports = router;
