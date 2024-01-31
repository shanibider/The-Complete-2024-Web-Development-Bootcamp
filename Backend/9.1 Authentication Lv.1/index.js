// Basic authentication - Regestration users with email and password (password stored unencrypte in db)

//work flow- npm init, npm i express ejs body-parser pg, create "secrets" db in pgAdmin, then "users" table.
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



// POST request from ejs, for register a user
app.post ("/register", async (req,res) => {
 const email = req.body.username;
 const password = req.body.password;

try{        // recommended when working with pg
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
        }
      } catch (err) {
        console.log(err);
      }
});



// check if the user enter email and password against my db
app.post ("/login", async (req,res) => {
    const email = req.body.username;
    const password = req.body.password;

    if (email) {
        try {
          const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
          );
          if (result.rows.length > 0) {       // it means that email exist in db and result.rows[0] is the user
            console.log(result.rows);
             // check if the password is correct (user input vs stored password in db)
            if (result.rows[0].password === password) {
              res.render("secrets.ejs");
            } else {
              res.send("Incorrect password");
            }
          } else {    // if email/user dont exist in db (result.rows.length === 0)
            res.send("Email dont exict. Try register.");
          }
        } catch (err) {
          console.log(err);
        }
            } else {
        res.send("Please register");
      }
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  