import express, { urlencoded } from "express";
import expressLayout from 'express-ejs-layouts'
import path from 'path';
import session from "express-session";
import cookieParser from "cookie-parser";
import { userRouter } from "./src/routes/user/user.routes.js";
import dotenv from 'dotenv';
import projectRouter from "./src/routes/project/project.routes.js";
import issueRouter from "./src/routes/issue/issue.routes.js";
import { auth } from "./middlewares/auth.js";
import cors from 'cors';
import bodyParser from "body-parser";
const configEnvPath = path.resolve('config', '.env');
dotenv.config({ path: configEnvPath });

const server = express();

server.use(cors());
server.use(bodyParser.json())
server.use(cookieParser());
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))



// Setup view engine 
server.use(express.static("public")); //Provide public access to the public folder
server.set('view engine', 'ejs') //setup ejs view engine
server.set('views', path.join(path.resolve(), 'src', 'view')) //setup path where is our views
server.use(expressLayout); //Use the engine setup

server.use(express.urlencoded({ 'extended': false }));

//User Router
server.get('/logout', (req, res, next) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        }
    });
})
server.use("/issue-tracker/project/", auth, projectRouter);
server.use("/issue-tracker/issue/", auth, issueRouter);
server.use("/issue-tracker", auth, projectRouter);
server.use('/', userRouter);




export { server };