const { Router } = require("express");
const router = Router();

const { validate } = require("../middlewares");
const { getContacts, addContact } = require("./contacts.controller");
const { addContactValidation } = require("./contacts.validation");

router.get("/", getContacts);

router.post("/", validate(addContactValidation), addContact);

module.exports = router;
