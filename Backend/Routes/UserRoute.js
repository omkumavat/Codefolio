import express from 'express';
const router = express.Router();

import { sendOTPEmail,sendSignUpSuccessfulEmail } from '../Controller/EmailService.js';
import { fetchGFG } from '../Controller/GeeksForGeeks.js';
import { fetchLeetCode } from '../Controller/LeetCode.js';
import { Signup,Login } from '../Controller/AuthUser.js';

router.post('/user/sign-up',Signup)
router.post('/user/login',Login)

router.post('/user/email/email-signup',sendSignUpSuccessfulEmail)
router.post('/user/email/email-otp',sendOTPEmail)

router.post('/user/gfg',fetchGFG)
router.post('/user/leet',fetchLeetCode)

export default router;