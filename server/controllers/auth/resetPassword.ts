import { Request, Response } from "express";
import Otp from "../../models/Otp";
import User from "../../models/User";

const resetPassword = async (req: Request, res: Response) => {

    const { email, otp, password } = req.body

    let otpDB: any
    try {
        otpDB = await Otp.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!otpDB) {
        return res
            .status(404)
            .json({ message: "No otp found in database" })
    }

    if (otp !== otpDB.otp) {
        return res
            .status(400)
            .json({ message: "Wrong otp entered!" })
    }

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (!user) {
        return res
            .status(404)
            .json({ message: "No user with this email found in the database!" })
    }

    user.password = password

    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }

    return res
        .status(200)
        .json({ message: "Password changed successfully!" })

}

export default resetPassword