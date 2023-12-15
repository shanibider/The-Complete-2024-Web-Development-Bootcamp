import express from "express";

const app = express();
const port = 3000;

/*
MY PORTFOLIO WEBSITE USING EJS PARTIALS -
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => { 
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
