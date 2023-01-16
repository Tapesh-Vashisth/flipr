import { Request, Response } from "express";
import { randomUUID } from "crypto";
import Otp from "../../models/Otp";
import nodemailer from "nodemailer"
import User from "../../models/User";

const uuid: string = randomUUID().substring(0, 6);
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1>Verify your email</h1>
    <p>Kindly use this OTP to verify your email : ` + uuid.substring(0, 6) + ` </p>
    <p>Kindly ignore this message if this was not you.</p>
`

const sendVerifyEmailOtp = async (req: Request, res: Response) => {
    console.log('send Verify Email Otp')

    const { email } = req.body

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (user) {
        return res
            .status(409)
            .json({ message: "There exists another account with this email!" })
    }

    // if the user has already requested for an otp earlier, delete it and create a new one
    let existingOtp: any
    try {
        existingOtp = await Otp.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (existingOtp) {
        let deleteExistingOtp: any
        try {
            deleteExistingOtp = await Otp.deleteMany({ email: email }).exec()
        } catch (err) {
            console.log(err)
        }
    }

    const otp = new Otp({
        email: email,
        otp: uuid
    })

    // saving the otp in the database
    try {
        await otp.save()
    } catch (err) {
        console.log(err)
    }

    // sending a mail with nodemailer
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "stockhub.pvt.ltd@gmail.com",
            pass: String(process.env.NODEMAILER)
        }
    })

    let mailOptions = {
        from: "stockhub.pvt.ltd@gmail.com",
        to: email,
        subject: "Verify your account",
        html: html
    }

    transporter.sendMail(mailOptions, (err: any, success: any) => {
        if (err) {
            console.log("Mail not sent.", err)
        }
        else {
            console.log("Success, email has been sent.", success)
        }
    })

    return res
        .status(200)
        .json({ message: "Otp sent" })

}

export default sendVerifyEmailOtp