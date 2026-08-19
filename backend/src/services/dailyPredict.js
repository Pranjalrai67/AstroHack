const PLANET_WEIGHT = {
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

function calculateHouse(ascendantSign, planetSign) {
  let house = planetSign - ascendantSign + 1;

  if (house <= 0) {
    house += 12;
  }

  return house;
}

function applyHouseInfluence(scores, house, weight) {
  switch (house) {
    case 1:
      scores.health += weight;
      break;

    case 2:
      scores.money += weight;
      break;

    case 3:
      scores.career += weight;
      break;

    case 4:
      scores.overall += weight;
      break;

    case 5:
      scores.love += weight;
      break;

    case 6:
      scores.health += weight;
      scores.career += weight;
      break;

    case 7:
      scores.love += weight;
      break;

    case 8:
      scores.overall += weight;
      break;

    case 9:
      scores.career += weight;
      break;

    case 10:
      scores.career += weight;
      break;

    case 11:
      scores.money += weight;
      break;

    case 12:
      scores.health += weight;
      scores.money += weight;
      break;
  }
}

function normalize(score) {
  return Math.max(0, Math.min(100, score));
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
    ["career", scores.career],
    ["love", scores.love],
    ["money", scores.money],
    ["health", scores.health],
  ];

  areas.sort((a, b) => b[1] - a[1]);

  const best = areas[0][0];
  const worst = areas[areas.length - 1][0];

  return `Today looks strongest for ${best}. Pay a little more attention to ${worst}.`;
}

function generateDailyPrediction(todayData, birthData) {


  const ascendant = birthData.Ascendant;

  const ascendantSign = Number(
    ascendant.current_sign
  );
  const scores = {
    overall: 50,
    career: 50,
    love: 50,
    money: 50,
    health: 50,
  };

  for (const [planet, data] of Object.entries(todayData)) {

    if (planet === "Ascendant") {
      continue;
    }

    if (
      planet === "Uranus" ||
      planet === "Neptune" ||
      planet === "Pluto"
    ) {
      continue;
    }

    const planetSign = Number(data.current_sign);

    const house = calculateHouse(
      ascendantSign,
      planetSign
    );

    let weight = PLANET_WEIGHT[planet] || 0;

    // Reduce influence if retrograde
    const isRetro =
      String(data.isRetro).toLowerCase() === "true";

    if (isRetro) {
      weight = Math.trunc(weight / 2);
    }

    applyHouseInfluence(
      scores,
      house,
      weight
    );
  }

  scores.overall = Math.round(
    (
      scores.career +
      scores.love +
      scores.money +
      scores.health
    ) / 4
  );

  for (const key of Object.keys(scores)) {
    scores[key] = normalize(scores[key]);
  }

  return {
    overall: scores.overall,
    overallRating: getRating(scores.overall),

    career: {
      score: scores.career,
      rating: getRating(scores.career),
    },

    love: {
      score: scores.love,
      rating: getRating(scores.love),
    },

    money: {
      score: scores.money,
      rating: getRating(scores.money),
    },

    health: {
      score: scores.health,
      rating: getRating(scores.health),
    },

    summary: generateSummary(scores),
  };
}

module.exports = {
  generateDailyPrediction,
};