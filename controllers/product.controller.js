import { json } from "express"
import { productModel } from "../models/product.model.js"
import joi from 'joi'

const productValidation = joi.object({
    title: joi.string().required().max(40).min(3).messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 3 characters long.',
        'string.max': 'This field cannot exceed 12 characters.',
    }),
    description: joi.string().min(0).max(400).messages({
        'string.base': 'This field must be a valid text string.',
        'string.min': 'This field must be at least 0 characters long.',
        'string.max': 'This field cannot exceed 40 characters.',
    }),
    images: joi.string().uri().messages({
        'string.base': 'This field must be a valid text string.',
        'string.uri': 'The URL provided is invalid or malformed.',
    }),
    imageCover: joi.string().uri().messages({
        'string.base': 'This field must be a valid text string.',
        'string.uri': 'The URL provided is invalid or malformed.',
    }),
    price: joi.number().positive().precision(2).messages({
        'number.base': 'This field must be a valid number.',
        'number.positive': 'The number must be a positive value greater than zero.',
        'number.precision': 'The number cannot have more than 2 decimal places.',

    }),
    priceAfterDiscount: joi.number().positive().precision(2).messages({
        'number.base': 'This field must be a valid number.',
        'number.positive': 'The number must be a positive value greater than zero.',
        'number.precision': 'The number cannot have more than 2 decimal places.',
    }),
    brandID: joi.string().alphanum().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.alphanum': 'This field must only contain alphanumeric characters (letters and numbers).',

    }),
    categoryID: joi.string().alphanum().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.alphanum': 'This field must only contain alphanumeric characters (letters and numbers).',
    }),
    subCategoryID: joi.string().alphanum().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.alphanum': 'This field must only contain alphanumeric characters (letters and numbers).',
    }),
    ratingAvg: joi.number().positive().precision(1).messages({
        'number.base': 'This field must be a valid number.',
        'number.positive': 'The number must be a positive value greater than zero.',
        'number.precision': 'The number cannot have more than 1 decimal places.',
    }),
    ratingCount: joi.number().positive().integer().messages({
        'number.base': 'This field must be a valid number.',
        'number.positive': 'The number must be a positive value greater than zero.',
        'number.integer': 'The number must be an integer (no decimals allowed).',
    }),
    stock: joi.number().positive().integer().messages({
        'number.base': 'This field must be a valid number.',
        'number.positive': 'The number must be a positive value greater than zero.',
        'number.integer': 'The number must be an integer (no decimals allowed).',
    }),
    soldCount: joi.number().positive().integer().messages({
        'number.base': 'This field must be a valid number.',
        'number.positive': 'The number must be a positive value greater than zero.',
        'number.integer': 'The number must be an integer (no decimals allowed).',
    }),
})

export async function createProduct(req, res) {
    let {
        title, description, imageCover, images, price, priceAfterDiscount,
        brandID, categoryID, subCategoryID, ratingAvg, ratingCount, stock, soldCount
    } = req.body

    let isExist = await productModel.findOne({ title })
    let { error } = productValidation.validate(req.body, { abortEarly: false, convert: false })

    if (error) {
        const allErrors = {}
        error.details.forEach(detail => {
            allErrors[detail.path[0]] = detail.message
        })

        return res.json({
            message: 'validation error',
            errors: allErrors
        })
    } else {
        if (isExist) {
            res.json({ message: 'product is already exist' })
        } else {
            let result = await productModel.insertMany({
                title, description, imageCover, images, price, priceAfterDiscount,
                brandID, categoryID, subCategoryID, ratingAvg, ratingCount, stock, soldCount
            })
            res.json({ message: 'added ', result })
        }
    }
}

export async function getAllProducts(req, res) {
    let result = await productModel.find({})
    res.json({ message: result })
}

export async function updateProduct(req, res) {
    let { _id, title, description, imageCover, images, price, priceAfterDiscount,
        brandID, categoryID, subCategoryID, ratingAvg, ratingCount, stock, soldCount } = req.body

    let { error } = productValidation.validate(req.body, { abortEarly: false, convert: false })

    if (error) {
        const allErrors = {}
        error.details.forEach(detail => {
            allErrors[detail.path[0]] = detail.message
        })

        return res.json({
            message: 'validation error',
            errors: allErrors
        })
    } else {
        let result = await productModel.findOneAndReplace(
            { _id }, {
            title, description, imageCover, images, price, priceAfterDiscount, brandID,
            categoryID, subCategoryID, ratingAvg, ratingCount, stock, soldCount
        }, { new: true }
        )
        res.json({ message: 'success ', result })
    }
}

export async function deleteProduct(req, res) {
    let { _id, } = req.body
    let result = await productModel.findByIdAndDelete({ _id }, { new: true })
    res.json({ message: 'deleted ' })
}