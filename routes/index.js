const express = require("express");
const validate = require("../middlewares/validate");
const validation = require("../validations/index.validation");
const controller = require("../controllers/index.controller");

const router = express.Router();

router.post(
  "/cities-by-tag",
  validate(validation.getCitiesByTag),
  controller.getCitiesByTag
);

module.exports = router;
