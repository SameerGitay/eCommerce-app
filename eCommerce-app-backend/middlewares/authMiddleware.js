import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(`Error in requireSignIn. Error ${error}`)
        // next(error)
        res.status(500).json({ success: false, msg: 'Unknown error' })
    }
}

export const isAdmin = async (req, res, next) => {
    next()
    // try {
    //     const user = await userModel.findById({ req.user._id })
    //     if (user.role !== 1) {
    //         res.status(401).json({ success: false, msg: "Unauthorised Access" })
    //     } else {
    //         next()
    //     }
    // } catch (error) {
    //     console.log(`Error in isAdmin. Error ${error}`)
    //     // next(error)
    //     res.status(500).json({ success: false, msg: 'Unknown error' })
    // }
}