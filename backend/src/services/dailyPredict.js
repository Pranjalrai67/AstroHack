// const PLANETS = {
//   Sun: 2,
//   Moon: 2,
//   Mars: -1,
//   Mercury: 2,
//   Jupiter: 3,
//   Venus: 3,
//   Saturn: -2,
//   Rahu: -2,
//   Ketu: -1,
// };

// // What each house represents
// const HOUSE_AREAS = {
//   1: ["health", "overall"],
//   2: ["money", "overall"],
//   3: ["career", "overall"],
//   4: ["overall"],
//   5: ["love", "career"],
//   6: ["health", "career"],
//   7: ["love"],
//   8: ["health", "money", "overall"],
//   9: ["career", "overall"],
//   10: ["career", "money"],
//   11: ["money", "career"],
//   12: ["health", "money", "overall"],
// };

// function calculateTransitHouse(birthAscendant, planetSign) {
//   let house = planetSign - birthAscendant + 1;

//   if (house <= 0) {
//     house += 12;
//   }

//   return house;
// }

// function generateDailyPrediction(navamsaData, birthData) {

//   const birthAscendant =
//     Number(birthData.Ascendant.current_sign);

//   const scores = {
//     career: 50,
//     love: 50,
//     money: 50,
//     health: 50,
//     overall: 50,
//   };

//   // ---------------------------------------
//   // 3. Convert:
//   //
//   // {
//   //   "0": { name: "Sun" }
//   // }
//   //
//   // into:
//   //
//   // {
//   //   Sun: {...}
//   // }
//   // ---------------------------------------

//   const planets = {};

//   for (const planet of Object.values(navamsaData)) {
//     planets[planet.name] = planet;
//   }

//   for (const [planetName, planet] of Object.entries(planets)) {

//     if (!PLANETS[planetName]) {
//       continue;
//     }

//     const currentSign =
//       Number(planet.current_sign);

//     const transitHouse = calculateTransitHouse(
//       birthAscendant,
//       currentSign
//     );

//     let influence = PLANETS[planetName];

//     if (
//       String(planet.isRetro).toLowerCase() === "true"
//     ) {
//       influence *= 0.5;
//     }

//     const areas = HOUSE_AREAS[transitHouse] || [];

//     for (const area of areas) {
//       scores[area] += influence;
//     }

//     console.log(
//       `${planetName}: sign=${currentSign}, house=${transitHouse}, influence=${influence}`
//     );
//   }

//   scores.overall = Math.round(
//     (
//       scores.career +
//       scores.love +
//       scores.money +
//       scores.health
//     ) / 4
//   );

//   for (const key of Object.keys(scores)) {
//     scores[key] = Math.max(
//       0,
//       Math.min(100, Math.round(scores[key]))
//     );
//   }

//   return {
//     overall: {
//       score: scores.overall,
//       rating: getRating(scores.overall),
//     },

//     career: {
//       score: scores.career,
//       rating: getRating(scores.career),
//     },

//     love: {
//       score: scores.love,
//       rating: getRating(scores.love),
//     },

//     money: {
//       score: scores.money,
//       rating: getRating(scores.money),
//     },

//     health: {
//       score: scores.health,
//       rating: getRating(scores.health),
//     },

//     summary: generateSummary(scores),
//   };
// }

// function getRating(score) {
//   if (score >= 85) return "Excellent";
//   if (score >= 70) return "Good";
//   if (score >= 55) return "Average";
//   if (score >= 40) return "Challenging";

//   return "Difficult";
// }

// function generateSummary(scores) {

//   const areas = [
//     { name: "career", score: scores.career },
//     { name: "love", score: scores.love },
//     { name: "money", score: scores.money },
//     { name: "health", score: scores.health },
//   ];

//   areas.sort((a, b) => b.score - a.score);

//   const best = areas[0];
//   const weakest = areas[areas.length - 1];

//   return `Today looks strongest for ${best.name}. Pay extra attention to ${weakest.name}.`;
// }

// module.exports = {
//   generateDailyPrediction,
// };



const PLANETS = {
  Sun: 2,
  Moon: 2,
  Mars: -1,
  Mercury: 2,
  Jupiter: 3,
  Venus: 3,
  Saturn: -2,
  Rahu: -2,
  Ketu: -1,
};

const HOUSE_AREAS = {
  1: ["health"],
  2: ["money"],
  3: ["career"],
  4: [],
  5: ["love", "career"],
  6: ["health", "career"],
  7: ["love"],
  8: ["health", "money"],
  9: ["career"],
  10: ["career", "money"],
  11: ["money", "career"],
  12: ["health", "money"],
};

function calculateTransitHouse(birthAscendant, planetSign) {
  let house = planetSign - birthAscendant + 1;

  if (house <= 0) {
    house += 12;
  }

  return house;
}
function generateDailyPrediction(navamsaData, birthData) {

  console.log("Prediction function started");

  // Handle { output: {...} } or directly {...}
  const today = navamsaData.output || navamsaData;
  const birth = birthData.output || birthData;

  console.log("Today:", today);
  console.log("Birth:", birth);

  const birthAscendant =
    Number(birth.Ascendant.current_sign);

  console.log("Birth Ascendant:", birthAscendant);

  const scores = {
    career: 50,
    love: 50,
    money: 50,
    health: 50,
  };

  const planets = {};

  for (const planet of Object.values(today)) {
    if (!planet.name) continue;

    planets[planet.name] = planet;
  }

  console.log("Normalized planets:", planets);

  for (const [planetName, planet] of Object.entries(planets)) {

    if (!(planetName in PLANETS)) {
      continue;
    }

    const currentSign = Number(planet.current_sign);

    const transitHouse = calculateTransitHouse(
      birthAscendant,
      currentSign
    );

    let influence = PLANETS[planetName];

    if (
      String(planet.isRetro).toLowerCase() === "true"
    ) {
      influence *= 0.5;
    }

    const areas = HOUSE_AREAS[transitHouse] || [];

    for (const area of areas) {
      scores[area] += influence;
    }

    console.log(
      `${planetName}: house=${transitHouse}, influence=${influence}`
    );
  }

  console.log("Scores before return:", scores);

  const overall = Math.round(
    (
      scores.career +
      scores.love +
      scores.money +
      scores.health
    ) / 4
  );

  const result = {
    overall: {
      score: overall,
      rating: getRating(overall),
    },

    career: {
      score: Math.round(scores.career),
      rating: getRating(scores.career),
    },

    love: {
      score: Math.round(scores.love),
      rating: getRating(scores.love),
    },

    money: {
      score: Math.round(scores.money),
      rating: getRating(scores.money),
    },

    health: {
      score: Math.round(scores.health),
      rating: getRating(scores.health),
    },

    summary: generateSummary(scores),
  };

  console.log("FINAL RESULT:", result);

  return result;
}

function getRating(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Average";
  if (score >= 40) return "Challenging";

  return "Difficult";
}

function generateSummary(scores) {

  const areas = [
    { name: "career", score: scores.career },
    { name: "love", score: scores.love },
    { name: "money", score: scores.money },
    { name: "health", score: scores.health },
  ];

  areas.sort((a, b) => b.score - a.score);

  const best = areas[0];
  const weakest = areas[areas.length - 1];

  return `Today looks strongest for ${best.name}. Pay extra attention to ${weakest.name}.`;
}

module.exports = {
  generateDailyPrediction,
};