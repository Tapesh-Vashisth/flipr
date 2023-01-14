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
const uuid = (0, crypto_1.randomUUID)();
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1Reset your Blogify Password</h1>
    <p>Your OTP is : ` + uuid + ` </p>
    <p>Kindly click this link to reset your blogify password : </p>
    <button> <a href="http://localhost:3000/setnewpassword"> Verify Email </a> </button>
    <p>Kindly ignore this message if this was not you.</p>
`;
const sendResetPasswordOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let user;
    try {
        user = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        console.log(err);
    }
    if (!user) {
        return res
            .status(404)
            .json({ message: "No user found with the given email address!" });
    }
    const otp = new Otp_1.default({
        otp: uuid,
        email: email
    });
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
            user: "blogify253@gmail.com",
            pass: "oshjipijfcacciyx"
        }
    });
    let mailOptions = {
        from: "blogify253@gmail.com",
        to: email,
        subject: "Reset your password",
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
        .json({ message: "Otp sent for password reset!" });
});
exports.default = sendResetPasswordOtp;
