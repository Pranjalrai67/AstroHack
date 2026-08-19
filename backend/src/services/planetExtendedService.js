
const axios = require('axios');

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
                    "x-api-key": "aQeu4PviY88McXBaLXnw154zSmrv9IZu5QTbdGhE"
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
