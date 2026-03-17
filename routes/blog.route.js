import { Router } from "express";
import blogController from "../controller/blog.controller.js";
import imageUpload from "../middleware/imageUpload.js";

const blogRouter = Router();

blogRouter.get('/create-Blog', blogController.createBlogPage);

blogRouter.post("/create-Blog", imageUpload, blogController.createBlog);

blogRouter.get("/blogPage/:id", blogController.viewBlog);

blogRouter.get("/editBlog/:id", blogController.editBlog);

blogRouter.get("/delete/:id", blogController.deleteBlog);

blogRouter.post("/updateBlog/:id", imageUpload, blogController.updateBlog);

blogRouter.get("/myBlog", blogController.myBlog);

export default blogRouter;