import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
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

export const brandModel = mongoose.model('brand', brandSchema)