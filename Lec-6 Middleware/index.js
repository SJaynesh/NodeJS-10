const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

const middleware = (req, res, next) => {
    console.log("Middleware 1");

    console.log("Age", req.query.age);
    next();

    // if (req.query.age >= 18) {
    //     next();
    // } else {
    //     res.send("You are not allowed....😱");
    // }
}

// Request => Middleware1 => Middleware2 => Response
// Request <=> Middleware 

app.use(middleware);
app.use((req, res, next) => {
    console.log("Middleware 2");
    // console.log("Name ", req.myName);
    next()
})

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('public'));

app.get('/', (req, res) => {
    // console.log("Routes Name ", req.myName);
    res.render('home');
})

app.get('/users', (req, res) => {
    res.render('users');
})

app.listen(port, () => console.log("Server is started !!"))