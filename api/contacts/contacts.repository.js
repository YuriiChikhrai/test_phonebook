const ContactsModel = require("./contacts.model");

exports.getContacts = (user_id) => {
  return ContactsModel.find({ user: user_id })
    .populate([
      {
        path: "category",
        select: "title",
      },
    ])
    .lean()
    .exec();
};

exports.addContact = async (contact_data, session) => {
  const doc = new ContactsModel(contact_data);
  if (session) {
    doc.$session(session);
  }
  await doc.save();
  return doc;
};

exports.populateDoc = async (doc, populateArr) => {
  if (Array.isArray(populateArr)) {
    await ContactsModel.populate(doc, [
      ...(populateArr.includes("category")
        ? [
            {
              path: "category",
              select: "title",
            },
          ]
        : {}),
    ]);
  }
  return doc;
};
