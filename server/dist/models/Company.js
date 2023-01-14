"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const companySchema = new schema({
    companyName: { type: String, required: true },
    data: [
        {
            date: String,
            data: Array
        }
    ]
});
exports.default = mongoose_1.default.model('company', companySchema);
