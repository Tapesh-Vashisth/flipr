export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    uuid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
    refreshToken: {
        type: String,
        required: false
    }
})

export default mongoose.model('User', userSchema)
