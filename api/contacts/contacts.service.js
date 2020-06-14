const {
  getContacts,
  addContact,
  populateDoc,
} = require("./contacts.repository");
const { getCategoryIdService } = require("../categories/categories.service");
const { startSession } = require("mongoose");

exports.getContactsService = (user_id) => {
  return getContacts(user_id);
};

exports.addContactService = async (contact_data, creator) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const category = await getCategoryIdService(
      contact_data.category,
      creator,
      session
    );

    const result = await addContact(
      { ...contact_data, category, user: creator },
      session
    );

    await session.commitTransaction();

    await populateDoc(result, ["category"]);

    return result;
  } catch (e) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw e;
  } finally {
    session.endSession();
  }
};
