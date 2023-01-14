"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check = (req, res) => {
    console.log("check");
    return res.status(200).json({ message: "perfect" });
};
exports.default = check;
