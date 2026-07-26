import express from 'express'
import { createCategory, deleteCategory, getAllCategorys, updateCategory } from '../controllers/category.controller.js'

export const categoryRouter = express.Router()

categoryRouter
    .post('/category', createCategory)
    .get('/category', getAllCategorys)
    .put('/category:id', updateCategory)
    .delete('/category', deleteCategory)