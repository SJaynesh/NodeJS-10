const express = require('express');

const app = express();
const port = 8000;

let studData = [];

app.set("view engine", "ejs");
app.use(express.urlencoded());

// Route Table Page
app.get("/", (req, res) => {
    let name = "Jaynesh";
    res.render("table", { name, studData })
})

// Route Insert Form Page
app.get('/insert', (req, res) => {
    res.render("form");
})

// Logic Insert Student in Array
app.post("/addStud", (req, res) => {
    console.log("Request Data : ", req.body);

    const obj = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }

    studData.push(obj);

    res.redirect("/");
})

// Logic Delete in Array 
app.get("/delete", (req, res) => {
    console.log(req.query.id); //1

    studData = studData.filter((val, index) => index != req.query.id);
    //                                          2 != 2

    res.redirect("/");
})

// app.get("/about", (req, res) => {
//     res.render("about");
// })

// EJS 

// MVC 
// M => Models
// V => Views => UI => .ejs
// C => Controllers


app.listen(port, () => {
    console.log("Server is Started !! 😎");
})
