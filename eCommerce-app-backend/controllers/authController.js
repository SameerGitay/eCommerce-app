import colors from 'colors'
import userModel from '../models/userModel.js'
import { validationResult } from 'express-validator'
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken'


export const registerController = async (req, res) => {
    try {
        const errors = validationResult(req)

        console.log(errors)

        if (!errors.isEmpty()) {
            console.log(errors.array())
            res.status(400).json({ success: false, msg: "Error registering user" })
        } else {
            const { firstName, lastName, email, password, address, phoneNumber } = req.body

            console.log("Received ", password)

            const hashedPassword = await hashPassword(password)

            console.log("Received ", hashedPassword)

            const user = await userModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address,
                phoneNumber
            })

            user.password = undefined
            user._id = undefined

            res.json({ success: true, data: user })
        }
    } catch (error) {
        console.log(`Error registering user. Error ${error}`.bgRed.white)
        res.status(500).json({ success: false, msg: "Error registering user" })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            console.log("USER NOT FOUND ", email)
            res.status(400).json({ success: false, msg: "Invalid login id or password" })
        } else {
            const passwordMatch = await comparePassword(password, user.password)

            if (!passwordMatch) {
                console.log("PASSWORD MATCH ERROR")
                res.status(400).json({ success: false, msg: "Invalid login id or password" })
            } else {
                console.log(process.env.JWT_SECRET)
                const token = await JWT.sign({ user: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                })

                user.password = undefined
                user._id = undefined

                res.json({ success: true, token, data: user })
            }
        }
    } catch (error) {
        console.log(`Error in login. Error ${error}`.bgRed.white)
        res.status(500).json({ success: false, msg: "Error in login" })
    }
}