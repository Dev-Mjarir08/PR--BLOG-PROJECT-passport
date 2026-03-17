import Blog from "../models/blog.model.js";
import fs from "fs"
const blogController = {
    async createBlogPage(req, res) {
        res.render('./pages/createBlog.ejs');
    },
    async createBlog(req, res) {
        try {

            const { title, content, excerpt, tags } = req.body;

            let image = "";

            if (req.file) {
                image = req.file.filename;
            }

            const blog = await Blog.create({
                title,
                content,
                excerpt,
                tags,
                image
            });
            console.log(req.file);
            console.log("BLOG CREATED:", blog);

            return res.redirect("/user/userDashboard");

        } catch (error) {
            console.log(error);
        }
    },
    async viewBlog(req, res) {
        try {

            const blog = await Blog.findById(req.params.id);

            res.render("pages/viewBlog", { blog });

        } catch (error) {
            console.log(error);
        }
    },
    async editBlog(req, res) {
        try {
            const blog = await Blog.findById(req.params.id);
            res.render("pages/editBlog", { blog });
        }
        catch {
            console.log(error);

        }
    },
    async deleteBlog(req, res) {
        try {
            const id = req.params.id;
            const blog = await Blog.findById(id);
            fs.unlinkSync("uploads/" + blog.image);
            await Blog.findByIdAndDelete(id);
            return res.redirect(req.get('Referrer') || '/pages/myBlogs');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/pages/myBlogs');
        }
    },
    async updateBlog(req, res) {
        try {

            const id = req.params.id;

            const blog = await Blog.findById(id);

            try {
                fs.unlinkSync("uploads/" + blog.image);
            } catch (err) {
                console.log("old image not found");
            }

            if (req.file) {
                req.body.image = req.file.filename;
            } 

            await Blog.findByIdAndUpdate(id, req.body);

            res.redirect("/user/userDashboard");

        } catch (error) {
            console.log(error);
        }

    },
    async myBlog(req, res) {
        try {

            const blogs = await Blog.find();

            res.render("pages/myBlogs", { blogs });

        } catch (error) {
            console.log(error);
        }
    }
}
export default blogController