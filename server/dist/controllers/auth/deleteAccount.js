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
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('delete account');
    const { email, password } = req.body;
    let user;
    try {
        user = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        return res.status(404).json({ message: 'User Not Found' });
    }
    const passwordCompare = yield bcryptjs_1.default.compare(password, user.password);
    if (!passwordCompare) {
        return res
            .status(404)
            .json({ message: "Password is wrong!" });
    }
    let deletion;
    try {
        deletion = yield User_1.default.findOneAndDelete({ email: email }).exec();
    }
    catch (err) {
        return res.status(400).json({ messge: 'Some Error Occured' });
    }
    return res
        .status(200)
        .json({ message: "Account deleted successfully!" });
});
exports.default = deleteAccount;
