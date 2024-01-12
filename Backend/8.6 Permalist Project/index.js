// A permanent todo list - server and client side, db queries based on postgreSQL storage + pgAdmin -
// include all CRUD actions. 
// Work flow - create new database in pgAdmin: "permalist", and table "items" with columns "id" and "title".

/*
"id"	"title"
1	"Buy milk"
2	"Go to the gym"
*/

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
    "SELECT * FROM items ORDER BY (id) ASC");   // ASC - ascending order
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
app.post("/add", async (req, res) => {
  const item = req.body.newItem;    // name of the input field
  //items.push ({ title: item });  
  try{
    await db.query (
      "INSERT INTO items (title) VALUES ($1)", [item]);   // insert query
      res.redirect ("/");
  } catch (err) {
    console.log(err);
  }
});



// edit POST request
app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;    // item title
  const id = req.body.updatedItemId;    // item id
  try{
    await db.query (
      "UPDATE items SET title = $1 WHERE id = $2",
      [item, id]
    );
      res.redirect ("/");
  } catch (err) {
    console.log(err);
  }
});




// delete POST request
app.post("/delete", async (req, res) => {
const id = req.vody.deleteItem;    // deleteItemId is the name of the input field in ejs file
try{
  await db.query (
    "DELETE FROM items WHERE id = $1",
    [id]
  );
    res.redirect ("/");
} catch (err) {
  console.log(err);
}
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
