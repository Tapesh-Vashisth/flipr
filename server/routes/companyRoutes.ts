import express from 'express'
import { setCompanyDetails,getCompanyDetails } from '../controllers/company/setCompanyDetails';

const router = express.Router()

router.get('/set',setCompanyDetails);
router.get('/',getCompanyDetails);

export default router;
