const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");
const { calculateDistance } = require("../utils/distance");
const ApiError = require("../utils/ApiError");
const address = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "addresses.json"), "utf8")
);

const getCitiesByTag = async (tag, isActive) => {
  const cities = address.filter((obj) => {
    return obj.isActive === isActive && obj.tags.indexOf(tag) > -1;
  });
  return { cities };
};

const getDistance = async (from, to) => {
  const fromAddress = address.filter((obj) => {
    return obj.guid === from;
  });
  const toAddress = address.filter((obj) => {
    return obj.guid === to;
  });
  if (fromAddress.length === 0 || toAddress.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Address not found.");
  }
  console.log(toAddress[0]);
  const distance = calculateDistance(
    fromAddress[0].latitude,
    fromAddress[0].longitude,
    toAddress[0].latitude,
    toAddress[0].longitude
  );
  return {
    distance,
    unit: "km",
    from: { guid: fromAddress[0].guid },
    to: { guid: toAddress[0].guid },
  };
};

module.exports = {
  getCitiesByTag,
  getDistance,
};
