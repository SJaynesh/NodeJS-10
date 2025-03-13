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

// Insert
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
    // res.redirect('/');
    res.redirect('/fetch');
})

// Fetch
app.get('/fetch', (req, res) => {

    student.find({}).then((records) => {
        console.log(records);
        res.render('table', { records });
    }).catch((err) => {
        console.log("Error", err);
        res.send(err);
    });
})

// Delete
app.get('/deleteStud', (req, res) => {
    const id = req.query.id;
    console.log(id);

    student.findByIdAndDelete(id).then(() => {
        console.log("Deleted Succussfully..");
    }).catch((err) => {
        console.log("Error", err);
    });

    res.redirect('/fetch');

})

app.listen(port, () => console.log('Server started...'));