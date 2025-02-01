import express from 'express';
const router = express.Router();

import { sendOTPEmail,sendSignUpSuccessfulEmail } from '../Controller/EmailService.js';
import { Signup,Login,checkUsername } from '../Controller/AuthUser.js';

router.post('/user/sign-up',Signup)
router.post('/user/login',Login)
router.get('/user/check-username/:username',checkUsername)

router.post('/user/email/email-signup',sendSignUpSuccessfulEmail)
router.post('/user/email/email-otp',sendOTPEmail)

// import { fetchGFG } from '../Controller/GeeksForGeeks.js';
// router.post('/fetch/gfg',fetchGFG)

export default router;