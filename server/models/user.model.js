import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    person_name: { type: String },
    phnumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number.']
    },
    gender: { type: String, enum: ['male', 'female']},
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    profileBanner: { type: String, default: '' },
    bio: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country_code: { type: String },
    country: { type: String },
    isAppOwner: {type: Boolean, default: false},
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
