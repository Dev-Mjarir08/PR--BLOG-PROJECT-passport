import { Router } from "express";
import adminRouter from "./admin.route.js";
import userRouter from "./user.route.js";
import blogRouter from "./blog.route.js";
const router =Router()

router.use('/' ,adminRouter)
router.use('/user' , userRouter)
router.use('/blog' , blogRouter)

export default router