const { relative, join } = require("path");
const FilesModel = require("./files.model");
const { UPLOAD_PATH } = require("../../config/index");

const returnRelativePath = (file_path) => {
  return relative(UPLOAD_PATH, file_path);
};
exports.returnRelativePath = returnRelativePath;

exports.addNewFile = (file_path, creator, allowed_users) => {
  return FilesModel.create({
    path: returnRelativePath(file_path),
    creator,
    allowed_users,
  });
};

exports.getFileService = async (file_id, requestor) => {
  const doc = await FilesModel.findOne({
    _id: file_id,
    $or: [{ creator: requestor }, { allowed_users: requestor }],
  })
    .select("path")
    .lean()
    .exec();
  if (!doc) {
    throw { status: 403, message: "not allow get file" };
  }
  return join(UPLOAD_PATH, doc.path);
};
