import express from 'express';
const router = express.Router();
import {getfuturecontest} from '../Controller/Codechef.js'
router.get('/contestfetch',getfuturecontest)

export default router;