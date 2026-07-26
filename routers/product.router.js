import express from 'express'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js'

export const productRouter = express.Router()

productRouter
    .post('/product', createProduct)
    .get('/product', getAllProducts)
    .put('/product:id', updateProduct)
    .delete('/product', deleteProduct)