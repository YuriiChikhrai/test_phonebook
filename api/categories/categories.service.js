const {
  getUserCategories,
  getCategoryById,
  createOrGetCategory,
} = require("./categories.repository");
const { Types } = require("mongoose");

exports.getUserCategoresService = (user_id) => {
  return getUserCategories(user_id);
};

exports.getCategoryIdService = async (category, creator, session) => {
  if (!category) {
    return;
  }
  if (Types.ObjectId.isValid(category)) {
    const category_doc = await getCategoryById(category);
    if (!category_doc) {
      throw { message: "Category not exists" };
    }
    return category;
  } else {
    const doc = await createOrGetCategory(category, creator, session);
    return doc._id;
  }
};
