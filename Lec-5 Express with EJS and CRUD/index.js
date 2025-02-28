const express = require('express');

const app = express();
const port = 8000;

let studData = [
    {
        name: "Harsh",
        age: 20,
        email: "harsh@gmail.com",
        phone: "235690550",
        password: "Harsh@124"
    },
    {
        name: "Jeck",
        age: 18,
        email: "jeck@gmail.com",
        phone: "896531756",
        password: "Jec#421"
    },
    {
        name: "Mohan",
        age: 25,
        email: "mohan@gmail.com",
        phone: "963214796",
        password: "mohan908@#"
    }
];

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    let name = "Jaynesh";
    res.render("table", { name, studData })
})

app.get('/insert', (req, res) => {
    res.render("form");
})

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

    res.redirect("/insert");
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
