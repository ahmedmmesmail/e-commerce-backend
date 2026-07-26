import { json } from "express"
import { subcategoryModel } from "../models/subcategory.model.js"
import joi from "joi"

const subcategoryValidation = joi.object({
    name: joi.string().required().max(12).min(3).messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 3 characters long.',
        'string.max': 'This field cannot exceed 12 characters.',
    }),
    image: joi.string().uri().messages({
        'string.base': 'This field must be a valid text string.',
        'string.uri': 'The URL provided is invalid or malformed.',
    }),
    categoryId: joi.string().alphanum().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.alphanum': 'This field must only contain alphanumeric characters (letters and numbers).',

    })
})

export async function createSubCategory(req, res) {
    let { name, image, categoryId } = req.body

    let { error } = subcategoryValidation.validate(req.body, { abortEarly: false })
    
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
        let result = await subcategoryModel.insertMany({ name, image, categoryId })
        res.json({ message: 'added ', result })
    }
}

export async function getAllSubCategorys(req, res) {
    let result = await subcategoryModel.find({})
    res.json({ message: result })
}

export async function updateSubCategory(req, res) {

    let { _id, name, image, categoryId } = req.body
    let { error } = subcategoryValidation.validate(req.body, { abortEarly: false })

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
        let result = await subcategoryModel.findOneAndReplace({ _id }, { name, categoryId, image }, { new: true })
        res.json({ message: 'success ', result })
    }
}
export async function deleteSubCategory(req, res) {
    let { _id, } = req.body
    let result = await subcategoryModel.findByIdAndDelete({ _id }, { new: true })
    res.json({ message: 'deleted ' })
}