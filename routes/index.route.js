const express = require("express");
const validate = require("../middlewares/validate");
const validation = require("../validations/index.validation");
const controller = require("../controllers/index.controller");

const router = express.Router();

router.get(
  "/cities-by-tag",
  validate(validation.getCitiesByTag),
  controller.getCitiesByTag
);

router.get(
  "/distance",
  validate(validation.getDistance),
  controller.getDistance
);

router.get(
  "/area",
  validate(validation.getCitiesWithInDistance),
  controller.getCitiesWithInDistance
);

router.get(
  "/area-result/2152f96f-50c7-4d76-9e18-f7033bd14428",
  controller.getCitiesWithInDistanceResult
);
module.exports = router;
