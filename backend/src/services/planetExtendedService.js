
const axios = require('axios');
require('dotenv').config();

const getPlanetExtendedService = async (date,year, month,hour,minute,second, latitude, longitude) => {
    try{
        const response = await axios.post(
            "https://json.freeastrologyapi.com/planets/extended",{
            "year": year,
            "month": month,
            "date": date,
            "hours": hour,
            "minutes":minute,
            "seconds":second,
            "latitude": latitude,
            "longitude": longitude,
            "timezone": 5.5,
            "settings": {
        "observation_point": "topocentric", /*  topocentric / geocentric */
        "ayanamsha": "lahiri", /* lahiri / sayana */
        "language": "en"
        }
        },{
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.ASTROAPIKEY
                }   
            }

        );
         return response.data.output;

        
    }catch (error) {
        console.error("Astrology API error:", error.message);
        throw error;
    }


};

module.exports = { getPlanetExtendedService };
