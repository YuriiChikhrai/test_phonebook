const joi = require("@hapi/joi");
const { Segments } = require("celebrate");
const { baseString, dateLessNow, objectId } = require("../baseValidators");

const messangerValidation = {
  telegram: baseString,
  viber: baseString,
  instagram: baseString,
  whatsup: baseString,
};

exports.addContactValidation = {
  [Segments.BODY]: {
    first_name: baseString,
    middle_name: baseString,
    last_name: baseString,
    birthday: dateLessNow,
    emails: joi.array().items(baseString),
    phones: joi.array().items(
      joi.object().keys({
        code: baseString,
        value: baseString,
      })
    ),
    category: [objectId, baseString],
    position: baseString,
    additinal: baseString,
    favourite: joi.boolean().default(false),
    // photo,
    messanger: joi.object().keys(messangerValidation),
  },
};
