import express from 'express'
import login from "../controllers/auth/login"
import sendVerifyEmailOtp from '../controllers/auth/sendVerifyEmailOtp'
import signup from "../controllers/auth/signup"
import logout from "../controllers/auth/logout"
import verifyJWT from "../middleware/verifyJWT"
import refreshToken from '../controllers/auth/refresh'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout);
router.post('/sendotp', sendVerifyEmailOtp)
router.get('/refreshtoken', refreshToken);

router.use(verifyJWT);


router.get('/all');

export default router;
