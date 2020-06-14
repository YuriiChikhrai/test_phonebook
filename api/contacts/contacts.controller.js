const response = require("../response");
const { getContactsService, addContactService } = require("./contacts.service");

exports.getContacts = async (req, res, next) => {
  try {
    response(res, await getContactsService(req.user._id));
  } catch (e) {
    next(e);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    response(res, await addContactService(req.body, req.user._id));
  } catch (e) {
    next(e);
  }
};
