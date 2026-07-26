import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:[3, 'error'],
        unique: true
    },
    image: String,
    slug: {
        type: String,
    }
})

export const categoryModel = mongoose.model('category', categorySchema)