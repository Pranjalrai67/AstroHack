const { createUser } = require("../services/userService");
const {createAstrologyProfile,} = require("../services/astroProfileService");

const createUserWithAstrologyProfile = async (req, res) => {
    try {
        const {
            name,
            email,
            passwordHash,
            dateOfBirth,
            timeOfBirth,
            birthPlace,
        } = req.body;

        // Create user
        const user = await createUser({
            name,
            email,
            passwordHash,
        });

        // Create astrology profile
        const profile = await createAstrologyProfile({
            userId: user._id,
            dateOfBirth,
            timeOfBirth,
            birthPlace,
        });

        res.status(201).json({
            message: "User created successfully",
            user,
            profile,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createUserWithAstrologyProfile,
};