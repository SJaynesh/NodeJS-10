const dashboardPage = (req, res) => {
    res.render('dashboard');
}

const addAdminPage = (req, res) => {
    res.render('addAdmin');
}

const viewAdminPage = (req, res) => {
    res.render('viewAdmin');
}

module.exports = {
    dashboardPage,
    addAdminPage,
    viewAdminPage,
}