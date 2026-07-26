import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength:[3, 'error'],
    },
    rating: {
        type: Number
    },
    userID: {
        type: String,
        ref: 'user'
    },
    productID: {
        type: String,
        ref: 'product'
    },
})

export const reviewModel = mongoose.model('review', reviewSchema)