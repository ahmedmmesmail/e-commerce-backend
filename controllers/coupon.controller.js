import { json } from "express"
import { couponModel } from "../models/coupon.model.js"
import joi from "joi"

const couponValidation = joi.object({
    code: joi.string().required().max(12).alphanum().min(3).messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 3 characters long.',
        'string.max': 'This field cannot exceed 12 characters.',
        'string.alphanum': 'This field must only contain alphanumeric characters (letters and numbers).',

    }),
    discount: joi.number().positive().integer().messages({
        'number.base': 'This field must be a valid number.',
        'number.integer': 'The number must be an integer (no decimals allowed).',
        'number.positive': 'The number must be a positive value greater than zero.',
    }),
    expire: joi.date().iso().greater('now').messages({
        'date.base': 'The date provided is invalid or uses an unsupported format.',
        'date.format': 'The date does not match the required standard format.',
        'date.greater': 'The date must be in the future (after now).',
    })
})

export async function createCoupon(req, res) {
    let { code, discount, expire } = req.body

    let { error } = couponValidation.validate(req.body, { abortEarly: false })

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
        let result = await couponModel.insertMany({ code, discount, expire })
        res.json({ message: 'added ', result })
    }
}

export async function getAllCoupons(req, res) {
    let result = await couponModel.find({})
    res.json({ message: result })
}

export async function updateCoupon(req, res) {
    let { _id, code, discount, expire } = req.body
    let { error } = couponValidation.validate(req.body, { abortEarly: false })

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
        let result = await couponModel.findOneAndReplace({ _id }, { code, discount, expire }, { new: true })
        res.json({ message: 'success ', result })
    }
}
export async function deleteCoupon(req, res) {
    let { _id } = req.body
    let result = await couponModel.findByIdAndDelete({ _id }, { new: true })
    res.json({ message: 'deleted ' })
}