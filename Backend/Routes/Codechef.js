import express from 'express';
const router = express.Router();
import {getfuturecontest,fetchUserNameExists,AddCodeChefAccount,
    fetchCodeChefFromDB,fetchCodeChefAccount} from '../Controller/Codechef.js'
router.get('/contestfetch',getfuturecontest)

router.get('/check-user/:username',fetchUserNameExists)
router.post('/add-codechef',AddCodeChefAccount);
router.get('/fetch-codechef/:username',fetchCodeChefAccount)
router.get('/fetch-codechef-from-db/:codechefid',fetchCodeChefFromDB)

export default router;