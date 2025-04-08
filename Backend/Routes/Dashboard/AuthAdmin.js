import express from 'express';
const router = express.Router();

import { registerAdmin,verifyAndRegisterAdmin,checkTokenValidity
    ,LoginAdmin
 } from '../../Controller/Dashboard/AuthAdmin.js';

router.post('/register-verify',registerAdmin)
router.post('/final-register',verifyAndRegisterAdmin)
router.get('/check-token',checkTokenValidity)
router.post('/login-admin',LoginAdmin)

export default router;