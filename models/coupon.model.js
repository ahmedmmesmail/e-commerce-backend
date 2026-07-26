import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        minLength: [3, 'error'],
        unique: true
    },
    discount: {
        type: Number
    },
    expire: {
        type: String,
    }
})

export const couponModel = mongoose.model('coupon', couponSchema)