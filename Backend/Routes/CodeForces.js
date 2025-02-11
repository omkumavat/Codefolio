import express from 'express';
const router = express.Router();

import {AddCodeForcesAccount,fetchAndUpdateCodeforcesSubmissions,fetchCodeforcesContestData,fetchCodeforcesAccount,fetchCodeforcesFromDB, getLatestContest} from '../Controller/CodeForces.js';
router.get('/fetch/:username',fetchAndUpdateCodeforcesSubmissions)
router.get('/contestfetch',getLatestContest)
router.post("/add-codeforces", AddCodeForcesAccount);
// router.get("/fetch-multiple-codeforces-users", fetchMultipleCodeforcesUsers);
router.get("/contests", fetchCodeforcesContestData);
// router.post("/fetch", fetchCodeForces);

router.get('/fetch-codeforces/:username',fetchCodeforcesAccount)

router.get('/fetch-codeforces-from-db/:codeforcesid', fetchCodeforcesFromDB);

export default router;