import express from 'express'
import { createReview, deleteReview, getAllReviews, updateReview } from '../controllers/review.controller.js'

export const reviewRouter = express.Router()

reviewRouter
    .post('/review', createReview)
    .get('/review', getAllReviews)
    .put('/review:id', updateReview)
    .delete('/review', deleteReview)