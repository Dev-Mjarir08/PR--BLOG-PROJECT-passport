import { Router } from "express";
import userController from "../controller/user.controller.js";
import passport from "../middleware/passport.js";
import auth from "../middleware/auth.js";

const userRouter =Router()

userRouter.get('/signup',userController.signupPage)
userRouter.post('/signup',userController.createUser)
userRouter.get('/login',userController.loginPage)
userRouter.post('/login', passport.authenticate('local', {
    successRedirect : '/user/userDashboard',
    failureRedirect : '/user/login'
}));
userRouter.get('/userDashboard',auth ,userController.userDashboard)
userRouter.get('/updateProfile',auth ,userController.updateProfilePage) 
userRouter.post("/updateProfile",auth, userController.updateProfile);
userRouter.post("/changePassword", auth, userController.changePassword);

export default userRouter