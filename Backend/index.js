import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileuPload from 'express-fileupload';
import connectDB from "./Database/database.js";
import cors from 'cors';
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import cloudinaryConnect from "./Database/cloudinary.js";

const app = express();
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();
cloudinaryConnect();
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing these methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.get('/', (req, res) => {
  res.send('Hello World')
})

import UserRoute from './Routes/UserRoute.js';
app.use('/server',UserRoute);

import LeetCodeRoute from './Routes/LeetCodeRoute.js';
app.use('/server/leetcode',LeetCodeRoute);

import GeeksforGeeksRoute from './Routes/GeeksforGeeksRoute.js';
app.use('/server/gfg',GeeksforGeeksRoute);

import Codechef from './Routes/Codechef.js';
app.use('/server/codechef',Codechef);

import CodeForces from './Routes/CodeForces.js';
app.use('/server/codeforces',CodeForces);

import GitHub from './Routes/GitHub.js';
app.use('/server/github',GitHub);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.get("/s", (req, res) => {
  res.render("SignupSuccess", { name: "OM"});
});


app.listen(4000, () => {
   console.log("app is listening on port 4000");
});
export default app;
