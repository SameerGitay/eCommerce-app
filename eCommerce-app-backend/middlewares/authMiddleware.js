import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        console.log('toke decoded ', decode)
        next()
    } catch (error) {
        console.log(`Error in requireSignIn. Error ${error}`)
        // next(error)
        res.status(500).json({ success: false, msg: 'Unknown error' })
    }
}

export const isAdmin = async (req, res, next) => {

    try {
        console.log('checking for admin ', req.user)
        if (req.user.user === '6601102c54ec9ab48800b0fb') {
            console.log('match')
            next()
        } else {
            console.log('no match')
            res.status(400).json({ success: false, msg: "UnAuthorized Access" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: 'Something went wrong' })
    }

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