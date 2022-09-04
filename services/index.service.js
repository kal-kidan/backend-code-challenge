const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status");
const { Worker } = require("worker_threads");
const { calculateDistance } = require("../utils/distance");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const addressFilePath = path.join(__dirname, "..", "addresses.json");
const address = JSON.parse(fs.readFileSync(addressFilePath), "utf8");

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
let cities;
const getCitiesWithInDistance = async function (from, distance) {
  new Worker(path.join(__dirname, "..", "workers/distance.worker.js"), {
    workerData: { from, distance },
  }).on("message", (data) => {
    cities = data;
  });

  return {
    resultsUrl: `${config.appUrl}/area-result/2152f96f-50c7-4d76-9e18-f7033bd14428`,
  };
};

const getCitiesWithInDistanceResult = async (req, res) => {
  try {
    const isDone =
      fs.readFileSync(path.join(__dirname, "..", "queue.txt"), "utf8") == "1";
    isDone
      ? res.status(httpStatus.OK).send({ cities })
      : res.status(httpStatus.ACCEPTED).send();
    fs.writeFileSync(path.join(__dirname, "..", "queue.txt"), "");
  } catch (error) {
    // if data is stil being written to the file or haven't created yet
    res.status(httpStatus.ACCEPTED).send();
  }
};

const getAllCities = () => {
  const readStream = fs.createReadStream(addressFilePath);
  return readStream;
};

module.exports = {
  getCitiesByTag,
  getDistance,
  getCitiesWithInDistance,
  getCitiesWithInDistanceResult,
  getAllCities,
};
