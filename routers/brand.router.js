import express from 'express'
import { createBrand, deleteBrand, getAllBrands, updateBrand } from '../controllers/brand.controller.js'

export const brandRouter = express.Router()

brandRouter
    .post('/brand', createBrand)
    .get('/brand', getAllBrands)
    .put('/brand', updateBrand)
    .delete('/brand', deleteBrand)