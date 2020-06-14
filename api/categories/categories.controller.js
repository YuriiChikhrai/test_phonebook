const { getUserCategoresService } = require("./categories.service");
const response = require("../response");

exports.getCategories = async (req, res, next) => {
  try {
    response(res, await getUserCategoresService(req.user._id));
  } catch (e) {
    next(e);
  }
};
