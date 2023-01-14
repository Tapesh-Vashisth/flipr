"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setCompanyDetails_1 = require("../controllers/company/setCompanyDetails");
const router = express_1.default.Router();
router.get('/set', setCompanyDetails_1.setCompanyDetails);
router.get('/', setCompanyDetails_1.getCompanyDetails);
exports.default = router;
