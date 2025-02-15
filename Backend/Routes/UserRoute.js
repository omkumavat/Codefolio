import express from 'express';
const router = express.Router();

import { sendOTPEmail,sendSignUpSuccessfulEmail } from '../Controller/EmailService.js';
import { Signup,Login,checkUsername,getUser,checkUser,getUserbyId ,editUserbyId} from '../Controller/AuthUser.js';

router.post('/user/sign-up',Signup)
router.post('/user/login',Login)
router.get('/user/check-username/:username',checkUsername)
router.get('/user/getuser/:id',getUserbyId)
router.put('/user/edituser/:id',editUserbyId)

router.get('/user/get-user/:id',getUser)
router.get('/user/check-user/:username',checkUser)

router.post('/user/email/email-signup',sendSignUpSuccessfulEmail)
router.post('/user/email/email-otp',sendOTPEmail)

// import { fetchGFG } from '../Controller/GeeksForGeeks.js';
// router.post('/fetch/gfg',fetchGFG)

export default router;