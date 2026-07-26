import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'error'],
        maxLength: [30, 'error'],
    },
    description: {
        type: String,
        required: true,
        minLength: [3, 'error'],
        maxLength: [300, 'error'],
    },
    imageCover: {
        type: String,
    },
    images: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    brandID: {
        type: String,
        ref: 'brand'
    },
    categoryID: {
        type: String,
        ref: 'category'
    },
    subCategoryID: {
        type: String,
        ref: 'subcategory'
    },
    ratingAvg: {
        type: Number,
        min: 0,
        ref: 'review'
    },
    ratingCount : {
        type: Number,
        min: 0,
        ref: 'review'
    },
    stock: {
        type: Number,
        min: 0,
        required: true
    },
    soldCount : {
        type: Number,
        min: 10
    },
    slug: {
        type: String,
    }
})

export const productModel = mongoose.model('product', productSchema)