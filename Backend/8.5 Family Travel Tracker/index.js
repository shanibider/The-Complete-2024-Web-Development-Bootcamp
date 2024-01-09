// Project include postgreSQL, queries, EJS, routes, body-parser.
/*
Instructions-
- modify to add the multi user functionality.
-  fetch the data (country_code and color) for the selected user in the tab up top from postgres.
- link the user to the visited_countries table. the users table should contain user names and their colors for the map.

(hints: change te queries to JOIN certain tables, figure out how to query for the current user's data, add code under "/user", "/new" and "/add",
try using the RETURNING keyword to return the data that was inserted, and use the data to render the map and the user tabs).
*/

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Shani", color: "teal" },
  { id: 2, name: "Tal", color: "powderblue" },
];


async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1; ", 
  [currentUserId]);
  let countries = [];
  result.rows.forEach ( (country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// each user has id/name/color.
async function getCurrentUser() {
  const result = await db.query ("SELECT * FROM users");
  users = result.rows;
  console.log(users);
  return users.find ( (user) => user.id == currentUserId);
}




app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const getCurrentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUserId.color,
  });
});



// get the countryCode from user input, then insert it into the visited_countries table.
app.post("/add", async (req, res) => {
  const input = req.body ["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows [0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


// get the user id that got clicked from the form, then render the index.ejs page.
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;    // get the user id from the form
    res.redirect("/");
  }
  });




app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");


});











app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
