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
            const { firstName, lastName, email, password, address, phoneNumber, secret } = req.body

            const hashedPassword = await hashPassword(password)

            const user = await userModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address,
                phoneNumber,
                secret
            })

            user.password = undefined
            user._id = undefined
            user.secret = undefined

            res.json({ success: true, data: user })
        }
    } catch (error) {
        console.log(`Error registering user. Error ${error}`.bgRed.white)
        res.status(500).json({ success: false, msg: "Something went wrong" })
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
                user.secret = undefined

                res.json({ success: true, token, data: user })
            }
        }
    } catch (error) {
        console.log(`Error in login. Error ${error}`.bgRed.white)
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}

export const secretOptionsController = (req, res) => {
    const secretQuestions = ['what is my school name',
        'what is my best friend name',
        'what is my favourite movie name']
    res.json({ success: true, data: secretQuestions })
}

export const forgotPasswordController = async (req, res) => {
    try {

        const errors = validationResult(req)

        console.log(errors)

        if (!errors.isEmpty()) {
            console.log(errors.array())
            res.status(400).json({ success: false, msg: "Error reseting password" })
        } else {
            const { email, password, question, answer } = req.body


            console.log(JSON.stringify(req.body))

            const user = await userModel.findOne({ email })

            if (!user) {
                console.log("USER NOT FOUND ", email)
                res.status(400).json({ success: true, msg: 'Error reseting password' })
            } else {

                if ((question !== user.secret.question) || (answer !== user.secret.answer)) {
                    console.log(`Question mismatch expected: ${user.secret.question} received: ${question}`)
                    console.log(`Answer mismatch expected: ${user.secret.answer} received: ${answer}`)

                    res.status(400).json({ success: true, msg: 'Error reseting password' })
                } else {
                    const hashedPassword = await hashPassword(password)

                    const updatedUser = await userModel.findByIdAndUpdate(user._id,
                        { password: hashedPassword })

                    if (updatedUser) {
                        res.json({ success: true, msg: "Password reset successfully" })
                    } else {
                        res.status(400).json({ success: false, msg: "Error reseting password" })
                    }
                }
            }
        }

    } catch (error) {
        console.log(`Error in forgot password. Error ${error}`.bgRed.white)
        res.status(500).json({ success: false, msg: "Something went wrong" })
    }
}