// Fix bugs and improve user experience - 
// when user add country that doesn't exist

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
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  // here we will add try-catch block. instead of redirect we can pass over an error.

  // try for country name the user enter
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name = $1",
      [input]
    );
    const data = result.rows [0];
    const countryCode = data.country_code;

      // we will also add try-block here.
      // so we render diffrent message to index.ejs
      // try for country code, if we get error on exiting country, it's probablly because its already exist in there (country_code must be UNIQUE and NOT NULL).
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [countryCode]
        );
        res.redirect("/");

      } catch (err) {    // catch error if country already added
        console.log(err);
        const countries = await checkVisisted();

        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country has already been added, try again.",
        });
      }
      
 
  } catch (err) {         // catch error if the first try failed (country don't exist)
    console.log(err);
    const countries = await checkVisisted();    // grab hold the countries already visited

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
