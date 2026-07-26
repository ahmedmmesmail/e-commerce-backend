import { json } from "express"
import { brandModel } from "../models/brand.model.js"
import joi from "joi"

const brandValidation = joi.object({
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

export async function createBrand(req, res) {
    let { name, image } = req.body

    let { error } = brandValidation.validate(req.body, { abortEarly: false })

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
        let result = await brandModel.insertMany({ name, image })
        res.json({ message: 'added ', result })
    }
}

export async function getAllBrands(req, res) {
    let result = await brandModel.find({})
    res.json({ message: result })
}

export async function updateBrand(req, res) {
    let { _id, name, image } = req.body
    let { error } = brandValidation.validate(req.body, { abortEarly: false })

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
        let result = await brandModel.findOneAndReplace({ _id }, { name, image }, { new: true })
        res.json({ message: 'success ', result })
    }
}
export async function deleteBrand(req, res) {
    let { _id } = req.body
    let result = await brandModel.findByIdAndDelete({ _id }, { new: true })
    res.json({ message: 'deleted ' })
}