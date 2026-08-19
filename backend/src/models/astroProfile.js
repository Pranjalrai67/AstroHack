const mongoose =  require ("mongoose");

const astrologyProfileSchema = new mongoose.Schema (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },

        timeOfBirth: {
            type: String,
            required: true,
        },

        birthPlace: {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String
            },
            state: {
                type: String,
            },
            
            country:{
                type: String,
            },

            latitude: {
                type: Number,
                required: true,
            },

            longitude: {
                type: Number,
                required: true,
            },

            timezone: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const AstrologyProfile =mongoose.model("AstrologyProfile",astrologyProfileSchema);
module.exports = AstrologyProfile 