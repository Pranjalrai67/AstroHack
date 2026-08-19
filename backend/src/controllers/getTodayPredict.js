const { generateDailyPrediction } = require("../services/dailyPredict");

const {getNavamsaDetails } = require("../controllers/navamasyaChart")
const { getPlanetExtendedDetails } = require("../controllers/planetExtendedServiceController")

const getTodayPredict = async (req, res) => {
    try {
        
        console.log(req.body);
        const navamasyaData =  await getNavamsaDetails(req);
        const planetExtendedData = await getPlanetExtendedDetails(req);
        // console.log(planetExtendedData);

        const response = await generateDailyPrediction(navamasyaData,planetExtendedData)
        console.log(response.data);
        res.status(200).json(response);

    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            message: "Failed to fetch Todays details"
        });
    }
};

module.exports = {
    getTodayPredict
};

