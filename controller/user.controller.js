import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";
import bcrypt from 'bcrypt';

const userController = {
    signupPage(req, res) {
        return res.render('./pages/signup')
    },
    async createUser(req, res) {
        try {
            const { username, email, password, confirmPassword } = req.body
            if (password == confirmPassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.create({ username, email, password: hashedPassword })
                console.log(req.body);

                return res.redirect('./login')
            } else {
                return res.redirect('./register');
            }

        }

        catch (error) {
            console.log(error.message);
            return res.redirect('./register');
        }
    },
    loginPage(req, res) {
        return res.render('./pages/login')
    },
    async userDashboard(req, res) {
        try {

            const blogs = await Blog.find().sort({ createdAt: -1 });

            res.render("./pages/userDashboard", { blogs, user: req.user });

        } catch (error) {
            console.log(error);
        }
    },
    updateProfilePage(req, res) {
        return res.render('./pages/updateProfile', { user: req.user })
    },
    async updateProfile(req, res) {
        try {

            const id = req.user._id;

            const { username, email, } = req.body;

            await User.findByIdAndUpdate(id, {
                username,
                email
            });

            res.redirect("/user/updateProfile");

        } catch (error) {
            console.log(error);
        }
    },
    async changePassword(req, res) {
        try {

            const { oldPassword, newPassword, confirmPassword } = req.body;

            const user = await User.findById(req.user._id);

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.redirect("/user/dashboard");
            }

            else if (newPassword !== confirmPassword) {
                return res.redirect("/user/dashboard");
            }

            else {


                const hashPassword = await bcrypt.hash(newPassword, 10);

                user.password = hashPassword;

                await user.save();

                return res.redirect("/user/login");
            }

        } catch (error) {
            console.log(error);
            res.send("Something went wrong");
        }
    }
}

export default userController