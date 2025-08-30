import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true }, // Who ordered
    items: [
        {
            food: { type: Types.ObjectId, ref: 'Food', required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true } // Final price per item
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'preparing', 'onway', 'delivered', 'cancelled'], default: 'pending' },
    address: { type: String, required: true }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
