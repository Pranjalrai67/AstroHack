const AstrologyProfile = require("../models/AstroProfile");

const createAstrologyProfile = async (profileData) => {
    const {
        userId,
        dateOfBirth,
        timeOfBirth,
        birthPlace,
    } = profileData;

    const existingProfile = await AstrologyProfile.findOne({
        userId,
    });

    if (existingProfile) {
        throw new Error("Astrology profile already exists");
    }

    const profile = await AstrologyProfile.create({
        userId,
        dateOfBirth,
        timeOfBirth,
        birthPlace,
    });

    return profile;
};

module.exports = {
    createAstrologyProfile,
};