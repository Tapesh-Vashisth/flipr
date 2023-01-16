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
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login");
    const { email, password } = req.body;
    let user;
    try {
        user = yield User_1.default.findOne({ email: email }).select('uuid name email password image').exec();
    }
    catch (err) {
        return res.status(500).json({ message: "Database not responding!" });
    }
    // if no user is found with the entered email address
    if (!user) {
        return res
            .status(404)
            .json({ message: "No such user exists!" });
    }
    const uuid = user.uuid;
    // using bcryptjs's asynchronous comparison method to compare the entered password with the hashed password 
    const passwordCompare = yield bcryptjs_1.default.compare(password, user.password);
    if (!passwordCompare) {
        return res
            .status(400)
            .json({ message: "Password is wrong" });
    }
    // creating access token 
    const accessToken = jsonwebtoken_1.default.sign({ uuid: uuid }, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: "10s"
    });
    // creating refresh token
    const refreshToken = jsonwebtoken_1.default.sign({ uuid: uuid }, String(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: "60m"
    });
    // saving the refresh token in the user's database
    user.refreshToken = refreshToken;
    try {
        yield user.save();
    }
    catch (err) {
        return res.status(500).json({ message: "Database not responding!" });
    }
    // creating the refresh token cookie
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    return res
        .status(200)
        .json({
        accessToken: accessToken,
        email: email,
        name: user.name,
        image: user.image
    });
});
exports.default = login;
