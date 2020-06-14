const CategoryModel = require("./categories.model");
const { Types } = require("mongoose");

exports.getUserCategories = (user_id) => {
  return CategoryModel.find({
    $or: [{ user: { $exists: false } }, { user: Types.ObjectId(user_id) }],
  })
    .lean()
    .exec();
};

exports.getCategoryById = (_id) => {
  return CategoryModel.findOne({
    _id,
  })
    .select("_id")
    .lean()
    .exec();
};

exports.createOrGetCategory = async (title, creator, session) => {
  const category_exists = await CategoryModel.findOne({ title, user: creator })
    .select("_id")
    .lean()
    .exec();
  if (category_exists) {
    return category_exists;
  }

  const doc = new CategoryModel({ title, user: creator });
  if (session) {
    doc.$session(session);
  }
  return doc.save();
};
