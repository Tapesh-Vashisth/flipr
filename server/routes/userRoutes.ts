import express from 'express'
import login from "../controllers/auth/login"
import signup from "../controllers/auth/signup"
import verifyJWT from "../middleware/verifyJWT"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/sendotp', login)

router.use('/jwt', verifyJWT)

router.get('/all');

export default router;
