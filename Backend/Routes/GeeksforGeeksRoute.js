import express from 'express';
const router = express.Router();

import { fetchGFG } from '../Controller/GeeksForGeeks.js';
router.post('/fetch',fetchGFG)

export default router;