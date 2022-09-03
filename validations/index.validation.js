const Joi = require("joi");
const getCitiesByTag = {
  query: Joi.object().keys({
    tag: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
};

module.exports = {
  getCitiesByTag,
};
