import mongoose, { Schema, Document } from "mongoose";

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);