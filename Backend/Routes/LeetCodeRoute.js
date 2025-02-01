import express, { Router } from 'express';
const router = express.Router();

import { fetchLeetCode } from '../Controller/LeetCode.js';
router.post('/fetch',fetchLeetCode);

export default router;