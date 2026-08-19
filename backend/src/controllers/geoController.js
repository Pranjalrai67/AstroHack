const { getGeoDetails } = require("../services/geoLocationService");

const geoLocation = async (req, res) => {
    try {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({
                message: "Location is required"
            });
        }

        const data = await getGeoDetails(location);

        res.status(200).json(data);
    } catch (error) {
        console.error(error.response?.data || error.message);

        res.status(500).json({
            message: "Failed to fetch geo details"
        });
    }
};

module.exports = {
    geoLocation
};