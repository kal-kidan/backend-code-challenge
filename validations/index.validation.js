const Joi = require("joi");
const getCitiesByTag = {
  query: Joi.object().keys({
    tag: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
};

const getDistance = {
  query: Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.string().required(),
  }),
};

const getCitiesWithInDistance = {
  query: Joi.object().keys({
    from: Joi.string().required(),
    distance: Joi.number().required(),
  }),
};

module.exports = {
  getCitiesByTag,
  getDistance,
  getCitiesWithInDistance,
};
