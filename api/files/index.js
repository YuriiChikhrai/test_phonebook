const { Router } = require("express");
const { join, extname } = require("path");
const { existsSync, promises } = require("fs");
const { UPLOAD_PATH } = require("../../config/index");
const { validate } = require("../middlewares");
const { getFileValidation } = require("./files.validation");

const multer = require("multer");

const DiskStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const user_path = join(UPLOAD_PATH, req.user._id.toString());
    if (!existsSync(user_path)) {
      await promises.mkdir(user_path, { recursive: true });
    }
    cb(null, user_path);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

const upload = multer({ storage: DiskStorage });

const { uploadFile, getFile } = require("./files.controller");

const router = Router();

router.get("/:id", validate(getFileValidation), getFile);

router.post("/upload", upload.single("avatar"), uploadFile);

module.exports = router;
