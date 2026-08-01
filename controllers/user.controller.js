import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import joi from 'joi'
import { userModel } from '../models/user.model.js'

const logInSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.email': 'The email address provided is invalid.',

    }),
    password: joi.string().min(8).required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 8 characters long.',
    }),
})

const signUpShcema = joi.object({
    name: joi.string().min(3).max(16).required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 3 characters long.',
        'string.max': 'This field cannot exceed 16 characters.',
    }),
    email: joi.string().email().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.email': 'The email address provided is invalid.',

    }),
    password: joi.string().min(8).max(20).required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.min': 'This field must be at least 8 characters long.',
        'string.max': 'This field cannot exceed 20 characters.',
    }),
    profilePic: joi.string().uri().required().messages({
        'string.base': 'This field must be a valid text string.',
        'string.empty': 'This field cannot be empty.',
        'string.uri': 'The URL provided is invalid or malformed.',
    }),
})

export async function signUp(req, res) {
    let { name, email, password, profilePic } = req.body

    let user = await userModel.findOne({ email })
    // 1. ضفنا خيار abortEarly: false عشان يكمل فحص وميقفش عند أول غلطة
    let { error } = signUpShcema.validate(req.body, { abortEarly: false })

    if (error) {
        // 2. بنجمع كل الأخطاء في كائن واحد نضيف (اسم الحقل: رسالة الخطأ بتاعته)
        const allErrors = {}
        error.details.forEach(detail => {
            allErrors[detail.path[0]] = detail.message
        })

        // 3. بنرجع كائن الأخطاء كله للـ Client
        return res.json({
            message: "validation error",
            errors: allErrors
        })
    }

    // if (error) {
    //     res.json({ message: "validation error", error })
    // } 
    else {
        if (user) {
            res.json({ message: 'user is already exist' })
        } else {
            bcrypt.hash(password, 10, async function (err, hash) {
                await userModel.insertMany({ name, email, password: hash, profilePic })
                res.json({ message: 'signed up successfully' })
            })
        }
    }
}

export async function logIn(req, res) {

    let { email, password } = req.body

    const user = await userModel.findOne({ email })
    var token = jwt.sign({ name: user.name, userId: user._id, role: user.role }, process.env.JWT_KEY)

    let { error } = logInSchema.validate(req.body, { abortEarly: false })

    if (error) {
        const allErrors = {}
        error.details.forEach(detail => {
            allErrors[detail.path[0]] = detail.message
        })

        return res.json({
            message: 'validation erroe',
            errors: allErrors
        })

    } else {
        if (user) {
            let match = await bcrypt.compare(password, user.password)
            if (match)
                res.json({ message: 'logged in successfully', token })
            else
                res.json({ message: 'incorrect password' })
        } else {
            res.json({ message: 'email not found' })
        }
    }
}