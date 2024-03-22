import bcrypt from 'bcrypt'
import colors from 'colors'

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    } catch (error) {
        console.log(`Error hashing password. ${error}`.bgRed.white)
    }
}


export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}