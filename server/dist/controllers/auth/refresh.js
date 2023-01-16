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
require("dotenv").config();
const jwt = require("jsonwebtoken");
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("refresh");
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return res.sendStatus(403);
    }
    // accessing the refresh token cookie
    const refreshtoken = cookies.jwt;
    const foundUser = yield User_1.default.findOne({ refreshToken: refreshtoken }).exec();
    if (!foundUser)
        return res.status(403).json({ message: 'Logged Out' });
    // evaluate jwt 
    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.uuid !== decoded.uuid)
            return res.sendStatus(403);
        const accessToken = jwt.sign({ uuid: foundUser.uuid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10s" });
        res.json({ accessToken });
    });
});
exports.default = refreshToken;
