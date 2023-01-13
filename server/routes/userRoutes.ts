import express from 'express'
const router = express.Router();
import {handleUserLogin,handleUserRegister} from '../controllers/userController'

router.get('/all');
router.post('/login',handleUserLogin);
router.post('/register',handleUserRegister);

export default router;