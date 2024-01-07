// Travel app using postgreSQL db (and pgAdmin) - using SELECT query to get all the countries from the database and display them on the home page.
// in pgAdmin i create visited_countries table, an add my countries manually

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// db connection 
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


// GET home page
app.get("/", async (req, res) => {
  // inside db.query, we insert the SQL query (SELECT column FROM table) to get all the countries from the database
  const result = await db.query ("SELECT country_code FROM visited_countries");
  console.log (result.rows);   // array with js objects (include key+value): [ { country_code: 'AFG' }, { country_code: 'AGO' } ]

  // create an empty array to store the country codes, loop through the result.rows array (key) and push each country code (value) to the countries array
  let countries = [];
  result.rows.forEach ( (country) => {
    countries.push (country.country_code);
  });

  console.log(countries);       // [ 'GB', 'FR' ]
 
  res.render("index.ejs", { countries: countries, total: countries.length });
  
  db.end();     // close the connection to the database server
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
