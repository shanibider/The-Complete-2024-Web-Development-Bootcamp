// A permanent todo list (based on postgreSQL storage + pgAdmin) -
// include all CRUD actions. 
// first - create permalist db in pgAdmin

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123456",
  port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Go to the gym" },
];


// home POST request
app.get("/", async (req, res) => {

  try {
  const result = await db.query (
    "SELECT * FROM items ORDER BY id ASC");
  items = result.rows;  

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
}  catch (err) {
  console.log(err);
}
});



// add POST request
app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});



// edit POST request
app.post("/edit", (req, res) => {



});




// delete POST request
app.post("/delete", (req, res) => {



});







app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
