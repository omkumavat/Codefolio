import mongoose from "mongoose";
import User from '../Models/User.js'
// Schema for each contest participation
const ContestSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  ranking: Number,
  trendDirection: String,
  problemsSolved: Number,
  totalProblems: Number,
});

// LeetCode User Schema
const LeetCodeUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profile: {
    ranking: Number,
    reputation: Number,
    totalSolved: Number,
    easySolved: Number,
    mediumSolved: Number,
    hardSolved: Number,
    acceptanceRate:Number,
    recentSubmissions:[Object],
  },
  contests: {
    contestAttend:Number,
    contestRating: Number,
    contestParticipation: [ContestSchema],
  },
  submissions_2024: {
    activeYears:[Number],
    totalActiveDays:Number,
    streak:Number,
    submissionCalendar: [
        {
          date: Number, // UNIX timestamp
          submissions: Number, // Number of submissions on this date
        }
      ],
  },
  submissions_2025: {
    activeYears:[Number],
    totalActiveDays:Number,
    streak:Number,
    submissionCalendar: [
        {
          date: Number, // UNIX timestamp
          submissions: Number, // Number of submissions on this date
        }
      ],
  },
});


LeetCodeUserSchema.pre('findOneAndDelete', async function (next) {
  const leetid = this.getQuery()._id;

  try {
    const User = mongoose.model('User');
    const delteLeet = await User.deleteMany({ leetid });
    next(); 
  } catch (error) {
    console.error(`Error in pre-delete middleware for product ${productId}:`, error);
    next(error); // Pass the error to the next middleware
  }
}); 

export default mongoose.model("LeetCodeUser", LeetCodeUserSchema);

