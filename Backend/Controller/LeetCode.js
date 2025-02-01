import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const fetchLeetCode = async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username is required in the request body.' });
        }
        
       
        // const leetcode_profile = await axios.get(`${process.env.leetcode_api}/userProfile/${username}`);
        const leetcode_profile = await axios.get(`${process.env.leetcode_api}/${username}`);
        const leetcode_badges = await axios.get(`${process.env.leetcode_api}/${username}/badges`);
        const leetcode_solved = await axios.get(`${process.env.leetcode_api}/${username}/solved`);
        const leetcode_contest = await axios.get(`${process.env.leetcode_api}/${username}/contest`);
        const leetcode_last_20 = await axios.get(`${process.env.leetcode_api}/${username}/acSubmission`);
        const leetcode_active_2024 = await axios.get(`${process.env.leetcode_api}/userProfileCalendar?username=${username}&year=2024`);
        const leetcode_active_2025 = await axios.get(`${process.env.leetcode_api}/userProfileCalendar?username=${username}&year=2025`);
        
        // Combine all the responses into one object to send back
        const response = {
            profile: leetcode_profile.data,
            badges: leetcode_badges.dataconst ,
            solved: leetcode_solved.data,
            contest: leetcode_contest.data,
            last_20: leetcode_last_20.data,
            active_2024: leetcode_active_2024.data,
            active_2025: leetcode_active_2025.data,
        };

        res.status(200).json(response);

    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error fetching data:', error);

        // Send an error response to the client
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
