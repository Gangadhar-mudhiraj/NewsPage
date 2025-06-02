import mongoose, { Schema } from "mongoose";

const preferenceSchema = new Schema({
    country: {
        type: String, // e.g., 'us', 'in', 'uk'
        required: true
    },
    categories: {
        type: [String], // e.g., ['sports', 'entertainment']
        default: []
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        type: [preferenceSchema],
        default: []
    }
});

const User = mongoose.model("User", userSchema);
export default User;
