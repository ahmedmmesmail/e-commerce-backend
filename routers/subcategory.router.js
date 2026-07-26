import express from 'express'
import { createSubCategory, deleteSubCategory, getAllSubCategorys, updateSubCategory } from '../controllers/subcategory.controller.js'

export const subcategoryRouter = express.Router()

subcategoryRouter
    .post('/subcategory', createSubCategory)
    .get('/subcategory', getAllSubCategorys)
    .put('/subcategory:id', updateSubCategory)
    .delete('/subcategory', deleteSubCategory)