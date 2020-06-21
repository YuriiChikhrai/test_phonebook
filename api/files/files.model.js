const { model, Schema } = require("mongoose");

const FilesSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "UsersModel" },
  path: { type: String },
  allowed_users: { type: [Schema.Types.ObjectId], ref: "UsersModel" },
});

module.exports = model("FilesModel", FilesSchema);
