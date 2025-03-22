module.exports.empPage = (req, res) => {
    res.render('employee')
}

module.exports.insertEMP = (req, res) => {
    console.log(req.body);
}