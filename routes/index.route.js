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

module.exports = router;
