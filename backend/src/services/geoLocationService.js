const axios = require("axios");

const getGeoDetails = async (location) => {
    try {
        // console.log("Yaha tk chl rha");
        const response = await axios.post(
            "https://json.freeastrologyapi.com/geo-details",
            {
                location: location
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "aQeu4PviY88McXBaLXnw154zSmrv9IZu5QTbdGhE"
                }   
            }
        );

        return response.data[0];
    } catch (error) {
        console.error("Astrology API error:", error.message);
        throw error;
    }
};
module.exports = { getGeoDetails };