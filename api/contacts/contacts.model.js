const { Schema, model } = require("mongoose");
const UserModel = model("UsersModel");

const MessangerSchema = new Schema({
  _id: false,
  telegram: { type: String, trim: true },
  viber: { type: String, trim: true },
  instagram: { type: String, trim: true },
  whatsup: { type: String, trim: true },
});

function setDefaultValue() {
  return `Test position: ${this.position}`;
}

const ContactsSchema = new Schema(
  {
    first_name: { type: String, trim: true },
    middle_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    birthday: { type: Date },
    emails: {
      type: [{ type: String, trim: true }],
    },
    phones: {
      type: [
        {
          code: { type: String, trim: true },
          value: { type: String, trim: true },
        },
      ],
    }, // -> [ { code: '+380', value: '1111111' } ]
    category: { type: Schema.Types.ObjectId, ref: "CategoriesModel" },
    position: { type: String, trim: true },
    additinal: { type: String, trim: true },
    favourite: { type: Boolean, default: false },
    // photo,
    messanger: { type: MessangerSchema },
    user: { type: Schema.Types.ObjectId, ref: "UsersModel", required: true }, // кому принадлежит текущий контакт
    testdefault: { type: Schema.Types.Mixed, default: setDefaultValue },
    testUserRole: { type: String },
  },
  {
    collection: "contacts",
    timestamps: true,
  }
);

ContactsSchema.post("validate", async function (doc, next) {
  this.phones.forEach((phone) => {
    phone.code = phone.code.startsWith("+") ? phone.code : `+${phone.code}`;
  });

  // UserModel
  const { role } = await UserModel.findOne({ _id: doc.user })
    .select("role")
    .lean()
    .exec();
  this.testUserRole = role;

  next();
});

module.exports = model("ContactModel", ContactsSchema);
