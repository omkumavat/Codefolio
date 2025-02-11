import mongoose from "mongoose";

const CodeForcesUserSchema = new mongoose.Schema({
    username: { type: String, required: true,required:true },
    problemSolved: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    rating: { type: Number, default: 0 },
    maxRating: { type: Number, default: 0 }, // Keep only one maxRating field
    rank: { 
        type: String, 
        default: "unranked", 
        enum: ["unranked", "newbie", "pupil", "specialist", "expert", "candidate master", "master", "international master", "grandmaster", "international grandmaster", "legendary grandmaster"]
    },
    country: { type: String, default: "N/A" }, // Optional field, default value if not provided
    organization: { type: String, default: "N/A" }, // Optional field, default value if not provided
    currentRating: { type: Number, default: 0 },
    contribution: { type: Number, default: 0 },
    friendOfCount: { type: Number, default: 0 },
    lastOnlineTimeSeconds: { type: Number, default: 0 },
    registrationTimeSeconds: { type: Number, default: 0 },
    avatar: { type: String, default: "" },
    titlePhoto: { type: String, default: "" },
    contests: [
        {
            contestId: { type: Number, required: true },
            contestName: { type: String, required: true },
            rank: { type: Number, default: null },
            oldRating: { type: Number, default: 0 },
            newRating: { type: Number, default: 0 },
            ratingUpdateTimeSeconds: { type: Number, default: 0 },
        },
    ],
}, { timestamps: true });

export default mongoose.model('CodeforcesUser', CodeForcesUserSchema);
