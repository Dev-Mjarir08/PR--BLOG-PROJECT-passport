const adminPanelcontroller = {

    homePage(req, res){
        return res.render('homPage')
    },

    adminDashboard(req, res) {
        return res.render('./pages/adminPage')
    }
}
export default adminPanelcontroller