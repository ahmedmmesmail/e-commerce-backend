import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'error'],
        maxLength: [30, 'error']
    },
    email: {
        type: String,
        required: true,
        minLength: [7, 'error'],
        maxLength: [30, 'error']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'error'],
        maxLength: [30, 'error']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profilePic: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean
    },
    isVerfied: {
        type: Boolean
    },
})

export const userModel = mongoose.model('user', userSchema)