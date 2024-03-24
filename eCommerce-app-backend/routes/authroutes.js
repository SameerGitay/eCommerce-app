import express from 'express'
import {
    registerController,
    loginController,
    secretOptionsController,
    forgotPasswordController
} from '../controllers/authController.js'
import {
    validateRegistration,
    validateForgotPassword
} from '../helpers/validator.js'

import { requireSignIn } from '../middlewares/authMiddleware.js'

const authRoutes = express.Router()


authRoutes.post('/register',
    validateRegistration(),
    registerController)


authRoutes.post('/login',
    loginController)


authRoutes.post('/secret-options', secretOptionsController)

authRoutes.post('/forgot-password',
    validateForgotPassword(),
    forgotPasswordController)

authRoutes.get('/user-auth', requireSignIn, (req, res) => {
    res.json({ success: true })
})
export default authRoutes