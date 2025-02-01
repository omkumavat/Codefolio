import User from "../Models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

export const Signup = async (req, res) => {
    try {
        // get data
        // // // console.log("alll ", req.body);
        const { username, name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }

        // Secured password 
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }


        let users = await User.create({
            name, email, password: hashedPassword, username
        });

        await users.save();

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: users
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}

// Login
export const Login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            })
        }

        // check for register user 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Verify password & generate a JWT token

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };


        if (await bcrypt.compare(password, user.password)) {
            // password match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Password does not match",
            })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Login false"
        })
    }
}

export const checkUsername = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ error: 'Username parameter is required' });
        }

        const user = await User.findOne({ username: username.toLowerCase() });

        if (user) {
            return res.status(200).json({ available: false });
        }

        return res.status(200).json({ available: true });
    } catch (error) {
        console.error('Error checking username availability:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};