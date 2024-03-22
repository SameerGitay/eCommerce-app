import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            "dbName": "ecommerce"
        })
        console.log(`Connected to db ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error connecting to DB. Error ${error}`.bgRed.white)
    }
}

export default connectDB