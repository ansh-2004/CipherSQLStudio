import 'dotenv/config'
import mongoose from "mongoose"

async function connectMongo(){
    try {
        const db = await mongoose.connect(process.env.mongoURL)
        console.log('mongo db connected successfully')
    } catch (error) {
        console.log("error in connecting mongodb",error)
    }
}

export default connectMongo;

