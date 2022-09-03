const httpStatus = require("http-status");
const fs = require("fs");
const path = require("path");

const address = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "addresses.json"), "utf8")
);

const getCitiesByTag = async (tag, isActive) => {
  const cities = address.filter((obj) => {
    return obj.isActive == isActive && obj.tags.indexOf(tag) > -1;
  });
  return cities;
};

module.exports = {
  getCitiesByTag,
};
