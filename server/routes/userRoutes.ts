import express from 'express'
import login from "../controllers/auth/login"
import sendVerifyEmailOtp from '../controllers/auth/sendVerifyEmailOtp'
import signup from "../controllers/auth/signup"
import verifyJWT from "../middleware/verifyJWT"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/sendotp', sendVerifyEmailOtp)

router.use('/jwt', verifyJWT)

router.get('/all');

export default router;
