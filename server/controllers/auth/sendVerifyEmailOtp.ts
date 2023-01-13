import { Request, Response } from "express";
import { randomUUID } from "crypto";
import Otp from "../../models/Otp";
import nodemailer from "nodemailer"

const uuid: string = randomUUID()
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1Reset your Blogify Password</h1>
    <p>Your OTP is : ` + uuid + ` </p>
    <p>Kindly click this link to reset your blogify password : </p>
    <button> <a href="http://localhost:3000/setnewpassword"> Verify Email </a> </button>
    <p>Kindly ignore this message if this was not you.</p>
`

const sendVerifyEmailOtp = async (req: Request, res: Response) => {

    const { email } = req.body

    let existingOtp: any
    try {
        existingOtp = await Otp.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }
    
    if (existingOtp) {
        let deleteExistingOtp: any
        try {
            deleteExistingOtp = await Otp.findOneAndDelete({ email: email }).exec()
        } catch (err) {
            console.log(err)
        }
    }

    const otp = new Otp({
        email: email,
        uuid: uuid
    })

    try {
        await otp.save()
    } catch (err) {
        console.log(err)
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "blogify253@gmail.com",
            pass: "oshjipijfcacciyx"
        }
    })

    let mailOptions = {
        from: "blogify253@gmail.com",
        to: email,
        subject: "Verify your Blogify Account Email",
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