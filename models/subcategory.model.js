import mongoose from "mongoose";

const subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'error'],
        unique: true
    },
    categoryId: {
        type: String,
        ref: 'category'
    },
    image: String,
    slug: {
        type: String,
    }
})

export const subcategoryModel = mongoose.model('subcategory', subcategorySchema)