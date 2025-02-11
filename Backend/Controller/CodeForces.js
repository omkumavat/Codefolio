import axios from "axios";
import dotenv from "dotenv";
import User from "../Models/User.js";
import CodeforcesUser from "../Models/CodeForces.js"; // Make sure this import is here
dotenv.config();

// Utility function for error handling
const handleError = (res, error) => {
  console.error("Error:", error.message);
  res.status(500).json({ message: "Internal server error", error: error.message });
};


// Fetch Codeforces user info, rating, and status
export const fetchCodeForces = async (req, res) => {
  console.log(CodeforcesUser);

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required in the request body." });
    }

    const findUser = await User.findOne({ username }).exec();
      if (!findUser) {
          return res.status(400).json({ message: "User does not exist in the database" });
      }

      // Check if the Codeforces user already exists in the database
      const existingUser = await CodeforcesUser.findById(findUser.CodeForces);
      if (!existingUser) {
          return res.status(400).json({ message: "Codeforces account already exists in the database" });
      }

    const userStatusUrl = `${process.env.CODEFORCES_API_STATUS}${existingUser.username}&from=1&count=10`;
    const userRatingUrl = `${process.env.CODEFORCES_API_RATING}${existingUser.username}`;
    const userInfoUrl = `${process.env.CODEFORCES_API_USER}${existingUser.username}`;

    const [userResponse, statusResponse, ratingResponse] = await Promise.all([
      axios.get(userInfoUrl),
      axios.get(userStatusUrl),
      axios.get(userRatingUrl),
    ]);

    res.status(200).json({
      info: userResponse.data,
      status: statusResponse.data,
      rating: ratingResponse.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Fetch upcoming contests
export const getLatestContest = async (req, res) => {
  try {
    const response = await axios.get(process.env.CODEFORCES_API_CONTESTS);

    if (response.data.status === "OK") {
      const contests = response.data.result.filter((contest) => contest.phase === "BEFORE");
      contests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

      const formattedContests = contests.map((contest) => ({
        id: contest.id,
        name: contest.name,
        type: contest.type,
        phase: contest.phase,
        duration: contest.durationSeconds,
        startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
      }));

      res.status(200).json({ success: true, contest: formattedContests });
    } else {
      res.status(500).json({ success: false, message: "Failed to fetch contests from Codeforces." });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const AddCodeForcesAccount = async (req, res) => {
  try {
      const { username, email } = req.body;

      if (!email || !username) {
          return res.status(400).json({ message: "Email and username are required" });
      }

      // Find the user by email
      const findUser = await User.findOne({ email }).exec();
      if (!findUser) {
          return res.status(400).json({ message: "User does not exist in the database" });
      }

      // Check if the Codeforces user already exists in the database
      const existingUser = await CodeforcesUser.findOne({  username });
      if (existingUser) {
          return res.status(400).json({ message: "Codeforces account already exists in the database" });
      }

      // Fetch Codeforces user submissions
      const submissionsUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`;
      const userInfoUrl = `https://codeforces.com/api/user.info?handles=${username}`;

      const [submissionsResponse, userInfoResponse] = await Promise.all([
          axios.get(submissionsUrl),
          axios.get(userInfoUrl),
      ]);

      const submissions = submissionsResponse.data.result;
      const userInfo = userInfoResponse.data.result[0];

      if (!submissions || submissions.length === 0) {
          return res.status(400).json({ message: "No submissions found for the given Codeforces username" });
      }

      if (!userInfo) {
          return res.status(400).json({ message: "Failed to fetch user data from Codeforces APIs" });
      }

      // Extract solved problems
      const solvedProblemsSet = new Set();
      submissions.forEach((submission) => {
          if (submission.verdict === "OK") {
              solvedProblemsSet.add(submission.problem.name);
          }
      });

      const problemsSolved = solvedProblemsSet.size;

      // Create a new CodeForcesUser document
      const newCodeForcesUser = new CodeforcesUser({
          username: userInfo.handle,
          problemsSolved,
          country: userInfo.country || "N/A",
          organization: userInfo.organization || "N/A",
          maxRating: userInfo.maxRating,
          currentRating: userInfo.rating,
          rank: userInfo.rank,
          maxRank: userInfo.maxRank,
          // handle: userInfo.handle,
      });

      await newCodeForcesUser.save();

      // Link Codeforces account and save username in userProfile
      findUser.CodeForces = newCodeForcesUser._id;
      await User.findByIdAndUpdate(findUser._id, { CodeForces: newCodeForcesUser._id });

      return res.status(201).json({
          message: "Codeforces user data stored successfully",
          submissions,
          userInfo,
          problemsSolved,
      });
  } catch (error) {
      console.error("Error storing Codeforces user data:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchAndUpdateCodeforcesSubmissions = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user in your main User collection
    const findUser = await User.findOne({ username }).exec();

    if (!findUser) {
      console.log("User not found in the database.");
      return res.status(400).json({ message: "User not exists in database" });
    }

    if (!findUser.CodeForces) {
      return res.status(400).json({ message: "Codeforces account not linked with this user" });
    }

    // Find the existing Codeforces user document
    const existingCodeforcesUser = await CodeforcesUser.findById(findUser.CodeForces);
    if (!existingCodeforcesUser) {
      return res.status(400).json({ message: "Codeforces user data not found" });
    }

    console.log(`Fetching data for Codeforces user: ${existingCodeforcesUser.username}`);

    // Fetch user info from Codeforces API
    const userInfoUrl = `https://codeforces.com/api/user.info?handles=${existingCodeforcesUser.username}`;
    const userInfoResponse = await axios.get(userInfoUrl);

    if (
      !userInfoResponse.data ||
      userInfoResponse.data.status !== "OK" ||
      !userInfoResponse.data.result
    ) {
      return res.status(400).json({ message: "Failed to fetch user info from Codeforces API" });
    }

    const userInfo = userInfoResponse.data.result[0];

    // Fetch submissions from Codeforces API
    const submissionsUrl = `https://codeforces.com/api/user.status?handle=${existingCodeforcesUser.username}&from=1&count=1000`;
    const submissionsResponse = await axios.get(submissionsUrl);

    if (
      !submissionsResponse.data ||
      submissionsResponse.data.status !== "OK" ||
      !submissionsResponse.data.result
    ) {
      return res
        .status(400)
        .json({ message: "Failed to fetch submissions data from Codeforces API" });
    }

    const submissionsData = submissionsResponse.data.result;

    // Update the Codeforces user document with fetched data
    existingCodeforcesUser.problemSolved = userInfo.problemSolved || existingCodeforcesUser.problemSolved;
    existingCodeforcesUser.rating = userInfo.rating || existingCodeforcesUser.rating;
    existingCodeforcesUser.maxRating = userInfo.maxRating || existingCodeforcesUser.maxRating;
    existingCodeforcesUser.rank = userInfo.rank || existingCodeforcesUser.rank;
    existingCodeforcesUser.country = userInfo.country || existingCodeforcesUser.country;
    existingCodeforcesUser.organization = userInfo.organization || existingCodeforcesUser.organization;
    existingCodeforcesUser.currentRating = userInfo.rating || existingCodeforcesUser.currentRating;
    existingCodeforcesUser.contribution = userInfo.contribution || existingCodeforcesUser.contribution;
    existingCodeforcesUser.friendOfCount = userInfo.friendOfCount || existingCodeforcesUser.friendOfCount;
    existingCodeforcesUser.lastOnlineTimeSeconds = userInfo.lastOnlineTimeSeconds || existingCodeforcesUser.lastOnlineTimeSeconds;
    existingCodeforcesUser.registrationTimeSeconds = userInfo.registrationTimeSeconds || existingCodeforcesUser.registrationTimeSeconds;
    existingCodeforcesUser.avatar = userInfo.avatar || existingCodeforcesUser.avatar;
    existingCodeforcesUser.titlePhoto = userInfo.titlePhoto || existingCodeforcesUser.titlePhoto;
    existingCodeforcesUser.submissions = submissionsData;
    existingCodeforcesUser.lastUpdated = new Date();

    // Save the updated document
    await existingCodeforcesUser.save();

    // Return the updated data
    return res.status(200).json({
      success: true,
      message: "Codeforces user data updated successfully",
      data: existingCodeforcesUser,
    });
  } catch (error) {
    console.error("Error fetching and updating Codeforces submissions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Fetch contest data for a specific handle
export const fetchCodeforcesContestData = async (req, res) => {
  try {
    const { handle } = currentUser.email;
console.log(handle);

    if (!handle) {
      return res.status(400).json({ message: "Handle is required" });
    }

    const apiResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);

    if (apiResponse.data.status !== "OK") {
      return res.status(400).json({ message: "Error fetching data from Codeforces API" });
    }

    const contests = apiResponse.data.result.map((contest) => ({
      date: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split("T")[0],
      rating: contest.newRating,
      rank: contest.rank,
      contestId: contest.contestId,
      contestName: contest.contestName,
    }));

    let user = await CodeforcesUser.findOne({ handle });
    if (user) {
      user.contests = contests;
      await user.save();
    } else {
      user = new CodeforcesUser({ handle, contests });
      await user.save();
    }

    res.status(200).json({ handle, contests });
  } catch (error) {
    handleError(res, error);
  }
};


export const fetchCodeforcesAccount = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // const findUser = await User.findOne({ "userProfile.codeforces": username }).exec();
        // if (!findUser) {
        //     return res.status(400).json({ message: "User with this Codeforces handle does not exist in the database" });
        // }

        // if (!findUser.CodeForces) {
        //     return res.status(400).json({ message: "Codeforces account not linked with this user" });
        // }

        // const existingCodeforcesUser = await CodeforcesUser.findById(findUser.CodeForces);
        // if (!existingCodeforcesUser) {
        //     return res.status(400).json({ message: "Codeforces user data not found" });
        // }

        const codeforcesApiUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000000`;
        const response = await axios.get(codeforcesApiUrl);

        if (!response.data || response.data.status !== "OK" || !response.data.result) {
            return res.status(400).json({ message: "Failed to fetch user data from Codeforces API" });
        }

        const submissions = response.data.result.length;

        // const uniqueProblems = new Set(
        //     submissions
        //         .filter(submission => submission.verdict === "OK")
        //         .map(submission => `${submission.problem.contestId}-${submission.problem.index}`)
        // );

        const problemsSolvedCount =submissions;

        // existingCodeforcesUser.problemSolved = problemsSolvedCount;
        // existingCodeforcesUser.lastUpdated = new Date();

        // await existingCodeforcesUser.save();

        return res.status(200).json({
          success:true,
            message: "Codeforces user data updated successfully",
            data: {
                
                problemSolved: problemsSolvedCount,
                // lastUpdated: existingCodeforcesUser.lastUpdated
            }
        });

    } catch (error) {
        console.error("Error updating Codeforces user data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const fetchCodeforcesFromDB = async (req, res) => {
  try {
      const { codeforcesid } = req.params; // Get the Codeforces user ID from request parameters

      let existingUser = await CodeforcesUser.findById(codeforcesid).exec();

      if (!existingUser) {
          console.log("Codeforces user not found, creating a new one.");
          return res.status(400).json({
              success: false,
              message: "Codeforces user not found",
          });
      } else {
          return res.status(200).json({
              data: existingUser,
              success: true,
              message: "Codeforces user found",
          });
      }
  } catch (error) {
      console.error("Error fetching Codeforces user data:", error);
      return res.status(500).json({
          success: false,
          message: "Internal server error",
      });
  }
};
