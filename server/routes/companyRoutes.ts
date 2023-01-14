import express from 'express'
import { setCompanyDetails,getCompanyDetails } from '../controllers/company/companyController';

const router = express.Router()

router.get('/set',setCompanyDetails);
router.get('/',getCompanyDetails);

export default router;
