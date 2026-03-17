const auth = (req, res, next) => {

    res.locals.user = req.user || null;

    if (!req.isAuthenticated()) {
        return res.redirect('/user/login');
    }

    next();
}

export default auth;