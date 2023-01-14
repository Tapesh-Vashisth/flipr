"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controllers/auth/login"));
const sendVerifyEmailOtp_1 = __importDefault(require("../controllers/auth/sendVerifyEmailOtp"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = express_1.default.Router();
router.post('/signup', signup_1.default);
router.post('/login', login_1.default);
router.post('/sendotp', sendVerifyEmailOtp_1.default);
router.use('/jwt', verifyJWT_1.default);
router.get('/all');
exports.default = router;
