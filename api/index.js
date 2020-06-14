const { Router } = require("express");
const router = Router();
const { isAuthorized } = require("./middlewares");

router.use("/auth", require("./auth/index"));

router.use("/categories", isAuthorized, require("./categories/index"));

router.use("/contacts", isAuthorized, require("./contacts/index"));

router.use("/users", require("./users/index"));

module.exports = router;
