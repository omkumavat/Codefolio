import express from 'express';
const router = express.Router();

import {fetchCodeForces, getLatestContest} from '../Controller/CodeForces.js';
router.post('/fetch',fetchCodeForces)
router.get('/contestfetch',getLatestContest)
export default router;