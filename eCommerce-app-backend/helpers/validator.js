
import { body } from 'express-validator';

export const validateRegistration = () => {

    return [
        body('email', 'Invalid Email').notEmpty().isEmail(),
        body('password', 'Password must be between 8 to 12 characters long').notEmpty().isLength({ min: 8, max: 12 }),
        body('firstName', 'First name is required').notEmpty(),
        body('lastName', 'Last name is required').notEmpty(),
        body('phoneNumber', 'Phone number is required').notEmpty(),
        body('address', 'Address is required').notEmpty()
    ]

}
