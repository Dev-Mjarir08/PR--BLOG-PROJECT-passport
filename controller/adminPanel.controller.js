const adminPanelcontroller = {

    homePage(req, res){
        return res.render('homePage.ejs')
    },

    adminDashboard(req, res) {
        return res.render('./pages/adminPage')
    }
}
export default adminPanelcontroller