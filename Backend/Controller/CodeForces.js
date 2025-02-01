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

        const [userResponse,statusResponse, ratingResponse] = await Promise.all([
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
