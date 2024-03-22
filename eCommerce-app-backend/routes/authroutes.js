import express from 'express'
import { registerController, loginController } from '../controllers/authController.js'
import {
    validateRegistration
} from '../helpers/validator.js'

const authRoutes = express.Router()


authRoutes.post('/register',
    validateRegistration(),
    registerController)


authRoutes.post('/login',
    loginController)
export default authRoutes