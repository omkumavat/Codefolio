import express from 'express';
const router = express.Router();

import { addGFG,fetchGFG ,fetchGFGfromDB} from '../Controller/GeeksForGeeks.js';
router.post('/add-gfg',addGFG)
router.get('/fetch-gfg/:username',fetchGFG)
router.get('/fetch-gfg-db/:gfgid',fetchGFGfromDB)

export default router;