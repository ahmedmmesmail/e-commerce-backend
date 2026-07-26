import express from 'express'
import { logIn, signUp } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter
    .post('/signup', signUp)
    .post('/login', logIn)