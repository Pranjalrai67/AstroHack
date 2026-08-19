const express = require("express");

const {geoLocation} = require("../controllers/geoController");
const {getNavamsaDetails} = require("../controllers/navamasyaChart");
const {getPlanetExtendedDetails} = require("../controllers/planetExtendedServiceController");
const {getTodayPredict} = require("../controllers/getTodayPredict");
const router = express.Router();

router.post("/geolocation", geoLocation);
router.post("/navamsa", getNavamsaDetails);
router.post("/planetExtended", getPlanetExtendedDetails);
router.post("/todayPredict", getTodayPredict);
module.exports = router;