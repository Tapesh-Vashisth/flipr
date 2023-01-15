import express, { Router } from 'express'
import login from "../controllers/auth/login"
import refreshToken from '../controllers/auth/refresh'
import logout from '../controllers/auth/logout'
import sendVerifyEmailOtp from '../controllers/auth/sendVerifyEmailOtp'
import signup from "../controllers/auth/signup"
import verifyJWT from "../middleware/verifyJWT"
import check from "../controllers/auth/check";
import editAccountDetails from "../controllers/auth/editAccountDetails";
import sendResetPasswordOtp from '../controllers/auth/sendResetPasswordOtp'
import resetPassword from '../controllers/auth/resetPassword'
import deleteAccount from '../controllers/auth/deleteAccount'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout);
router.post('/passwordotp', sendResetPasswordOtp)
router.post('/sendotp', sendVerifyEmailOtp)
router.post('/resetpassword', resetPassword)
router.get('/refreshToken', refreshToken);
router.use(verifyJWT)
router.post("/updateDetails", editAccountDetails);
router.get('/check', check);
router.post('/deleteUser', deleteAccount);
router.get('/all');

export default router;
