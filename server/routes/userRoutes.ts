import express from 'express'
import login from "../controllers/auth/login"
import refreshToken from '../controllers/auth/refresh'
import logout from '../controllers/auth/logout'
import sendVerifyEmailOtp from '../controllers/auth/sendVerifyEmailOtp'
import signup from "../controllers/auth/signup"
import verifyJWT from "../middleware/verifyJWT"
import check from "../controllers/auth/check";

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout);
router.post('/sendotp', sendVerifyEmailOtp)
router.get('/refreshToken', refreshToken);
router.use(verifyJWT)

router.get('/check', check);

router.get('/all');

export default router;
