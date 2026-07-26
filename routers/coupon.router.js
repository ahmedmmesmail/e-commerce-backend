import express from 'express'
import { createCoupon, deleteCoupon, getAllCoupons, updateCoupon } from '../controllers/coupon.controller.js'

export const couponRouter = express.Router()

couponRouter
    .post('/coupon', createCoupon)
    .get('/coupon', getAllCoupons)
    .put('/coupon:id', updateCoupon)
    .delete('/coupon', deleteCoupon)