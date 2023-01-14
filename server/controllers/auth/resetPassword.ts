import { Request, Response } from "express";
import Otp from "../../models/Otp";

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
            .status(200)
            .json({ message: "" })
    }

}

export default resetPassword