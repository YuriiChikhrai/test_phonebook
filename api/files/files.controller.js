const { addNewFile, getFileService } = require("./files.service");
const response = require("../response");

exports.uploadFile = async (req, res, next) => {
  try {
    const file = await addNewFile(req.file.path, req.user._id, []);
    response(res, { _id: file._id, message: "upload success" });
  } catch (e) {
    next(e);
  }
};

exports.getFile = async (req, res, next) => {
  try {
    const file_path = await getFileService(req.params.id, req.user._id);
    res.sendFile(file_path);
  } catch (e) {
    next(e);
  }
};
