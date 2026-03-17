import { Router } from "express";
import adminPanelcontroller from "../controller/adminPanel.controller.js"
import auth from "../middleware/auth.js"

const adminRouter =Router();

adminRouter.get('/' ,adminPanelcontroller.homePage)
adminRouter.get('/admin',auth,adminPanelcontroller.adminDashboard)

export default adminRouter