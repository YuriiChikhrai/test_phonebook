const { Router } = require("express");
const router = Router();

const { getCategories } = require("./categories.controller");

router.get("/", getCategories);

// TODO: add categories

module.exports = router;
