const adminPanelcontroller = {

    homePage(req, res){
        return res.render('homepage')
    },

    adminDashboard(req, res) {
        return res.render('./pages/adminPage')
    }
}
export default adminPanelcontroller