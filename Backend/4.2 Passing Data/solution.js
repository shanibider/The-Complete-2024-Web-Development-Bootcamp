import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  // this is how we get data from ejs file (similar to html)
  const numLetters = req.body["fName"].length + req.body["lName"].length;
  res.render("index.ejs", { numberOfLetters: numLetters });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
