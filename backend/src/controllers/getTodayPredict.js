const { generateDailyPrediction } = require("../services/dailyPredict");

const {getNavamsaDetails } = require("../controllers/navamasyaChart")
const { getPlanetExtendedDetails } = require("../controllers/planetExtendedServiceController")





const getTodayPredict = async (req, res) => {
    try {
        
        const navamasyaData =  await getNavamsaDetails(req);
        const planetExtendedData = await getPlanetExtendedDetails(req);
        const response =  generateDailyPrediction(navamasyaData,planetExtendedData);
        return response;
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

