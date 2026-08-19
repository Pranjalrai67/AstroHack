import mongoose, { Schema, Document } from "mongoose";

const astrologyProfileSchema = new Schema < IAstrologyProfile > (
    {
        userId: {
            type: Schema.Types.ObjectId,
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
                type: string
            },
            state?: {
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

export const AstrologyProfile =
    mongoose.model(
        "AstrologyProfile",
        astrologyProfileSchema
    );