// module.exports.postPage = (req, res) => {
//     res.render('post');
// }

const postPage = (req, res) => {
    res.render('post');
}

const aboutPage = (req, res) => {
    res.render('about');
}

module.exports = {
    postPage,
    aboutPage
}