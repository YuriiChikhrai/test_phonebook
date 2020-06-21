const { join } = require("path");

module.exports = Object.assign(
  {
    UPLOAD_PATH: join(process.cwd(), "uploads"),
  },
  require(`./${process.env.NODE_ENV}`)
);
