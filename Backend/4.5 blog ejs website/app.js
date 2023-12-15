//Work plan- npm init -y, npm i express, write server including "/", "/contact", "about" endopints, nodemon index.js.
import express from "express";
import bodyParser from "body-parser"; // Middleware
import ejs from "ejs";
import _ from "lodash";

const homeStartingContent = "Hi Everyone.";
const aboutContent = "I'm Shani, soptware developer.";
const contactContent = "Lwt's keep in touch.";

// EXPRESS:
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];


// the client ask for a reaource- the homepage
app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

// GET ABOUT:
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});  // render the about page and pass the aboutContent variable to it
});

// GET contact:
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


// GET compose:
app.get("/compose", function(req, res){
  res.render("compose");
});
app.post("/compose", function(req, res){
    const post = {title: req.body.postTitle, content: req.body.postBody};
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
            res.render("post", {title: post.title, content: post.content});
    }
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});