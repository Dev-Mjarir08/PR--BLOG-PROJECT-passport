import passport from "passport";
import LocalStratagy from "passport-local";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

passport.use('local', new LocalStratagy(async (username, password, done) => {
    try {
        let user = await User.findOne({ username });

        if (!user) return done(null, false)
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return done(null, false)
        return done(null, user)
    }
    catch (error) {
        done(error, false);
    }
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
})
export default passport