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
const Otp_1 = __importDefault(require("../../models/Otp"));
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("resetPassword");
    const { email, otp, password } = req.body;
    let otpDB;
    try {
        otpDB = yield Otp_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        // console.log(err)
        return res.status(400).json({ message: 'Database Error' });
    }
    if (!otpDB) {
        return res
            .status(404)
            .json({ message: "User Not Found!" });
    }
    if (otp !== otpDB.otp) {
        return res
            .status(400)
            .json({ message: "Wrong otp entered!" });
    }
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
            .json({ message: "No user with this email found in the database!" });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 5);
    user.password = hashedPassword;
    try {
        yield user.save();
    }
    catch (err) {
        return res.status(400).json({ message: 'Database Error' });
    }
    return res
        .status(200)
        .json({ message: "Password changed successfully!" });
});
exports.default = resetPassword;
