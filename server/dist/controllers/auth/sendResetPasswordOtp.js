"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const nodemailer_1 = __importDefault(require("nodemailer"));
const Otp_1 = __importDefault(require("../../models/Otp"));
const User_1 = __importDefault(require("../../models/User"));
const uuid = (0, crypto_1.randomUUID)().substring(0, 6);
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1Reset your Password</h1>
    <p>Your OTP is : ` + uuid + ` </p>
    <p>Kindly ignore this message if this was not you.</p>
`;
const sendResetPasswordOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("passwordOtp");
    const { email } = req.body;
    let user;
    try {
        user = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        return res.status(400).json({ message: 'Database Error' });
    }
    if (!user) {
        return res
            .status(404)
            .json({ message: "No user found with the given email address!" });
    }
    let existingOtp;
    try {
        existingOtp = yield Otp_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        return res.status(400).json({ message: 'Database Error' });
    }
    if (existingOtp) {
        let deleteExistingOtp;
        try {
            deleteExistingOtp = yield Otp_1.default.deleteMany({ email: email }).exec();
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Database Error' });
        }
    }
    const otp = new Otp_1.default({
        otp: uuid.substring(0, 6),
        email: email
    });
    try {
        yield otp.save();
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Database Error' });
    }
    // sending a mail with nodemailer
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "stockhub.pvt.ltd@gmail.com",
            pass: String(process.env.NODEMAILER)
        }
    });
    let mailOptions = {
        from: "stockhub.pvt.ltd@gmail.com",
        to: email,
        subject: "Reset your password",
        html: html
    };
    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            // console.log("Mail not sent.", err)
            return res.status(400).json({ message: 'Error Sending OTP' });
        }
    });
    return res
        .status(200)
        .json({ message: "Otp sent for password reset!" });
});
exports.default = sendResetPasswordOtp;
