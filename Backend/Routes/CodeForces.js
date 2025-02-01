import express from 'express';
const router = express.Router();

import {fetchCodeForces} from '../Controller/CodeForces.js';
router.post('/fetch',fetchCodeForces)

export default router;