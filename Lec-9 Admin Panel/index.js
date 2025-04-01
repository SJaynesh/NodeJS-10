const express = require('express');

const db = require('./config/db');

const app = express();
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/admin'));

app.listen(port, () => console.log("Server started..."));
