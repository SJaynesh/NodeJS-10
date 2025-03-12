const express = require('express');
const db = require('./config/db');
const student = require('./models/students');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded()); // MiddleWare

app.get('/', (req, res) => {
    res.render('form');
})

app.post('/addStud', (req, res) => {
    console.log(req.body);

    const { name, age, course } = req.body;

    student.create({
        name: name,
        age: age,
        course: course,
    }).then(() => {
        console.log("Data inserted...");
    }).catch((err) => {
        console.log("Error ", err);
    })

    res.redirect('/');
})

app.listen(port, () => console.log('Server started...'));