// Regestration users with email and password

//work flow- npm init, npm i express ejs body-parser pg, create "secrets" db in pgAdmin, and then users table.
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// db connection through pg
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "secrets",
    password: "123456",
    port: 5432,
  });
  db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
 
app.get("/register", (req, res) => {
  res.render("register.ejs");  
});



// POST request from the ejs
app.post ("/register", async (req,res) => {
 const email = req.body.username;
 const password = req.body.password;


 //check if i already have that user in my db
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    
    if (checkResult.rows.length > 0) {
        res.send("Email already exists. Try logging in.");
    } else {
        //insert the user to the db
        const result = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, password]
    );
    console.log(result);
    res.render("secrets.ejs");
});




app.post ("/login", async (req,res) => {
    const email = req.body.username;
    const password = req.body.password;


});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  