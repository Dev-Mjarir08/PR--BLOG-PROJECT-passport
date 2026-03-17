import express from 'express';
import dotenv from "./config/dotenv.js";
import db from "./config/db.js";
import router from './routes/index.js';
import bodyParser from 'body-parser';
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./middleware/passport.js";

const app = express();
const PORT = dotenv.PORT || 3000
db()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router)
app.listen(PORT, (error) => {
    if (!error) {
        console.log('server started.');
        console.log('http://localhost:' + PORT)
    }
    else {
        console.log(error.message);

    }
})