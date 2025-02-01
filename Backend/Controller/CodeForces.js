import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
export const fetchCodeForces = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required in the request body.' });
        }

        const userStatusUrl = `${process.env.codeforces_api1}${username}&from=1&count=10`;
        const userRatingUrl = `${process.env.codeforces_api2}${username}`;
        const userInfo = `${process.env.codeforces_api3}${username}`;

        const [userResponse, statusResponse, ratingResponse] = await Promise.all([
            axios.get(userInfo),
            axios.get(userStatusUrl),
            axios.get(userRatingUrl)
        ]);

        res.status(200).json({
            info: userResponse.data,
            status: statusResponse.data,
            rating: ratingResponse.data
        });
    } catch (error) {
        console.error('Error fetching Codeforces data:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching data from Codeforces.' });
    }
};
export const getLatestContest = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.codeforces_api4}`);
        console.log(response);

        if (response.data.status === 'OK') {
            const contest = response.data.result;

            // Filter contests with phase "BEFORE"
            const upcomingContests = contest.filter((contest) => contest.phase === 'BEFORE');

            if (upcomingContests.length > 0) {
                // Sort by start time in ascending order
                upcomingContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

                // Map and process contests
                const formattedContests = upcomingContests.map((contest) => ({
                    id: contest.id,
                    name: contest.name,
                    type: contest.type,
                    phase: contest.phase,
                    duration: contest.durationSeconds,
                    startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
                }));

                // Send the response with upcoming contests
                res.status(200).json({
                    success: true,
                    contest: formattedContests,
                });

                // Perform additional processing after finishing "BEFORE" phase
                console.log('All upcoming contests processed successfully.');
            } else {
                // If no contests in the "BEFORE" phase are found
                res.status(404).json({
                    success: false,
                    message: 'No upcoming contests found.',
                });
            }
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch contests from Codeforces.',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching contest data.',
        });
    }
};
