"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/company/companyController");
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = express_1.default.Router();
router.use(verifyJWT_1.default);
router.get('/set', companyController_1.setCompanyDetails);
router.get('/', companyController_1.getCompanyDetails);
exports.default = router;
