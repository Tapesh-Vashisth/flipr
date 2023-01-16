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
const Otp_1 = __importDefault(require("../../models/Otp"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../../models/User"));
const uuid = (0, crypto_1.randomUUID)().substring(0, 6);
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1>Verify your email</h1>
    <p>Kindly use this OTP to verify your email : ` + uuid.substring(0, 6) + ` </p>
    <p>Kindly ignore this message if this was not you.</p>
`;
const sendVerifyEmailOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('send Verify Email Otp');
    const { email } = req.body;
    let user;
    try {
        user = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        console.log(err);
    }
    if (user) {
        return res
            .status(409)
            .json({ message: "There exists another account with this email!" });
    }
    // if the user has already requested for an otp earlier, delete it and create a new one
    let existingOtp;
    try {
        existingOtp = yield Otp_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        console.log(err);
    }
    if (existingOtp) {
        let deleteExistingOtp;
        try {
            deleteExistingOtp = yield Otp_1.default.deleteMany({ email: email }).exec();
        }
        catch (err) {
            console.log(err);
        }
    }
    const otp = new Otp_1.default({
        email: email,
        otp: uuid
    });
    // saving the otp in the database
    try {
        yield otp.save();
    }
    catch (err) {
        console.log(err);
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
        subject: "Verify your account",
        html: html
    };
    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            console.log("Mail not sent.", err);
        }
        else {
            console.log("Success, email has been sent.", success);
        }
    });
    return res
        .status(200)
        .json({ message: "Otp sent" });
});
exports.default = sendVerifyEmailOtp;
