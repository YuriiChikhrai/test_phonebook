const { Segments } = require("celebrate");
const { objectId } = require("../baseValidators");

exports.getFileValidation = {
  [Segments.PARAMS]: {
    id: objectId,
  },
};
