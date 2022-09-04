const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const path = require("path");
const { calculateDistance } = require("../utils/distance");
function getCitiesWithInDistance(from, distance) {
  const address = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "addresses.json"), "utf8")
  );
  const fromAddress = address.filter((obj) => {
    return obj.guid == from;
  });
  const cities = address.filter((obj) => {
    let calcDistance = calculateDistance(
      fromAddress[0].latitude,
      fromAddress[0].longitude,
      obj.latitude,
      obj.longitude
    );
    return obj.guid != from && calcDistance <= distance;
  });
  fs.writeFileSync(path.join(__dirname, "..", "queue.txt"), "1");
  return cities;
}
parentPort.postMessage(
  getCitiesWithInDistance(workerData.from, workerData.distance)
);
