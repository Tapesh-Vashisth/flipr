export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
})

export default mongoose.model('Otp', otpSchema)