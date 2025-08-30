import mongoose, { Types } from "mongoose";

const foodSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true, trim: true },
    foodname: { type: String, required: true, trim: true },
    cuisine: { type: [String], default: [] },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    description: { type: String},
    image_link: { type: String, required: true },
    status: { type: String, enum: ['live', 'unlive'], default: 'live' },
}, { timestamps: true });

foodSchema.index({ sku: 1, foodname: 1 });

export const Food = mongoose.model('Food', foodSchema);
