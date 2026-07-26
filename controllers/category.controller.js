import { json } from "express"
import { categoryModel } from "../models/category.model.js"
import joi from "joi"

const categoryValidation = joi.object({
    name: joi.string().required().max(12).min(3).messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 3 characters long.',
        'string.max': 'This field cannot exceed 12 characters.',
    }),
    image: joi.string().uri().messages({
        'string.base': 'This field must be a valid text string.',
        'string.uri': 'The URL provided is invalid or malformed.',
    })
})

export async function createCategory(req, res) {
    let { name, image } = req.body

    let { error } = categoryValidation.validate(req.body, { abortEarly: false })

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
        let result = await categoryModel.insertMany({ name, image })
        res.json({ message: 'added ', result })
    }
}

export async function getAllCategorys(req, res) {
    let result = await categoryModel.find({})
    res.json({ message: result })
}

export async function updateCategory(req, res) {
    let { _id, name, image } = req.body
    let { error } = categoryValidation.validate(req.body, { abortEarly: false })

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
        let result = await categoryModel.findOneAndReplace({ _id }, { name, image }, { new: true })
        res.json({ message: 'success ', result })
    }
}
export async function deleteCategory(req, res) {
    let { _id } = req.body
    let result = await categoryModel.findByIdAndDelete({ _id }, { new: true })
    res.json({ message: 'deleted ' })
}