
const axios = require('axios');

const getNavamsaService = async (date,year, month,hour,minute,second, latitude, longitude) => {
    try{
        console.log("Requesting Navamsa Service with parameters:", {
            date, year, month, hour, minute, second, latitude, longitude
        });
        const response = await axios.post(
            "https://json.freeastrologyapi.com/navamsa-chart-info",{
            "year": year,
            "month": month,
            "date": date,
            "hours": hour,
            "minutes":minute,
            "seconds":second,
            "latitude": latitude,
            "longitude": longitude,
            "timezone": 5.5,"settings": {
            "observation_point": "topocentric",
            "ayanamsha": "lahiri"
            }
        },{
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "aQeu4PviY88McXBaLXnw154zSmrv9IZu5QTbdGhE"
                }   
            }

        );
        // console.log("Received response from Navamsa Service:", response);
        console.log("Received response from Navamsa Service:", response.data.output);
        return response.data.output;

        
    }catch (error) {
        console.error("Astrology API error:", error.message);
        throw error;
    }


};

module.exports = { getNavamsaService };

// var request = require('request');
// var options = {
//   'method': 'POST',
//   'url': 'https://json.freeastrologyapi.com/d27-chart-svg-code',
//   'headers': {
//     'Content-Type': 'application/json',
//     'x-api-key': 'YOUR_API_KEY_HERE'
//   },
//   body: JSON.stringify({
//     "year": 2022,
//     "month": 8,
//     "date": 11,
//     "hours": 6,
//     "minutes": 0,
//     "seconds": 0,
//     "latitude": 17.38333,
//     "longitude": 78.4666,
//     "timezone": 5.5,
//     "config": {
//       "observation_point": "topocentric",
//       "ayanamsha": "lahiri"
//     }
//   })

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });
