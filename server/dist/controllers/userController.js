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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserRegister = exports.handleUserLogin = void 0;
// import User from '../models/User';
const handleUserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const b = req.body;
    const user = null;
    // const user = await User.findOne({email:b.email}).exec();
    if (!user) {
        return res.status(404).json({ message: 'not authorized' });
    }
    const check = null;
    //  = user.password===b.password;
    if (!check) {
        return res.status(401).json({ message: 'wrong password not authorized' });
    }
    res.status(200).json(user);
});
exports.handleUserLogin = handleUserLogin;
const handleUserRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const b = req.body;
    const user = null;
    // const user = await User.findOne({email:b.email}).exec();
    if (user) {
        return res.status(409).json({ message: 'username already exists' });
    }
    // const newUser = await new User({
    //     username:b.username,
    //     password:b.password
    // });
    // await newUser.save();
    // res.status(200).json(user);
});
exports.handleUserRegister = handleUserRegister;
