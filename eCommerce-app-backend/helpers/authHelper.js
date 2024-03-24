import bcrypt from 'bcrypt'
import colors from 'colors'

const secretQuestions = ['what is my school name',
    'what is my best friend name',
    'what is my favourite movie name']

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

export const resolveQuestion = (index) => {
    if (index >= 0 && index < secretQuestions.length) {
        return secretQuestions[index]
    } else {
        return ""
    }
}