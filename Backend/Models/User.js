import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },

    name:{ type: String, required: true},

    email: { type: String, required: true, unique: true },

    mobileno: { type: String, unique: true },

    password: { type: String, required: true },

    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    },

    bio: { type: String, maxlength: 500 },

    location: {
        city: { type: String },
        state: { type: String },
        country: { type: String },
      },

    education: [
        {
          degree: { type: String }, 
          branch: { type: String }, 
          college: { type: String },
          gryear: { type: Number }, 
        },
      ],

    skills: [{ type: String }],

    avgScore: {
        rank:{type:Number,default:0},
        score: { type: Number, default: 0 },
        totalActiveDays: { type: Number, default: 0 },
        stars: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
            default: 0,
        },
        graph: {
            activedates: [
                {
                    date: { type: Date },
                    problemsolved: { type: Number },
                    contribution: { type: Number },
                },
            ],
        },
    },

    GeeksforGeeks: { type: mongoose.Schema.Types.ObjectId, ref: 'GeeksforGeeks' },
    LeetCode: { type: mongoose.Schema.Types.ObjectId, ref: 'LeetCode' },
    CodeChef: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeChef' },
    CodeForces: { type: mongoose.Schema.Types.ObjectId, ref: 'CodeForces' },
    Github: { type: mongoose.Schema.Types.ObjectId, ref: 'Github' },

    userProfile: {
        geeksforgeeks: { type: String },
        leetCode: { type: String }, 
        codeChef: { type: String }, 
        codeforces: { type: String }, 
        github: { type: String }, 
        linkedin: { type: String }, 
        other:{type:String},
      },
    
    gender: {type:String},

    birthdata:{type:Date},

    role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },

}, { timestamps: true });

export default mongoose.model('User', userSchema);
