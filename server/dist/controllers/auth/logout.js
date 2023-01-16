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
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('logout');
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204);
    const refreshToken = cookies === null || cookies === void 0 ? void 0 : cookies.jwt;
    // is refreshToken in db 
    const foundUser = yield User_1.default.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
        res.sendStatus(204);
    }
    // delete refreshToken in the database 
    foundUser.refreshToken = "";
    yield foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
});
exports.default = logout;
