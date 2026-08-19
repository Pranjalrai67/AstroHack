const { getPlanetExtendedService } = require("../services/navamsaService");

const getPlanetExtendedDetails = async (req, res) => {
    try {
        const { date,year, month,hour,minute,second, latitude, longitude } = req.body;

        // if (!date || !year ||  !month ||  !hour ||  !minute ||  !second ||  !latitude ||  !longitude) {
        //     return res.status(400).json({
        //         message: "Complete Details are required: date, year, month, hour, minute, second, latitude, and longitude"
        //     });
        // }
        

        const data = await getPlanetExtendedService(date,year, month,hour,minute,second, latitude, longitude);

        res.status(200).json(data);
    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            message: "Failed to fetch nakshatra details"
        });
    }
};

module.exports = {
    getPlanetExtendedDetails
};