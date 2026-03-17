const adminPanelcontroller = {

    homePage(req, res){
        return res.render('homePage')
    },

    adminDashboard(req, res) {
        return res.render('./pages/adminPage')
    }
}
export default adminPanelcontroller