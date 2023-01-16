import express, { Router } from 'express'
import login from "../controllers/auth/login"
import refreshToken from '../controllers/auth/refresh'
import logout from '../controllers/auth/logout'
import sendVerifyEmailOtp from '../controllers/auth/sendVerifyEmailOtp'
import signup from "../controllers/auth/signup"
import verifyJWT from "../middleware/verifyJWT"
import check from "../controllers/auth/check";
import sendResetPasswordOtp from '../controllers/auth/sendResetPasswordOtp'
import resetPassword from '../controllers/auth/resetPassword'
import editAccountDetails from '../controllers/auth/editAccountDetails'
import deleteAccount from '../controllers/auth/deleteAccount'
import updateImage from '../controllers/auth/updateImage'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/passwordotp', sendResetPasswordOtp)
router.post('/sendotp', sendVerifyEmailOtp)
router.post('/resetpassword', resetPassword)
router.get('/refreshToken', refreshToken);

router.use(verifyJWT)

router.get('/logout', logout);
router.post('/updateimage', updateImage)
router.get('/check', check);
router.put('/editaccount', editAccountDetails)
router.post('/deleteUser', deleteAccount)

export default router;
