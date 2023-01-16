import express from 'express'
import { setCompanyDetails,getCompanyDetails } from '../controllers/company/companyController';
import verifyJWT from '../middleware/verifyJWT';

const router = express.Router()

router.use(verifyJWT);

router.get('/set',setCompanyDetails);
router.get('/',getCompanyDetails);

export default router;
