// Travel app continue - using INSERT query to add a new country to the database
/*
INSERT INTO <TABLE> (<COLUMN1>, <COLUMN2>)
VALUES (<VALUE1>, <VALUE2>)
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


async function checkVisisted() {
  const result = await db.query ("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach ( (country) => {
    countries.push (country.country_code);
  });
  return countries;
}


// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();    // help with updating the home page
  res.render("index.ejs", { countries: countries, total: countries.length });
});


/*
query.sql:
INSERT INTO world_food (country, rice_production, wheat_production)
VALUES ('Italy', 1.46, 7.3);

index.js:
db.query (
  "INSERT INTO world_food (country, rice_production, wheat_production) VALUES ($1, $2, $3)", 
  ['Italy', 1.46, 7.3] ); 
*/

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  // country name equal to the place holder $1 (the input), allow to put an expresion in a dynamic way. 
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [input]
  );
  console.log ("result:", result);

// if result empty it means input not inserted
  if (result.rows.length !== 0) {
    const data = result.rows [0];     //Bulgaria
    console.log ("data:", data);
    const countryCode = data.country_code;    //BG

    // insert BG into visited_countries
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);

    res.redirect("/");      // redirect to home page and show the new country
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
