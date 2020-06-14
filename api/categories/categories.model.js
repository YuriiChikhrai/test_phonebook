const { Schema, model } = require("mongoose");

const CategoriesSchema = new Schema(
  {
    title: { type: String, trim: true },
    user: { type: Schema.Types.ObjectId, ref: "UsersModel" },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

module.exports = model("CategoriesModel", CategoriesSchema);
