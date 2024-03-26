import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { validateCreateCategory } from '../helpers/validator.js'
import {
    createCategoryController,
    categoryControlller
} from '../controllers/categoryController.js'

const categoryRoutes = express.Router()


categoryRoutes.post("/create-category",
    requireSignIn,
    isAdmin,
    validateCreateCategory(),
    createCategoryController)
export default categoryRoutes

categoryRoutes.post("/",
    requireSignIn,
    isAdmin,
    categoryControlller)


categoryRoutes.post("/:slug",
    requireSignIn,
    isAdmin,
    categoryControlller)