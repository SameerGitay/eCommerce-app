import mongoose, { model } from 'mongoose'


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    secret: {
        question: {
            type: String,
            enum: ['what is my school name',
                'what is my best friend name',
                'what is my favourite movie name'],
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

export default mongoose.model('user', userSchema)