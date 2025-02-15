import axios from 'axios';
import dotenv from 'dotenv';
import LeetCodeUser from '../Models/LeetCode.js';
import User from '../Models/User.js';
dotenv.config();

export const fetchLeetCode = async (req, res) => {
    try {
        const { username } = req.params;

        console.log("Username:", username);

        // Find User in the database
        const findUser = await User.findOne({ username }).exec();
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the associated LeetCodeUser
        let existingUser = await LeetCodeUser.findById(findUser.LeetCode).exec();

        if (!existingUser) {
            return res.status(400).json({
                success: "error",
                message: "LeetCode user not found",
            });
        }

        // username==existingUser.username;
        console.log(existingUser.username);

        // Fetch data from LeetCode APIs
        const profilePromise = axios.get(`${process.env.leetcode_api_to_check_user1}/${existingUser.username}`).catch(() => null);
        const contestPromise = axios.get(`${process.env.leetcode_api}/${existingUser.username}/contest`).catch(() => null);
        const submissionsPromise2025 = axios.get(`${process.env.leetcode_api}/userProfileCalendar?username=${existingUser.username}&year=2025`).catch(() => null);
        const submissionsPromise2024 = axios.get(`${process.env.leetcode_api}/userProfileCalendar?username=${existingUser.username}&year=2024`).catch(() => null);

        // Await all API responses
        const [profileRes, contestRes, submissionsRes2024, submissionsRes2025] = await Promise.all([
            profilePromise, contestPromise, submissionsPromise2024, submissionsPromise2025
        ]);

        let profileData;
        let acceptanceRate = 0;
        const profilePromise2 = await axios.get(`${process.env.leetcode_api_to_check_user2}/${username}`).catch(() => null);
        if (profilePromise2?.data) {
            acceptanceRate = profilePromise2?.data.acceptanceRate;
        }
        if (!profileRes?.data) {
            const profilePromise2 = await axios.get(`${process.env.leetcode_api_to_check_user2}/${username}`).catch(() => null);
            profileData = profilePromise2?.data || null;
        } else {
            profileData = profileRes.data;
        }

        const contestData = contestRes?.data || null;
        const submissionsData2024 = submissionsRes2024?.data?.data?.matchedUser?.userCalendar || null;
        const submissionsData2025 = submissionsRes2025?.data?.data?.matchedUser?.userCalendar || null;

        if (!profileData && !contestData && !submissionsData2024 && !submissionsData2025) {
            return res.status(400).json({ message: "Failed to fetch user data from LeetCode APIs" });
        }

        // Convert submission calendars
        const submissionCalendar2024 = submissionsData2024?.submissionCalendar
            ? Object.entries(JSON.parse(submissionsData2024.submissionCalendar)).map(([date, submissions]) => ({
                date: Number(date),
                submissions: submissions,
            }))
            : [];

        const submissionCalendar2025 = submissionsData2025?.submissionCalendar
            ? Object.entries(JSON.parse(submissionsData2025.submissionCalendar)).map(([date, submissions]) => ({
                date: Number(date),
                submissions: submissions,
            }))
            : [];

        console.log(acceptanceRate)
        existingUser.profile = profileData
            ? {
                ranking: profileData.ranking,
                totalSolved: profileData.totalSolved,
                easySolved: profileData.easySolved,
                mediumSolved: profileData.mediumSolved,
                hardSolved: profileData.hardSolved,
                acceptanceRate: acceptanceRate,
                recentSubmissions: profileData.recentSubmissions,
            }
            : existingUser.profile;

        existingUser.contests = contestData
            ? {
                contestAttend: contestData.contestAttend,
                contestRating: Number.isFinite(contestData.contestRating) ? Math.floor(contestData.contestRating) : 0,
                contestParticipation: contestData.contestParticipation || [],
            }
            : existingUser.contests;

        existingUser.submissions_2024 = submissionsData2024
            ? {
                activeYears: submissionsData2024.activeYears || [],
                streak: submissionsData2024.streak || 0,
                totalActiveDays: submissionsData2024.totalActiveDays || 0,
                submissionCalendar: submissionCalendar2024,
            }
            : existingUser.submissions_2024;

        existingUser.submissions_2025 = submissionsData2025
            ? {
                activeYears: submissionsData2025.activeYears || [],
                streak: submissionsData2025.streak || 0,
                totalActiveDays: submissionsData2025.totalActiveDays || 0,
                submissionCalendar: submissionCalendar2025,
            }
            : existingUser.submissions_2025;

        await existingUser.save();
        await User.findByIdAndUpdate(findUser._id, { LeetCode: existingUser._id });

        return res.status(200).json({
            message: "LeetCode user data updated successfully",
            data: existingUser,
        });

    } catch (error) {
        console.error("Error updating/retrieving LeetCode user data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const fetchUserExist = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ error: 'Username is required in the request body.' });
        }

        let total1 = 0;
        let total2 = 0;
        const leetcode_profile = await axios.get(`${process.env.leetcode_api_to_check_user1}/${username}`);

        if (leetcode_profile.data.errors) {
            return res.status(200).json({
                success: false
            });
        }
        console.log(leetcode_profile)

        total1 = leetcode_profile.data.totalSubmissions[0]?.submissions;
        total2 = leetcode_profile.data.totalSubmissions[1]?.submissions;
        console.log(total1);
        console.log(total2);

        const response = {
            success: true,
            total1: total1,
            total2: total2
        };

        return res.status(200).json(response);

    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error fetching data:', error);

        // Send an error response to the client
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

export const fetchUserNameExists = async (req, res) => {
    try {
        const { leetid } = req.params;
        let existingUser = await LeetCodeUser.findById(leetid).exec();

        if (!existingUser) {
            console.log("LeetCode user not found, creating a new one.");
            return res.status(400).json({
                success: false,
                message: "LeetCode user not found"
            });
        } else {
            return res.status(400).json({
                data: existingUser.username,
                success: true,
                message: "LeetCode user not found"
            });
        }
    } catch (error) {
        console.error("Error storing LeetCode user data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const fetchFromDB = async (req, res) => {
    try {
        const { leetid } = req.params;
        let existingUser = await LeetCodeUser.findById(leetid).exec();

        if (!existingUser) {
            console.log("LeetCode user not found, creating a new one.");
            return res.status(400).json({
                success: false,
                message: "LeetCode user not found"
            });
        } else {
            return res.status(200).json({
                data: existingUser,
                success: true,
                message: "LeetCode user  found"
            });
        }
    } catch (error) {
        console.error("Error storing LeetCode user data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const AddLeetCodeAccount = async (req, res) => {
    try {
        const { email, username } = req.body;

        console.log("Email:", email);

        // Find the user by email
        const findUser = await User.findOne({ email }).exec();

        if (!findUser) {
            console.log("User not found in the database.");
            return res.status(400).json({ message: "User not exists in database" });
        }

        // Check if the LeetCode user already exists in the database
        const existingUser = await LeetCodeUser.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Leetcode account already exists in the database" });
        }

        // Fetch data from LeetCode APIs
        const profilePromise = axios.get(`${process.env.leetcode_api_to_check_user1}/${username}`).catch(() => null);
        const contestPromise = axios.get(`${process.env.leetcode_api}/${username}/contest`).catch(() => null);
        const submissionsPromise2025 = axios.get(`${process.env.leetcode_api}/userProfileCalendar?username=${username}&year=2025`).catch(() => null);
        const submissionsPromise2024 = axios.get(`${process.env.leetcode_api}/userProfileCalendar?username=${username}&year=2024`).catch(() => null);
        const rankPromise = axios.get(`${process.env.leetcode_api}/${username}`).catch(() => null);

        // Await all API responses
        const [profileRes, contestRes, submissionsRes2024, submissionsRes2025, rankRes] = await Promise.all([
            profilePromise, contestPromise, submissionsPromise2025, submissionsPromise2024, rankPromise
        ]);

        let profileData;
        let acceptanceRate = 0;
        const profilePromise2 = await axios.get(`${process.env.leetcode_api_to_check_user2}/${username}`).catch(() => null);
        if (profilePromise2?.data) {
            acceptanceRate = profilePromise2?.data.acceptanceRate;
        }
        if (!(profileRes?.data)) {
            const profilePromise2 = await axios.get(`${process.env.leetcode_api_to_check_user2}/${username}`).catch(() => null);
            profileData = profilePromise2?.data || null;
        } else {
            profileData = profileRes?.data || null;
        }
        const contestData = contestRes?.data || null;
        const submissionsData2024 = submissionsRes2024 ? submissionsRes2024.data?.data?.matchedUser?.userCalendar : null;
        const submissionsData2025 = submissionsRes2025 ? submissionsRes2025.data?.data?.matchedUser?.userCalendar : null;

        // Ensure at least one API returned valid data before saving
        if (!profileData && !contestData && !submissionsData2024 && !submissionsData2025) {
            return res.status(400).json({ message: "Failed to fetch user data from LeetCode APIs" });
        }

        const submissionCalendar2024 = submissionsData2024?.submissionCalendar
            ? Object.entries(JSON.parse(submissionsData2024.submissionCalendar)).map(([date, submissions]) => ({
                date: Number(date),
                submissions: submissions,
            }))
            : [];

        const submissionCalendar2025 = submissionsData2025?.submissionCalendar
            ? Object.entries(JSON.parse(submissionsData2025.submissionCalendar)).map(([date, submissions]) => ({
                date: Number(date),
                submissions: submissions,
            }))
            : [];

        // const ac = profileData ? (profileData.totalSolved / (totalSubmissions[0].submissions)) * 100 : 0;
        const newLeetCode = new LeetCodeUser({
            username,
            profile: profileData
                ? {
                    ranking: profileData.ranking,
                    totalSolved: profileData.totalSolved,
                    easySolved: profileData.easySolved,
                    mediumSolved: profileData.mediumSolved,
                    hardSolved: profileData.hardSolved,
                    acceptanceRate: acceptanceRate,
                    recentSubmissions: profileData.recentSubmissions,
                }
                : undefined,
            contests: contestData
                ? {
                    contestAttend: contestData.contestAttend,
                    contestRating: Math.floor(contestData.contestRating),
                    contestParticipation: contestData.contestParticipation || [],
                }
                : undefined,
            submissions_2024: submissionsData2024
                ? {
                    activeYears: submissionsData2024.activeYears || [],
                    streak: submissionsData2024.streak || 0,
                    totalActiveDays: submissionsData2024.totalActiveDays || 0,
                    submissionCalendar2024,
                }
                : undefined,
            submissions_2025: submissionsData2025
                ? {
                    activeYears: submissionsData2025.activeYears || [],
                    streak: submissionsData2025.streak || 0,
                    totalActiveDays: submissionsData2025.totalActiveDays || 0,
                    submissionCalendar2025
                }
                : undefined,
        });

        await newLeetCode.save();
        findUser.LeetCode = newLeetCode._id;
        await User.findByIdAndUpdate(findUser._id, { LeetCode: newLeetCode._id });
        return res.status(201).json({ message: "User data stored successfully", data: newLeetCode });

    } catch (error) {
        console.error("Error storing LeetCode user data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteLeetCodeUser = async (req, res) => {
    try {
        const { leetid } = req.params;

        const leetcodeUser = await LeetCodeUser.findOneAndDelete(leetid);

        if (!leetcodeUser) {
            return res.status(404).json({ message: "LeetCode user not found" });
        }

        return res.status(200).json({ message: "LeetCode user deleted successfully" });
    } catch (error) {
        console.error("Error deleting LeetCode user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
